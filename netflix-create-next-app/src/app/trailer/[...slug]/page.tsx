'use client';

import { use, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '../../../components/loading/loading';
import {Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchVideos } from '../../../utils/queries';

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
  const hasNoTrailer = !videoKey && !loading;

  const getErrorMessage = () => {
    if (hasError) return error?.message || 'Failed to load trailer.';
    if (hasNoTrailer) return 'No trailer found for this content.';
    return null;
  };

  const errorMessage = getErrorMessage();

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center bg-background overflow-hidden'>
        <Loading loading={true} error={null} />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className='h-screen flex flex-col items-center justify-center bg-background text-foreground p-8 overflow-hidden'>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {hasError ? 'Unable to Load Trailer' : 'Trailer Not Available'}
          </h2>
          <p className="text-xl mb-6 text-muted-foreground">
            {errorMessage}
          </p>
          {hasError && (
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg max-w-md mx-auto mb-6">
              <p className="text-red-400 text-sm">
                Please check your internet connection and try again.
              </p>
            </div>
          )}
        </div>
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
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Trailer Not Available</h2>
          <p className="text-xl text-muted-foreground mb-6">
            This content doesn't have a trailer available at the moment.
          </p>
          <div className="p-4 bg-gray-900/50 border border-gray-600/30 rounded-lg max-w-md mx-auto mb-6">
            <p className="text-gray-400 text-sm">
              Trailers may be added later or might not be available for this content.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailerPage;
