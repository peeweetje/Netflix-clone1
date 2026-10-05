import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { useTranslation } from 'react-i18next';
import type { CastMemberProps } from '../../utils/types/types';
import { detailsStyles } from './details-styles';

export const CastMember = ({ actor, src, alt }: CastMemberProps) => {
  const { t } = useTranslation();

  return (
    <div {...stylex.props(detailsStyles.castCard)}
      role="listitem"
      tabIndex={0}
      aria-label={`${t('actor-info', 'Actor')}: ${actor.name}, ${t('as-character', 'as')} ${actor.character}`}
    >
      {src && src !== '' ? (
        <img {...stylex.props(detailsStyles.castImage)}
          alt={`${t('actor-photo', 'Photo of')} ${alt}`}
          src={src}
        />
      ) : (
        <div {...stylex.props(detailsStyles.castImageFallback)} aria-label={t('no-photo-available', 'No photo available')}>
          N/A
        </div>
      )}
      <div {...stylex.props(detailsStyles.castName)} aria-label={t('actor-name', 'Actor name')}>{actor.name}</div>
      <div {...stylex.props(detailsStyles.castCharacter)} aria-label={t('character-role', 'Character role')}>
        {t('as-character', 'as')} {actor.character}
      </div>
    </div>
  );
};
