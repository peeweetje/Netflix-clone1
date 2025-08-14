import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading/loading';
import { useTheme } from '../../context/themeContext';
import { movieVideosUrl, showVideosUrl } from '../../utils/api';
import {
  GoBackButton,
  TrailerContainer,
  VideoWrapper,
} from './trailer-page-styles';

export const TrailerPage = () => {
  const { t } = useTranslation();
  const { id, media_type } = useParams<{ id: string; media_type: string }>();
  const navigate = useNavigate();
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const getTrailer = async () => {
      if (!(id && media_type)) {
        setError(t('media-type-error'));
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
          setError(t('video-not-found'));
          return;
        }

        const trailer = videos.find(
          (vid: any) => vid?.type === 'Trailer' && vid?.site === 'YouTube'
        );

        if (!(trailer && trailer.key)) {
          setError(t('no-trailer-found'));
          return;
        }

        setVideoKey(trailer.key);
      } catch (err) {
        console.error(t('error-fetch-video'), err);
        setError(t('failed-load-trailer'));
      } finally {
        setLoading(false);
      }
    };
    getTrailer();
  }, [id]);

  if (loading) {
    return (
      <TrailerContainer>
       <Loading/>
      </TrailerContainer>
    );
  }

  if (error) {
    return (
      <TrailerContainer>
        <p>{error}</p>
        <GoBackButton onClick={() => navigate(-1)}>{t('go-back')}</GoBackButton>
      </TrailerContainer>
    );
  }

  return (
    <TrailerContainer>
      <GoBackButton onClick={() => navigate(-1)}>{t('go-back')}</GoBackButton>
      {videoKey ? (
        <VideoWrapper>
          <iframe
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            frameBorder='0'
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title={t('movie-trailer')}
          />
        </VideoWrapper>
      ) : (
        <p>{t('no-trailer-available')}</p>
      )}
    </TrailerContainer>
  );
};
