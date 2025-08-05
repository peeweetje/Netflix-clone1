import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../components/spinner/spinner';
import { useTheme } from '../../context/themeContext';
import { movieVideosUrl, showVideosUrl } from '../../utils/api';
import {
  GoBackButton,
  TrailerContainer,
  VideoWrapper,
} from './trailer-page-styles';

export const TrailerPage = () => {
  const { id, media_type } = useParams<{ id: string; media_type: string }>();
  const navigate = useNavigate();
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const getTrailer = async () => {
      if (!(id && media_type)) {
        setError('ID or media type not provided.');
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
          setError('No videos found for this movie.');
          return;
        }

        const trailer = videos.find(
          (vid: any) => vid?.type === 'Trailer' && vid?.site === 'YouTube'
        );

        if (!(trailer && trailer.key)) {
          setError('No trailer found for this movie.');
          return;
        }

        setVideoKey(trailer.key);
      } catch (err) {
        console.error('Failed to fetch video data:', err);
        setError('Failed to load trailer. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getTrailer();
  }, [id]);

  if (loading) {
    return (
      <TrailerContainer>
        <Spinner />
        <p>Loading trailer...</p>
      </TrailerContainer>
    );
  }

  if (error) {
    return (
      <TrailerContainer>
        <p>{error}</p>
        <GoBackButton onClick={() => navigate(-1)}>Go Back</GoBackButton>
      </TrailerContainer>
    );
  }

  return (
    <TrailerContainer>
      <GoBackButton onClick={() => navigate(-1)}>Go Back</GoBackButton>
      {videoKey ? (
        <VideoWrapper>
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="Movie Trailer"
          />
        </VideoWrapper>
      ) : (
        <p>No trailer available.</p>
      )}
    </TrailerContainer>
  );
};
