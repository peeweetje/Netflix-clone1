import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const useThemeAnnouncement = () => {
  const { t, i18n } = useTranslation();
  const [themeAnnouncement, setThemeAnnouncement] = useState('');

  const announceThemeChange = useCallback((nextTheme: string) => {
    // Create accessible announcement with fallback
    const currentLanguage = i18n.language || 'en';
    const themeLabel = t(`theme-${nextTheme}`, {
      defaultValue: currentLanguage === 'nl' 
        ? (nextTheme === 'spring' ? 'Lentethema - groen' : 
           nextTheme === 'summer' ? 'Zomerthema - amber' :
           nextTheme === 'autumn' ? 'Herfstthema - oranje' : 'Winterthema - blauw')
        : (nextTheme === 'spring' ? 'Spring theme - green' : 
           nextTheme === 'summer' ? 'Summer theme - amber' :
           nextTheme === 'autumn' ? 'Autumn theme - orange' : 'Winter theme - blue')
    });
    const announcement = t('theme-changed', { 
      theme: themeLabel,
      defaultValue: currentLanguage === 'nl' 
        ? `Thema gewijzigd naar ${themeLabel}`
        : `Theme changed to ${themeLabel}`
    });
    
    setThemeAnnouncement(announcement);
    
    // Clear announcement after it's been read
    setTimeout(() => setThemeAnnouncement(''), 3000);
  }, [t, i18n.language]);

  const getThemeLabel = useCallback((themeName: string) => {
    const currentLanguage = i18n.language || 'en';
    return t(`theme-${themeName}`, {
      defaultValue: currentLanguage === 'nl' 
        ? (themeName === 'spring' ? 'Lentethema - groen' : 
           themeName === 'summer' ? 'Zomerthema - amber' :
           themeName === 'autumn' ? 'Herfstthema - oranje' : 'Winterthema - blauw')
        : (themeName === 'spring' ? 'Spring theme - green' : 
           themeName === 'summer' ? 'Summer theme - amber' :
           themeName === 'autumn' ? 'Autumn theme - orange' : 'Winter theme - blue')
    });
  }, [t, i18n.language]);

  return {
    themeAnnouncement,
    announceThemeChange,
    getThemeLabel
  };
};