'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { MyListItem } from '../utils/types/types';

interface MyListContextType {
  myList: MyListItem[];
  addToList: (item: MyListItem) => void;
  removeFromList: (item: MyListItem) => void;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

export const MyListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [myList, setMyList] = useState<MyListItem[]>(() => {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem('myList');
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      // Filter out any null, undefined, or malformed items
      if (!Array.isArray(parsed)) {
        console.warn('myListContext: Stored data is not an array, resetting');
        return [];
      }

      const filtered = parsed.filter(
        (i: unknown): i is MyListItem => {
          if (!i || typeof i !== 'object') return false;
          
          const item = i as MyListItem;
          return (
            typeof item.id === 'number' &&
            (item.media_type === 'movie' || item.media_type === 'tv')
          );
        }
      );

      return filtered;
    } catch (error) {
      console.error('myListContext: Error loading myList from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('myList', JSON.stringify(myList));
    } catch (error) {
      console.error('Error saving myList to localStorage:', error);
    }
  }, [myList]);

  const addToList = (item: MyListItem) => {
    if (
      !item ||
      typeof item.id !== 'number' ||
      (item.media_type !== 'movie' && item.media_type !== 'tv')
    ) {
      return;
    }

    setMyList((prev) =>
      prev.some(
        (i) => i && i.id === item.id && i.media_type === item.media_type
      )
        ? prev
        : [...prev, item]
    );
  };

  const removeFromList = (item: MyListItem) => {
    if (
      !item ||
      typeof item.id !== 'number' ||
      (item.media_type !== 'movie' && item.media_type !== 'tv')
    )
      return;

    setMyList((prev) =>
      prev.filter(
        (i) => !(i && i.id === item.id && i.media_type === item.media_type)
      )
    );
  };

  return (
    <MyListContext value={{ myList, addToList, removeFromList }}>
      {children}
    </MyListContext>
  );
};

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useMyList must be used within a MyListProvider');
  }
  return context;
};
