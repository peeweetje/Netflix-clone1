import type React from 'react';
import { useRouter } from 'next/navigation';
import { useMyList } from '../../context/myListContext';
import { Chip } from '../chip/chip';
import { Button } from '../ui/button';

interface BackCardProps {
  id: number;
  media_type: 'movie' | 'tv';
  overview: string;
  title: string;
  vote_average: number;
}

export const BackCard = ({
  id,
  media_type,
  overview,
  title,
  vote_average,
}: BackCardProps) => {
  const router = useRouter();
  const { myList, addToList } = useMyList();

  const isAdded = myList.some(
    (item) => item.id === id && item.media_type === media_type
  );

  // Truncate overview if too long
  const MAX_OVERVIEW_LENGTH = 500;
  const truncatedOverview =
    overview && overview.length > MAX_OVERVIEW_LENGTH
      ? overview.slice(0, MAX_OVERVIEW_LENGTH) + '...'
      : overview;

  const handleCardClick = () => {
    const route = media_type === 'movie' ? `/movies/${id}` : `/shows/${id}`;
    router.push(route);
  };

  return (
    <div
      onClick={handleCardClick}
      className='relative p-3 flex flex-col items-center justify-center h-[350px] w-[250px] overflow-visible text-themed-white rounded-lg cursor-pointer shadow-2xl shadow-white/20 bg-primary-light'
    >
      <h3 className='!text-white flex justify-center mt-0.5 mb-0.5 text-base font-bold'>
        {title}
      </h3>

      <p className='flex justify-center text-sm leading-relaxed mb-0 flex-1 overflow-hidden line-clamp-5'>
        {truncatedOverview}
      </p>

      <div className='flex flex-col items-center justify-end mt-auto mb-0'>
        <Button
          disabled={isAdded}
          onClick={(e) => {
            e.stopPropagation();
            addToList({ id, media_type });
          }}
          variant={isAdded ? 'default' : 'secondary'}
          size='lg'
          className={`w-[140px] mx-auto mb-4 ${
            isAdded
              ? 'bg-black text-white hover:bg-black/90'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          {isAdded ? 'Added' : '+ Add'}
        </Button>
        <Chip score={vote_average} />
      </div>
    </div>
  );
};
