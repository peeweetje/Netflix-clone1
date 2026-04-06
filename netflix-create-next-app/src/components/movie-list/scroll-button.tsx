import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface ScrollButtonProps {
  direction: 'left' | 'right';
  canScroll: boolean;
  ready: boolean;
  onClick: () => void;
  title: string;
}

export const ScrollButton = ({ direction, canScroll, ready, onClick, title }: ScrollButtonProps) => {
  const isLeft = direction === 'left';
  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <Button
      className={`absolute top-1/2 -translate-y-1/2 z-20 bg-black/60 border-none text-primary w-11 h-11 cursor-pointer opacity-30 transition-all rounded-sm pointer-events-auto ${
        isLeft ? 'left-0' : 'right-0'
      } hover:bg-primary-light hover:text-white disabled:opacity-0 disabled:pointer-events-none ${
        canScroll ? 'active opacity-100' : ''
      }`}
      disabled={!canScroll || !ready}
      onClick={onClick}
      variant="ghost"
      size="icon"
      aria-label={`Scroll ${title} ${direction}`}
    >
      <Icon className="text-white" />
    </Button>
  );
};