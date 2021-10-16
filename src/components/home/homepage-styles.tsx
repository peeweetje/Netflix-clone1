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
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(169, 154, 154, 0.54);
    height: 350px;
    width: 250px;
  }
`;
