'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => {
      if (!prev) {
        // Store focused element before opening
        previousActiveElement.current = document.activeElement as HTMLElement;
        // Lock background scroll
        document.body.style.overflow = 'hidden';
      } else {
        // Restore scroll when closing
        document.body.style.overflow = '';
        // Restore focus to trigger button
        setTimeout(() => menuButtonRef.current?.focus(), 0);
      }
      return !prev;
    });
  }, []);

  // Handle Escape key to close menu + focus trap
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleMenu();
      }
      
      // Focus trap
      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus first element when menu opens
    setTimeout(() => {
      const firstFocusable = menuRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
    }, 0);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, toggleMenu]);

  return {
    isMenuOpen,
    toggleMenu,
    menuRef,
    menuButtonRef
  };
};