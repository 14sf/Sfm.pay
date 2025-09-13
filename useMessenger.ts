import { useState, useEffect } from 'react';
import { ref, onValue, push, set } from 'firebase/database';
import { database } from '../../utils/firebase';
import { Chat, Message } from '../../types/messenger';
import { useToast } from '../useToast';

export const useMessenger = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const userId = 'current-user'; // In a real app, get from auth
    const chatsRef = ref(database, `users/${userId}/chats`);

    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const chatList = Object.entries(data).map(([id, chat]) => ({
          id,
          ...(chat as Omit<Chat, 'id'>)
        }));
        setChats(chatList);
      }
      setIsLoading(false);
    });

    return () => {
      // Clean up subscription
      unsubscribe();
    };
  }, []);

  const sendMessage = async (chatId: string, content: string, type: Message['type'] = 'text') => {
    try {
      const messagesRef = ref(database, `chats/${chatId}/messages`);
      const message: Omit<Message, 'id'> = {
        content,
        type,
        senderId: 'current-user',
        timestamp: Date.now(),
        status: 'sent'
      };

      await push(messagesRef, message);
      showToast('Message sent successfully!', 'success');
    } catch (error) {
      showToast('Failed to send message', 'error');
      throw error;
    }
  };

  const createChat = async (participants: string[]) => {
    try {
      const chatsRef = ref(database, 'chats');
      const newChatRef = push(chatsRef);
      const chatId = newChatRef.key;

      const chat: Omit<Chat, 'id'> = {
        participants,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastMessage: null,
        unreadCount: 0
      };

      await set(newChatRef, chat);
      showToast('Chat created successfully!', 'success');
      return chatId;
    } catch (error) {
      showToast('Failed to create chat', 'error');
      throw error;
    }
  };

  return {
    chats,
    isLoading,
    sendMessage,
    createChat
  };
};