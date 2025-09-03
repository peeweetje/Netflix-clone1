'use client';

import type React from 'react';
import { use } from 'react';
import { MediaDetail } from '../../../components/details/media-detail';

interface ShowDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const ShowDetailPage= ({ params }: ShowDetailPageProps) => {
  const resolvedParams = use(params);
  return <MediaDetail type="tv" id={resolvedParams.id} />;
};

export default ShowDetailPage;
