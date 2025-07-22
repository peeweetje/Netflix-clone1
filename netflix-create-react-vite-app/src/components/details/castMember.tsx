import {
  CastCard,
  CastImage,
  CastName,
  CastCharacter,
  CastImageFallback,
} from './details-styles';
import { CastMemberProps } from '../../utils/types/types';



export const CastMember=({ actor, src, alt }: CastMemberProps)=> {
  return (
    <CastCard>
      {src && src !== '' ? (
        <CastImage src={src} alt={alt} />
      ) : (
        <CastImageFallback>N/A</CastImageFallback>
      )}
      <CastName>{actor.name}</CastName>
      <CastCharacter>{actor.character}</CastCharacter>
    </CastCard>
  );
}
