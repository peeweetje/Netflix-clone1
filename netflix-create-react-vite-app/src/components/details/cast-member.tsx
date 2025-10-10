import React from 'react';
import { useTranslation } from 'react-i18next';
import type { CastMemberProps } from '../../utils/types/types';
import {
  CastCard,
  CastCharacter,
  CastImage,
  CastImageFallback,
  CastName,
} from './details-styles';

export const CastMember = ({ actor, src, alt }: CastMemberProps) => {
  const { t } = useTranslation();

  return (
    <CastCard
      role="listitem"
      tabIndex={0}
      aria-label={`${t('actor-info', 'Actor')}: ${actor.name}, ${t('as-character', 'as')} ${actor.character}`}
    >
      {src && src !== '' ? (
        <CastImage
          alt={`${t('actor-photo', 'Photo of')} ${alt}`}
          src={src}
        />
      ) : (
        <CastImageFallback aria-label={t('no-photo-available', 'No photo available')}>
          N/A
        </CastImageFallback>
      )}
      <CastName aria-label={t('actor-name', 'Actor name')}>{actor.name}</CastName>
      <CastCharacter aria-label={t('character-role', 'Character role')}>
        {t('as-character', 'as')} {actor.character}
      </CastCharacter>
    </CastCard>
  );
};
