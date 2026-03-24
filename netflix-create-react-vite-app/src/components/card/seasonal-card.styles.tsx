import styled from 'styled-components';

export const CardContainer = styled.div`
  margin-top: ${(props: { theme: { space: string[] } }) => props.theme.space[6]};
  position: relative;
  display: inline-block;

  @media (max-width: ${(props: { theme: { breakpoints: { sm: string } } }) => props.theme.breakpoints.sm}) {
    transform: scale(0.9);
    margin-top: ${(props: { theme: { space: string[] } }) => props.theme.space[0]};
  }
`;
