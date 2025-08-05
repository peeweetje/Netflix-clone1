import styled from 'styled-components';

export const CardContainer = styled.div`
  margin-top: ${(props) => props.theme.space[6]};
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    transform: scale(0.9);
    margin-top: 0;
  }
`;
