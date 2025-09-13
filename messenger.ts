export interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'document' | 'payment';
  senderId: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
  metadata?: {
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
    paymentAmount?: number;
    paymentCurrency?: string;
    paymentStatus?: 'pending' | 'completed' | 'failed';
  };
}

export interface Chat {
  id: string;
  participants: string[];
  messages?: Message[];
  lastMessage: Message | null;
  unreadCount: number;
  createdAt: number;
  updatedAt: number;
  metadata?: {
    propertyId?: string;
    bookingId?: string;
    type?: 'property' | 'booking' | 'support';
  };
}

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: number;
  role?: 'owner' | 'tenant' | 'agent';
  properties?: string[];
}