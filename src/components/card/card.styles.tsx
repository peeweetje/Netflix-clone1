import styled from 'styled-components';

export const CardContainer = styled.div`
  padding: ${(props) => props.theme.space[6]};
  height: 400px;
`;

export const StyledImg = styled.img`
  border-radius: ${(props) => props.theme.borderRadius[3]};
  box-shadow: ${(props) => props.theme.boderShadow[0]};
  height: 350px;
  width: 250px;
`;
