import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../../components/card/card';
import { Spinner } from '../../components/spinner/spinner';
import { imageUrl, trendingShowUrl } from '../../utils/api';
import type { ShowResult } from '../../utils/types/types';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbarHeader';
import { useTranslation } from 'react-i18next';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Shows = () => {
  const [shows, setShows] = useState<ShowResult[]>([]);
  const [searchShows, setSearchShows] = useState<ShowResult[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const VITE_API_KEY = import.meta.env.VITE_API_KEY;
  const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${VITE_API_KEY}&query=${searchQuery}`;

  React.useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(trendingShowUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { results } = await response.json();
        setShows(results);
      } catch (err) {
        setError('Failed to fetch shows. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  React.useEffect(() => {
    if (!searchQuery) {
      setSearchShows([]);
      return;
    }
    const fetchSearchShows = async () => {
      setLoading(true);
      try {
        const response = await fetch(searchUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { results } = await response.json();
        setSearchShows(results);
      } catch (err) {
        setError('Failed to fetch shows. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchSearchShows();
  }, [searchQuery, searchUrl]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    if (!newSearchQuery) {
      setSearchShows([]);
    }
  };

  if (loading) {
    return (
      <div>
        <NavbarHeader onChange={handleSearch} value={searchQuery} />
        <Spinner />
        <p>{t ? t('loading') : 'Loading...'}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavbarHeader onChange={handleSearch} value={searchQuery} />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <h1>Best Shows</h1>
      <StyledContainer>
        {(searchShows.length > 0 ? searchShows : shows).map(
          (show) =>
            show.poster_path && (
              <Card
                alt={show.name}
                key={show.id}
                overview={show.overview}
                src={`${imageUrl}${show.poster_path}`}
                title={show.name}
                vote_average={show.vote_average}
              />
            )
        )}
      </StyledContainer>
    </div>
  );
};
