import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingText, SpinnerContainer, SpinnerWrapper } from './spinner.styles';

export const Spinner = () => {
  const { t } = useTranslation();

  return (
  <SpinnerContainer>
    <SpinnerWrapper />
    <LoadingText>{t('loading')}</LoadingText>
  </SpinnerContainer>
 )
}
