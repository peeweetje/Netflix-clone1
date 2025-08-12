import type { CastMemberProps } from '../../utils/types/types';
import {
  CastCard,
  CastCharacter,
  CastImage,
  CastImageFallback,
  CastName,
} from './details-styles';


export const CastMember = ({ actor, src, alt }: CastMemberProps) => {
  return (
    <CastCard>
      {src && src !== '' ? (
        <CastImage alt={alt} src={src} />
      ) : (
        <CastImageFallback>N/A</CastImageFallback>
      )}
      <CastName>{actor.name}</CastName>
      <CastCharacter>{actor.character}</CastCharacter>
    </CastCard>
  );
};
