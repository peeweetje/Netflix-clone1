
import styled from 'styled-components';


export const CardWrapper = styled.div`
  position: relative;
`;

export const MyListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.space[8]};
  justify-content: center;
  align-items: flex-start;

`;

export const MoviesGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[9]};
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space[10]};
`;

export const MovieCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius[2]};
`;

export const MoviePoster = styled.img`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius[3]};
`;

export const MovieTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize[4]};
  margin: 0 0 10px 0;
  font-weight: 500;
`;

export const RemovalNotice = styled.div`
  color: ${({ theme }) => theme.colors.orange};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

export const RemoveButton = styled.button`
  width: 100%;
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
