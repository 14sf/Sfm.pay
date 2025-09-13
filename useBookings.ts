import { useState, useEffect } from 'react';
import { Activity, Course, Tasting, Booking } from '../types/booking';

export const useBookings = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Mountain Biking Adventure',
      description: 'Explore Rwanda\'s scenic trails on a guided mountain biking tour',
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?ixlib=rb-4.0.3',
      duration: '3 hours',
      groupSize: 8,
      location: 'Kigali',
      price: 75,
      rating: 4.8,
      availableSpots: 5,
      startDate: '2024-03-15',
      endDate: '2024-03-15'
    }
  ]);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Traditional Rwandan Cooking',
      description: 'Learn authentic Rwandan recipes and cooking techniques',
      category: 'Culinary',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3',
      duration: '2 weeks',
      instructor: 'Chef Marie',
      spots: 10,
      price: 200,
      level: 'beginner',
      startDate: '2024-03-20',
      schedule: ['Monday', 'Wednesday', 'Friday']
    }
  ]);

  const [tastings, setTastings] = useState<Tasting[]>([
    {
      id: '1',
      title: 'Coffee Tasting Experience',
      description: 'Discover Rwanda\'s finest coffee varieties',
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3',
      duration: '2 hours',
      groupSize: 6,
      location: 'Kigali Coffee House',
      price: 45,
      menu: ['Bourbon', 'Blue Mountain', 'Arabica'],
      date: '2024-03-25',
      time: '14:00'
    }
  ]);

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      type: 'activity',
      title: 'Mountain Biking Adventure',
      date: '2024-03-15',
      time: '09:00',
      participants: 2,
      status: 'confirmed',
      totalPrice: 150,
      userId: '1',
      createdAt: '2024-03-10'
    }
  ]);

  return {
    activities,
    courses,
    tastings,
    bookings,
    setBookings
  };
};