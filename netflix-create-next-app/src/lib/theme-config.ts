export type Theme = 'green' | 'blue' | 'purple' | 'red' | 'yellow';

export interface ThemeConfig {
  id: Theme;
  name: string;
  color: string;
  activeColor: string;
  ring: string;
  text: string;
  border: string;
  hue: string;
  saturation: string;
}

export const themeOptions: ThemeConfig[] = [
  {
    id: 'green',
    name: 'Emerald',
    color: 'bg-emerald-500',
    activeColor: 'bg-emerald-600',
    ring: 'ring-emerald-500/20',
    text: 'text-emerald-600',
    border: 'border-emerald-500/20',
    hue: '142',
    saturation: '71%',
  },
  {
    id: 'blue',
    name: 'Blue',
    color: 'bg-blue-500',
    activeColor: 'bg-blue-600',
    ring: 'ring-blue-500/20',
    text: 'text-blue-600',
    border: 'border-blue-500/20',
    hue: '217',
    saturation: '91%',
  },
  {
    id: 'purple',
    name: 'Purple',
    color: 'bg-purple-500',
    activeColor: 'bg-purple-600',
    ring: 'ring-purple-500/20',
    text: 'text-purple-600',
    border: 'border-purple-500/20',
    hue: '262',
    saturation: '83%',
  },
  {
    id: 'red',
    name: 'Rose',
    color: 'bg-rose-500',
    activeColor: 'bg-rose-600',
    ring: 'ring-rose-500/20',
    text: 'text-rose-600',
    border: 'border-rose-500/20',
    hue: '0',
    saturation: '84%',
  },
  {
    id: 'yellow',
    name: 'Yellow',
    color: 'bg-yellow-500',
    activeColor: 'bg-yellow-600',
    ring: 'ring-yellow-500/20',
    text: 'text-yellow-600',
    border: 'border-yellow-500/20',
    hue: '48',
    saturation: '100%',
  },
];

export const getThemeConfig = (themeId: Theme): ThemeConfig => {
  return themeOptions.find((t) => t.id === themeId) || themeOptions[0];
};
