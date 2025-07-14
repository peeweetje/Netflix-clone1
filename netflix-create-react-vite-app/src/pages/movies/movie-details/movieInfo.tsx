import { InfoColumnsWrapper, InfoColumn, InfoText, InfoLabel } from './movieDetails-styles';


export const MovieInfo = ({ movie }: { movie: any }) => (
  <InfoColumnsWrapper>
    <InfoColumn>
      <InfoText>
        <InfoLabel>Status:</InfoLabel> {movie.status}
      </InfoText>
      <InfoText>
        <InfoLabel>Original Language:</InfoLabel> {movie.original_language}
      </InfoText>
      <InfoText>
        <InfoLabel>Release Date:</InfoLabel> {movie.release_date}
      </InfoText>
      <InfoText>
        <InfoLabel>Runtime:</InfoLabel> {movie.runtime} min
      </InfoText>
      <InfoText>
        <InfoLabel>Genres:</InfoLabel>{' '}
        {movie.genres?.map((g: any) => g.name).join(', ')}
      </InfoText>
      <InfoText>
        <InfoLabel>Rating:</InfoLabel> {movie.vote_average}
      </InfoText>
      <InfoText>
        <InfoLabel>Vote Count:</InfoLabel> {movie.vote_count}
      </InfoText>
    </InfoColumn>
    <InfoColumn>
      <InfoText>
        <InfoLabel>Budget:</InfoLabel> ${movie.budget?.toLocaleString()}
      </InfoText>
      <InfoText>
        <InfoLabel>Revenue:</InfoLabel> ${movie.revenue?.toLocaleString()}
      </InfoText>
      <InfoText>
        <InfoLabel>Production Companies:</InfoLabel>
        {movie.production_companies?.map((c: any) => c.name).join(', ')}
      </InfoText>
      <InfoText>
        <InfoLabel>Production Countries:</InfoLabel>
        {movie.production_countries?.map((c: any) => c.name).join(', ')}
      </InfoText>
      <InfoText>
        <InfoLabel>Homepage:</InfoLabel>
        {movie.homepage && (
          <a href={movie.homepage} target='_blank' rel='noopener noreferrer'>
            {movie.homepage}
          </a>
        )}
      </InfoText>
    </InfoColumn>
  </InfoColumnsWrapper>
);
