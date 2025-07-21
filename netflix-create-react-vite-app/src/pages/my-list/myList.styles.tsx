import styled from 'styled-components';


export const CardWrapper = styled.div`
  position: relative;
`;

export const MyListContainer = styled.div`
  padding:${({ theme }) => theme.space[10]};
  min-height: 100vh;
  background:${({ theme }) => theme.colors.black};
 
`;

export const MoviesGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[9]};
  flex-wrap: wrap;
`;

export const MovieCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius[2]};
`;

export const MoviePoster = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const MovieTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize[4]};
  margin: 0 0 10px 0;
  font-weight: 500;
`;

export const RemoveButton = styled.button`
  background: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius[1]};
  padding: 8px 16px;
  font-size: ${(props) => props.theme.fontSize[3]};
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
  }
`;
