
import { InfoColumnsWrapper, InfoColumn, InfoText, InfoLabel } from './details-styles';

interface MovieMedia {
  status: string;
  original_language: string;
  release_date: string;
  runtime: number;
  genres: Array<{ name: string }>;
  vote_average: number;
  vote_count: number;
}

interface TVMedia {
  status: string;
  original_language: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Array<{ name: string }>;
  vote_average: number;
  vote_count: number;
}


interface MediaInfoProps {
  media: MovieMedia | TVMedia;
  type: 'movie' | 'tv';
}

export const MediaInfo = ({ media, type }: MediaInfoProps) => (
  <InfoColumnsWrapper>
    <InfoColumn>
      <InfoText>
       <InfoLabel>Status:</InfoLabel> {media.status || 'N/A'}
      </InfoText>
      <InfoText>
         <InfoLabel>Original Language:</InfoLabel> {media.original_language || 'N/A'}
      </InfoText>
      {type === 'movie' ? (
        <>
          <InfoText>
             <InfoLabel>Release Date:</InfoLabel> {media.release_date || 'N/A'}
          </InfoText>
          <InfoText>
           <InfoLabel>Runtime:</InfoLabel> {media.runtime ? `${media.runtime} min` : 'N/A'}
          </InfoText>
        </>
      ) : (
        <>
          <InfoText>
            <InfoLabel>First Air Date:</InfoLabel> {media.first_air_date || 'N/A'}
          </InfoText>
          <InfoText>
            <InfoLabel>Last Air Date:</InfoLabel> {media.last_air_date || 'N/A'}
          </InfoText>
          <InfoText>
            <InfoLabel>Number of Seasons:</InfoLabel> {media.number_of_seasons || 'N/A'}
          </InfoText>
          <InfoText>
            <InfoLabel>Number of Episodes:</InfoLabel> {media.number_of_episodes || 'N/A'}
          </InfoText>
        </>
      )}
      <InfoText>
        <InfoLabel>Genres:</InfoLabel>
        {media.genres?.map((g: any) => g.name).join(', ')}
      </InfoText>
      <InfoText>
        <InfoLabel>Rating:</InfoLabel> {media.vote_average ? media.vote_average.toFixed(1) : 'N/A'}
      </InfoText>
      <InfoText>
        <InfoLabel>Vote Count:</InfoLabel> {media.vote_count ? media.vote_count.toLocaleString() : 'N/A'}
      </InfoText>
    </InfoColumn>
  </InfoColumnsWrapper>
);
