import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { useTranslation } from 'react-i18next';
import { spinnerStyles } from './spinner.styles';

export const Spinner = () => {
  const { t } = useTranslation();

  return (
  <div {...stylex.props(spinnerStyles.container)}>
    <div {...stylex.props(spinnerStyles.spinner)} />
    <p {...stylex.props(spinnerStyles.text)}>{t('loading')}</p>
  </div>
 )
}
