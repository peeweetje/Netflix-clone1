'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMedia(data);
      } catch (err) {
        setError(`Failed to fetch ${type} details. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, [id, type]);

  useEffect(() => {
    const fetchCast = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch cast');
        const data = await response.json();
        setCast(data.cast || []);
      } catch (err) {
        console.error('Failed to fetch cast data:', err);
      }
    };
    fetchCast();
  }, [id, type]);

  useEffect(() => {
    const checkTrailer = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch videos');
        const data = await response.json();
        const trailer = data.results.find(
          (vid: VideoResult) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        setHasTrailer(!!trailer);
      } catch (error) {
        console.error(`Failed to fetch ${type} videos:`, error);
      }
    };
    checkTrailer();
  }, [id, type]);

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
