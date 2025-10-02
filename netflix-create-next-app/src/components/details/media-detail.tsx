'use client';

import type React from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '../loading/loading';
import { Button } from '../ui/button';
import { MediaPoster } from './media-poster';
import { MediaInfo } from './media-info';
import { CastMember } from './cast-member';
import { useMyList } from '../../context/myListContext';
import { ArrowLeft, Play } from 'lucide-react';
import { imageUrl } from '../../utils/api';
import { useQuery } from '@tanstack/react-query';
import { mediaQueries } from '../../utils/queries';

interface MediaDetailProps {
  type: 'movie' | 'tv';
  id: string;
}

export const MediaDetail = ({ type, id }: MediaDetailProps) => {
  const router = useRouter();

  // Fetch media details
  const {
    data: media,
    isLoading: mediaLoading,
    error: mediaError,
  } = useQuery(mediaQueries.details(type, id));

  // Fetch cast
  const {
    data: castData,
    isLoading: castLoading,
    error: castError,
  } = useQuery(mediaQueries.cast(type, id));

  // Fetch videos to check for trailer
  const {
    data: videoData,
    isLoading: videoLoading,
    error: videoError,
  } = useQuery(mediaQueries.videos(type, id));

  const cast = castData || [];
  const hasTrailer = videoData?.some((vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube') || false;

  const isLoading = mediaLoading || castLoading || videoLoading;
  const hasErrors = mediaError || castError || videoError;
  const hasMediaError = !!mediaError;
  const hasCastError = !!castError;
  const hasVideoError = !!videoError;

  // More specific error messages
  const getErrorMessage = () => {
    if (hasMediaError) return mediaError?.message || 'Failed to load media details.';
    if (hasCastError && hasVideoError) return 'Failed to load cast and trailer information.';
    if (hasCastError) return 'Failed to load cast information.';
    if (hasVideoError) return 'Failed to load trailer information.';
    return null;
  };

  const error = getErrorMessage();

  if (isLoading) return <Loading loading={true} error={null} />;
  if (hasMediaError) return <Loading loading={false} error={error} />;
  if (!media) return null;

  return (
    <div className="mt-0 min-h-screen flex flex-col justify-center items-center mx-auto py-4.5 text-white">
      {/* Header with Buttons */}
      <div className="mb-10 flex gap-4">
        <Button
          size="lg"
          onClick={() => router.back()}
          className="flex items-center justify-center gap-3 px-8 py-6 text-base transition-all duration-200 transform hover:scale-105"
        >
          <ArrowLeft />
          Go Back
        </Button>
        {hasTrailer && !hasVideoError && (
          <Button
            size="lg"
            onClick={() => router.push(`/trailer/${type}/${id}`)}
            className="flex items-center justify-center gap-3 px-8 py-6 text-base transition-all duration-200 transform hover:scale-105"
          >
            <Play />
            Watch Trailer
          </Button>
        )}

        {hasVideoError && !videoLoading && (
          <div className="px-8 py-6 bg-gray-900/50 border border-gray-600/30 rounded-lg">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Play className="w-4 h-4" />
              Trailer unavailable
            </p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-row gap-4 items-start">
        {/* Poster with Title and Tagline */}
        <MediaPoster
          title={media.title || media.name || ''}
          posterPath={media.poster_path || ''}
          tagline={media.tagline || ''}
          imageUrl={imageUrl}
        />

        {/* Cast Members and Media Info */}
        <div className="flex flex-col items-start">
          {!hasCastError && cast.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md font-bold mb-4 text-white">
                Cast Members
              </h2>
              <div className="flex gap-4 flex-wrap">
                {cast.slice(0, 4).map((actor) => (
                  <CastMember
                    key={actor.cast_id || actor.credit_id}
                    actor={{
                      cast_id: actor.cast_id,
                      credit_id: actor.credit_id,
                      profile_path: actor.profile_path,
                      name: actor.name,
                      character: actor.character || 'Unknown'
                    }}
                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : ''}
                    alt={actor.name}
                  />
                ))}
              </div>
            </div>
          )}

          {hasCastError && !mediaLoading && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">
                Unable to load cast information at this time.
              </p>
            </div>
          )}

          <MediaInfo media={media} type={type} />
        </div>
      </div>
    </div>
  );
};
