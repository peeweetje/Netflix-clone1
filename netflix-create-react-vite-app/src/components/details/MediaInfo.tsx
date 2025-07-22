
import { InfoColumnsWrapper, InfoColumn, InfoText, InfoLabel } from './details-styles';

interface MediaInfoProps {
  media: any;
  type: 'movie' | 'tv';
}

export const MediaInfo: React.FC<MediaInfoProps> = ({ media, type }) => (
  <InfoColumnsWrapper>
    <InfoColumn>
      <InfoText>
        <InfoLabel>Status:</InfoLabel> {media.status}
      </InfoText>
      <InfoText>
        <InfoLabel>Original Language:</InfoLabel> {media.original_language}
      </InfoText>
      {type === 'movie' ? (
        <>
          <InfoText>
            <InfoLabel>Release Date:</InfoLabel> {media.release_date}
          </InfoText>
          <InfoText>
            <InfoLabel>Runtime:</InfoLabel> {media.runtime} min
          </InfoText>
        </>
      ) : (
        <>
          <InfoText>
            <InfoLabel>First Air Date:</InfoLabel> {media.first_air_date}
          </InfoText>
          <InfoText>
            <InfoLabel>Last Air Date:</InfoLabel> {media.last_air_date}
          </InfoText>
          <InfoText>
            <InfoLabel>Number of Seasons:</InfoLabel> {media.number_of_seasons}
          </InfoText>
          <InfoText>
            <InfoLabel>Number of Episodes:</InfoLabel> {media.number_of_episodes}
          </InfoText>
        </>
      )}
      <InfoText>
        <InfoLabel>Genres:</InfoLabel>{' '}
        {media.genres?.map((g: any) => g.name).join(', ')}
      </InfoText>
      <InfoText>
        <InfoLabel>Rating:</InfoLabel> {media.vote_average}
      </InfoText>
      <InfoText>
        <InfoLabel>Vote Count:</InfoLabel> {media.vote_count}
      </InfoText>
    </InfoColumn>
    
  </InfoColumnsWrapper>
);
