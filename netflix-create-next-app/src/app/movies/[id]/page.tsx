'use client';

import type React from 'react';
import { use } from 'react';
import { MediaDetail } from '../../../components/details/media-detail';

interface MovieDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const MovieDetailPage = ({ params }: MovieDetailPageProps) => {
  const resolvedParams = use(params);
  return <MediaDetail type="movie" id={resolvedParams.id} />;
};

export default MovieDetailPage;
