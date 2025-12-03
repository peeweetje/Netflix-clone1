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

type Theme = 'green' | 'blue' | 'purple' | 'red'| 'yellow';

const themeOptions = [
  {
    id: 'green',
    name: 'Emerald',
    color: 'bg-emerald-500',
    activeColor: 'bg-emerald-600',
    ring: 'ring-emerald-500/20',
    text: 'text-emerald-600',
    border: 'border-emerald-500/20',
  },
  {
    id: 'blue',
    name: 'Blue',
    color: 'bg-blue-500',
    activeColor: 'bg-blue-600',
    ring: 'ring-blue-500/20',
    text: 'text-blue-600',
    border: 'border-blue-500/20',
  },
  {
    id: 'purple',
    name: 'Purple',
    color: 'bg-purple-500',
    activeColor: 'bg-purple-600',
    ring: 'ring-purple-500/20',
    text: 'text-purple-600',
    border: 'border-purple-500/20',
  },
  {
    id: 'red',
    name: 'Rose',
    color: 'bg-rose-500',
    activeColor: 'bg-rose-600',
    ring: 'ring-rose-500/20',
    text: 'text-rose-600',
    border: 'border-rose-500/20',
  },
  {
    id: 'yellow',
    name: 'Yellow',
    color: 'bg-yellow-500',
    activeColor: 'bg-yellow-600',
    ring: 'ring-yellow-500/20',
    text: 'text-yellow-600',
    border: 'border-yellow-500/20',
  },
];

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
