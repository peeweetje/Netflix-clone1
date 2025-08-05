import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type MyListItem = {
  id: number;
  media_type: 'movie' | 'tv';
};

interface MyListContextType {
  myList: MyListItem[];
  addToList: (item: MyListItem) => void;
  removeFromList: (item: MyListItem) => void;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

export const MyListProvider = ({ children }: { children: React.ReactNode }) => {
  const [myList, setMyList] = useState<MyListItem[]>(() => {
    const stored = localStorage.getItem('myList');
    const parsed = stored ? JSON.parse(stored) : [];
    // Filter out any null, undefined, or malformed items
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i) =>
        i &&
        typeof i.id === 'number' &&
        (i.media_type === 'movie' || i.media_type === 'tv')
    );
  });

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const addToList = (item: MyListItem) => {
    if (
      !item ||
      typeof item.id !== 'number' ||
      (item.media_type !== 'movie' && item.media_type !== 'tv')
    )
      return;
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
    <MyListContext.Provider value={{ myList, addToList, removeFromList }}>
      {children}
    </MyListContext.Provider>
  );
};

export const useMyList = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useMyList must be used within a MyListProvider');
  }
  return context;
};
