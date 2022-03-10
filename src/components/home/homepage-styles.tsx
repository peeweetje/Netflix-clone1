import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ContentContainer = styled.div`
  padding: ${(props) => props.theme.space[4]};

  img {
    border-radius: ${(props) => props.theme.borderRadius[3]};
    box-shadow: ${(props) => props.theme.boderShadow[0]};
    height: 350px;
    width: 250px;
  }
`;
