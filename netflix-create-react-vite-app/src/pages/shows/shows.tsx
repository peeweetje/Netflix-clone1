import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Card } from '../../components/card/card';
import { CardWrapper } from '../../components/card-wrapper/card-wrapper';
import { Loading } from '../../components/loading/loading';
import { NavbarHeader } from '../../components/navbarmenu/navbarheader/navbar-header';
import { useGlobalSearch } from '../../hooks/useGlobalSearch';
import { imageUrl, trendingShowUrl } from '../../utils/api';
import type { ShowResult } from '../../utils/types/types';

const StyledContainer = styled.div`
  margin-top: ${(props) => props.theme.space[10]};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[9]};
  justify-content: center;
`;

export const Shows = () => {
  const [shows, setShows] = useState<ShowResult[]>([]);
  const [showsLoading, setShowsLoading] = useState<boolean>(true);
  const [showsError, setShowsError] = useState<string | null>(null);
  const { t } = useTranslation();

  const {
    searchQuery,
    setSearchQuery,
    searchResultsShows,
    searchLoading,
    searchError,
  } = useGlobalSearch();

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
        setShowsError('Failed to fetch shows. Please try again later.');
      } finally {
        setShowsLoading(false);
      }
    };
    fetchShows();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const isLoading = searchQuery ? searchLoading : showsLoading;
  const error = searchQuery ? searchError : showsError;

  const renderContent = () => {
    if (searchQuery) {
      return searchResultsShows.map(
        (show) =>
          show.poster_path &&
          show.id && (
            <CardWrapper key={show.id} to={`/shows/${show.id}`}>
              <Card
                alt={show.name}
                id={show.id}
                media_type="tv"
                overview={show.overview}
                src={`${imageUrl}${show.poster_path}`}
                title={show.name}
                vote_average={show.vote_average}
              />
            </CardWrapper>
          )
      );
    }

    return shows.map(
      (show) =>
        show.poster_path &&
        show.id && (
          <CardWrapper key={show.id} to={`/shows/${show.id}`}>
            <Card
              alt={show.name}
              id={show.id}
              key={show.id}
              media_type="tv"
              overview={show.overview}
              src={`${imageUrl}${show.poster_path}`}
              title={show.name}
              vote_average={show.vote_average}
            />
          </CardWrapper>
        )
    );
  };

  return (
    <>
      <NavbarHeader onChange={handleSearch} value={searchQuery} />
      <StyledContainer>
        <Loading loading={isLoading} error={error}>
          {renderContent()}
        </Loading>
      </StyledContainer>
    </>
  );
};
