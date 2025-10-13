'use client';

import type React from 'react';

interface MovieMedia {
  status: string;
  original_language: string;
  release_date: string;
  runtime: number;
  genres: Array<{ name: string }>;
  vote_average: number;
  vote_count: number;
}

interface TVMedia {
  status: string;
  original_language: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Array<{ name: string }>;
  vote_average: number;
  vote_count: number;
}

interface MediaInfoProps {
  media: MovieMedia | TVMedia;
  type: 'movie' | 'tv';
}

export const MediaInfo = ({ media, type }: MediaInfoProps) => (
  <section className='p-6' aria-labelledby="media-info-heading">
    <h2 id="media-info-heading" className="text-lg font-bold mb-4 text-white">
      {type === 'movie' ? 'Movie Information' : 'TV Show Information'}
    </h2>
    <div className='flex flex-col gap-4 min-w-[350px]' role="list">
      <div className='flex justify-between items-center'>
        <span className='font-bold text-white text-md'>Status:</span>
        <span className='text-white text-md'>{media.status || 'N/A'}</span>
      </div>

      <div className='flex justify-between items-center'>
        <span className='font-bold text-white text-md'>Original Language:</span>
        <span className='text-white text-md'>
          {media.original_language?.toUpperCase() || 'N/A'}
        </span>
      </div>

      {type === 'movie' ? (
        <>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-white text-md'>Release Date:</span>
            <span className='text-white text-md'>
              {media.release_date
                ? new Date(media.release_date).getFullYear()
                : 'N/A'}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='font-bold text-white text-md'>Runtime:</span>
            <span className='text-white text-md'>
              {media.runtime ? `${media.runtime} min` : 'N/A'}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-white text-md'>
              First Air Date:
            </span>
            <span className='text-white text-md'>
              {media.first_air_date
                ? new Date(media.first_air_date).getFullYear()
                : 'N/A'}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='font-bold text-white text-md'>Last Air Date:</span>
            <span className='text-white text-md'>
              {media.last_air_date
                ? new Date(media.last_air_date).getFullYear()
                : 'N/A'}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='font-bold text-white text-md'>Seasons:</span>
            <span className='text-white text-md'>
              {media.number_of_seasons || 'N/A'}
            </span>
          </div>

          <div className='flex justify-between items-center'>
            <span className='font-bold text-white text-md'>Episodes:</span>
            <span className='text-white text-md'>
              {media.number_of_episodes || 'N/A'}
            </span>
          </div>
        </>
      )}

      <div className='flex justify-between items-center'>
        <span className='font-bold text-white text-md'>Genres:</span>
        <span className='text-white text-md'>
          {media.genres?.map((g: any) => g.name).join(', ') || 'N/A'}
        </span>
      </div>

      <div className='flex justify-between items-center'>
        <span className='font-bold text-white text-md'>Rating:</span>
        <span className='text-white text-md font-bold'>
          {media.vote_average ? `${media.vote_average.toFixed(1)}/10` : 'N/A'}
        </span>
      </div>

      <div className='flex justify-between items-center'>
        <span className='font-bold text-white text-md'>Vote Count:</span>
        <span className='text-white text-md'>
          {media.vote_count ? media.vote_count.toLocaleString() : 'N/A'}
        </span>
      </div>
    </div>
  </section>
);
