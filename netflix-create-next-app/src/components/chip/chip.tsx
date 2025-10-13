import { scoreColor } from '../../utils/score-color';

interface ChipProps {
  score: number;
}

export const Chip = ({ score }: ChipProps) => {
  const roundedScore = Math.floor(score * 10) / 10;
  const color = scoreColor(score);

  return (
    <span
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold text-white text-center shadow-lg ${color || 'bg-gray-600'}`}
      aria-label={`Rating: ${roundedScore} out of 10`}
    >
      {roundedScore}
    </span>
  );
};
