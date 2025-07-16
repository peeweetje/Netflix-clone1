import styled from 'styled-components';


export const CardWrapper = styled.div`
  position: relative;
`;

export const MyListContainer = styled.div`
  padding: 32px;
  min-height: 100vh;
  background:${({ theme }) => theme.colors.black};
 
`;

export const MoviesGrid = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

export const MovieCard = styled.div`
  width: 200px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 16px 8px 20px 8px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.04);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  }
`;

export const MoviePoster = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const MovieTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 10px 0;
  font-weight: 500;
`;

export const RemoveButton = styled.button`
  background: ${(props) => props.theme.colors.blue};
  border: none;
  border-radius: 4px;
  padding: 4px 16px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
  }
`;
