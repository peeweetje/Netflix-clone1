'use client';

import { useTheme } from '@/context/theme-context';
import { Palette, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Theme, themeOptions } from '@/lib/theme-config';

export function ThemeToggle() {
  const { theme = 'green', setTheme } = useTheme();
  const currentTheme = themeOptions.find(t => t.id === theme) || themeOptions[0];

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="lg"
          className="gap-2 bg-gray-900/80! text-gray-300! hover:bg-gray-800/90!"
          aria-label="Change theme color"
        >
          <Palette className="shrink-0" />
          <span className="hidden md:inline">Theme</span>
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${currentTheme.color}`}></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900/95! border border-gray-700! w-48">
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => handleThemeChange(option.id as Theme)}
            className="focus:bg-gray-800/80! focus:text-white! cursor-pointer"
          >
            <span className={`w-5 h-5 rounded-full ${option.color} mr-2`}></span>
            <span className="text-white">{option.name}</span>
            {theme === option.id && (
              <Check className="w-5! h-5! ml-auto text-white" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
