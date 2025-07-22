
import { PosterContainer, PosterImage, Title, Tagline } from './details-styles';

interface MediaPosterProps {
  title: string;
  posterPath: string;
  tagline: string;
  imageUrl: string;
}

export const MediaPoster: React.FC<MediaPosterProps> = ({
  title,
  posterPath,
  tagline,
  imageUrl,
}) => (
  <PosterContainer>
    <Title>{title}</Title>
    <PosterImage src={`${imageUrl}${posterPath}`} alt={title} />
    <Tagline>{tagline}</Tagline>
  </PosterContainer>
);
