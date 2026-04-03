import { Play, Info } from 'lucide-react';
import { Button } from '../ui/button';

interface HeroActionButtonsProps {
  title: string;
  showInfo: boolean;
  onPlayClick: () => void;
  onToggleInfo: () => void;
}

export const HeroActionButtons = ({ title, showInfo, onPlayClick, onToggleInfo }: HeroActionButtonsProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleInfo();
    }
  };

  return (
    <div className="flex flex-row gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-6 lg:mb-8">
      <Button
        size="default"
        onClick={onPlayClick}
        className="flex items-center justify-center gap-1.5 xs:gap-2 px-4 xs:px-5 sm:px-8 py-2.5 xs:py-3 sm:py-4 text-xs xs:text-sm sm:text-base lg:text-lg transition-all duration-200 hover:scale-105"
        aria-label={`Play ${title}`}
      >
        <Play className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
        <span>Play</span>
      </Button>
      <Button
        size="default"
        onClick={onToggleInfo}
        onKeyDown={handleKeyDown}
        className="flex items-center justify-center gap-1.5 xs:gap-2 px-4 xs:px-5 sm:px-8 py-2.5 xs:py-3 sm:py-4 text-xs xs:text-sm sm:text-base transition-all duration-200 hover:scale-105"
        aria-label={showInfo ? "Hide movie information" : "Show movie information"}
        aria-expanded={showInfo}
      >
        <Info className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5" />
        <span>{showInfo ? "Less Info" : "More Info"}</span>
      </Button>
    </div>
  );
};