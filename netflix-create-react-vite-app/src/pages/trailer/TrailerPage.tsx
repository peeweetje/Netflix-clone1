import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieVideos } from '../../utils/api';
import { Spinner } from '../../components/spinner/spinner';
import styled from 'styled-components';
import { useTheme } from '../../context/themeContext';

const TrailerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* Fill the viewport height */
  background-color: #000;
  color: #fff;
  padding: 20px; /* Padding around content */
  box-sizing: border-box; /* Include padding in height */
  justify-content: flex-start; /* Align content to the top */
  overflow: hidden; /* Prevent scrolling on the container itself */
`;

const VideoWrapper = styled.div`
  width: 100%;
  max-width: 900px; /* Max width for the video */
  flex-grow: 1; /* Allow video wrapper to take available space */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    max-height: calc(100vh - 100px); /* Calculate max height based on viewport minus button/padding */
    aspect-ratio: 16 / 9; /* Maintain aspect ratio */
  }
`;

const GoBackButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px; /* Space below the button */
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryLight};
  }
`;

export const TrailerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const getTrailer = async () => {
      if (!id) {
        setError('Movie ID not provided.');
        setLoading(false);
        return;
      }

      try {
        const videos = await fetchMovieVideos(Number(id));

        if (!videos || videos.length === 0) {
          setError('No videos found for this movie.');
          return;
        }

        const trailer = videos.find((vid: any) => vid?.type === 'Trailer' && vid?.site === 'YouTube');

        if (!trailer || !trailer.key) {
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
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Movie Trailer"
          ></iframe>
        </VideoWrapper>
      ) : (
        <p>No trailer available.</p>
      )}
    </TrailerContainer>
  );
};