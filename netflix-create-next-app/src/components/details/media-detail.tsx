'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '../loading/loading';
import { Button } from '../ui/button';
import { MediaPoster } from './media-poster';
import { MediaInfo } from './media-info';
import { CastMember } from './cast-member';
import { useMyList } from '../../context/myListContext';
import { ArrowLeft, Play } from 'lucide-react';
import { imageUrl, API_KEY } from '../../utils/api';

interface MediaDetailProps {
  type: 'movie' | 'tv';
  id: string;
}

interface MediaData {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  overview?: string;
  tagline?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  genres?: Array<{ id: number; name: string }>;
}

interface CastMember {
  cast_id?: number;
  credit_id: string;
  name: string;
  profile_path?: string;
  character?: string;
}

interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export const MediaDetail = ({ type, id }: MediaDetailProps) => {
  const router = useRouter();
  const [media, setMedia] = useState<MediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [hasTrailer, setHasTrailer] = useState(false);

  // Use useRef to persist AbortController across re-renders
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cancel any ongoing request when id or type changes
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!id) {
      setLoading(false);
      return;
    }

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setError(null);

    // Create all fetch promises with AbortController signal
    const fetchMedia = fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`,
      { signal }
    ).then((res) => {
      if (!res.ok) throw new Error(`Media API error: ${res.status}`);
      return res.json();
    });

    const fetchCast = fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}`,
      { signal }
    ).then((res) => {
      if (!res.ok) throw new Error(`Cast API error: ${res.status}`);
      return res.json();
    });

    const fetchVideos = fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`,
      { signal }
    ).then((res) => {
      if (!res.ok) throw new Error(`Videos API error: ${res.status}`);
      return res.json();
    });

    // Execute all requests in parallel
    Promise.all([fetchMedia, fetchCast, fetchVideos])
      .then(([mediaData, castData, videoData]) => {
        // Only update state if this request wasn't aborted
        if (!signal.aborted) {
          setMedia(mediaData);
          setCast(castData.cast || []);
          const trailer = videoData.results?.find(
            (vid: VideoResult) => vid.type === 'Trailer' && vid.site === 'YouTube'
          );
          setHasTrailer(!!trailer);
          setError(null);
        }
      })
      .catch((error) => {
        // Only handle errors if this request wasn't aborted
        if (!signal.aborted) {
          if (error.name === 'AbortError') {
            // Request was cancelled, don't treat as error
            return;
          }
          console.error('Media detail fetch error:', error);
          setError(`Failed to fetch ${type} details. Please try again later.`);
          setMedia(null);
          setCast([]);
          setHasTrailer(false);
        }
      })
      .finally(() => {
        // Only update loading state if this request wasn't aborted
        if (!signal.aborted) {
          setLoading(false);
        }
      });

    // Cleanup function to abort request if component unmounts or effect runs again
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [id, type]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  if (loading) return <Loading loading={true} error={null} />;
  if (error) return <Loading loading={false} error={error} />;
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
        {hasTrailer && (
          <Button
            size="lg"
            onClick={() => router.push(`/trailer/${type}/${id}`)}
            className="flex items-center justify-center gap-3 px-8 py-6 text-base transition-all duration-200 transform hover:scale-105"
          >
            <Play />
            Watch Trailer
          </Button>
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
          {cast.length > 0 && (
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
          <MediaInfo media={media} type={type} />
        </div>
      </div>
    </div>
  );
};
