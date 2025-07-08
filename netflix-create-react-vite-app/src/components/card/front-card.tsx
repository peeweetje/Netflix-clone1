import { CardFront, StyledImg } from './card.styles';

type FrontCardProps = {
  src: string;
  alt: string;
};

export const FrontCard = ({ src, alt }: FrontCardProps) => {
  return (
    <CardFront>
      <StyledImg alt={alt} src={src} />
    </CardFront>
  );
};
