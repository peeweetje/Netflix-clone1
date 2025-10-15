'use client';

import { use, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ViewTransition } from 'react';
import { Loading } from '../../../components/loading/loading';
import {Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchVideos } from '../../../utils/queries';
import { ErrorDisplay } from '../../../components/error-display/error-display';

interface TrailerPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

const TrailerPage = ({ params }: TrailerPageProps) => {
  const resolvedParams = use(params);
  const router = useRouter();

  const [media_type, id] = resolvedParams.slug;

  const {
    data: videos = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['videos', media_type, id],
    queryFn: () => fetchVideos(media_type as 'movie' | 'tv', id),
    enabled: !!id && !!media_type,
    staleTime: 1000 * 60 * 30, // 30 minutes for videos
    retry: 2,
  });

  const videoKey = useMemo(() => {
    if (!videos || videos.length === 0) return null;

    const trailer = videos.find(
      (vid: any) => vid?.type === 'Trailer' && vid?.site === 'YouTube'
    );

    return trailer?.key || null;
  }, [videos]);

  // Enhanced error handling
  const hasError = !!error;
  const hasNoTrailer = !videoKey && !loading && !hasError;

  if (loading) {
    return (
      <ViewTransition>
        <div className='h-screen flex items-center justify-center bg-background overflow-hidden'>
          <Loading loading={true} error={null}>
            <div />
          </Loading>
        </div>
      </ViewTransition>
    );
  }

  if (hasError) {
    return (
      <ViewTransition>
        <div className='h-screen flex flex-col items-center justify-center bg-background text-foreground p-8 overflow-hidden'>
          <div className="text-center mb-8 max-w-lg">
            <ErrorDisplay
              title="Unable to Load Trailer"
              message="Failed to load trailer"
              type="error"
              className="mb-6"
            />
            <p className="text-sm text-muted-foreground mb-6">
              Please check your internet connection and try again.
            </p>
          </div>
          <Button onClick={() => router.back()} className='btn-primary cursor-pointer' aria-label="Go back to previous page">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </ViewTransition>
    );
  }

  if (hasNoTrailer) {
    return (
      <ViewTransition>
        <div className='h-screen flex flex-col items-center justify-center bg-background text-foreground p-8 overflow-hidden'>
          <div className="text-center mb-8 max-w-lg">
            <ErrorDisplay
              title="Trailer Not Available"
              message="No trailer found for this content."
              type="no-data"
              className="mb-6"
            />
            <p className="text-sm text-muted-foreground mb-6">
              Trailers may be added later or might not be available for this content.
            </p>
          </div>
          <Button onClick={() => router.back()} className='btn-primary cursor-pointer' aria-label="Go back to previous page">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </ViewTransition>
    );
  }

  return (
    <ViewTransition>
      <main id="main-content" className='h-screen bg-background flex flex-col items-center justify-center p-8 overflow-hidden'>
        <Button
          size='lg'
          onClick={() => router.back()}
          className='self-start mb-8'
          aria-label="Go back to previous page"
        >
        <ArrowLeft className="mr-2" />
          Go Back
        </Button>

        <div className='w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-lg'>
          <iframe
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            frameBorder='0'
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title={`${media_type === 'movie' ? 'Movie' : 'TV Show'} Trailer`}
            className='w-full h-full'
          />
        </div>
      </main>
    </ViewTransition>
  );
};

export default TrailerPage;
