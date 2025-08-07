import React from 'react';
import { LoadingText, SpinnerContainer, SpinnerWrapper } from './spinner.styles';

export const Spinner = () => (
  <SpinnerContainer>
    <SpinnerWrapper />
    <LoadingText>Loading.....</LoadingText>
  </SpinnerContainer>
);
