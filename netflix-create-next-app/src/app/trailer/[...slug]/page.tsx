'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '../../../components/loading/loading';
import {Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { movieVideosUrl, showVideosUrl, API_KEY } from '../../../utils/api';

interface TrailerPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

const TrailerPage = ({ params }: TrailerPageProps) => {
  const resolvedParams = use(params);
  const router = useRouter();
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTrailer = async () => {
      const [media_type, id] = resolvedParams.slug;

      if (!(id && media_type)) {
        setError('Invalid media type or ID');
        setLoading(false);
        return;
      }

      try {
        const url =
          media_type === 'movie'
            ? movieVideosUrl(Number(id))
            : showVideosUrl(Number(id));
        const response = await fetch(url);
        const data = await response.json();
        const videos = data.results;

        if (!videos || videos.length === 0) {
          setError('No videos found for this content');
          return;
        }

        const trailer = videos.find(
          (vid: any) => vid?.type === 'Trailer' && vid?.site === 'YouTube'
        );

        if (!(trailer && trailer.key)) {
          setError('No trailer found for this content');
          return;
        }

        setVideoKey(trailer.key);
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load trailer');
      } finally {
        setLoading(false);
      }
    };
    getTrailer();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center bg-background overflow-hidden'>
        <Loading loading={true} error={null} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='h-screen flex flex-col items-center justify-center bg-background text-foreground p-8 overflow-hidden'>
        <p className='mb-8 text-xl'>{error}</p>
        <Button onClick={() => router.back()} className='btn-primary cursor-pointer'>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className='h-screen bg-background flex flex-col items-center justify-center p-8 overflow-hidden'>
      <Button
        size='lg'
        onClick={() => router.back()}
        className='self-start mb-8'
      >
      <ArrowLeft className="mr-2" />
        Go Back
      </Button>

      {videoKey ? (
        <div className='w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-lg'>
          <iframe
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            frameBorder='0'
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title='Movie Trailer'
            className='w-full h-full'
          />
        </div>
      ) : (
        <p className='text-muted text-xl'>No trailer available</p>
      )}
    </div>
  );
};

export default TrailerPage;
