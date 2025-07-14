import styled from 'styled-components';

export const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space[7]};
`;

export const PosterImage = styled.img`
  width: 300px;
  border-radius: ${({ theme }) => theme.borderRadius[2]};
`;

export const DetailFlex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const InfoColumnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.space[4]};
  height: 100%;
  align-items: stretch;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
`;

export const InfoText = styled.p`
  margin: 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSize[3]};
  
`;

export const InfoLabel = styled.span`
  font-weight: bold;
  margin-right: 0.2em;
`;

export const CastSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CastList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[6]};
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

export const ImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TagLine = styled.p`
  width: 300px; 
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.space[3]};
  text-align: center;
  word-break: break-word;
  margin-left: auto;
  margin-right: auto;
`;

export const MainColumns = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.space[11]};
  align-items: flex-start;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

export const MovieTitle = styled.h2`
  width: 300px;
  flex-wrap: wrap;
  align-items: center;
  word-break: break-word;
  text-align: center;
  margin: 8px auto;
`;

export const CastCard = styled.div`
  text-align: center;
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CastImage = styled.img`
  width: 80px;
  height: 120px;
  border-radius: ${({ theme }) => theme.borderRadius[2]};
  object-fit: cover;
  background: ${({ theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CastName = styled.div`
  font-weight: bold;
  margin-top: ${({ theme }) => theme.space[2]};
`;

export const CastCharacter = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
`;


export const CastImageFallback = styled.div`
  width: 80px;
  height: 120px;
  border-radius: ${({ theme }) => theme.borderRadius[2]};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.blue};
  font-size: 14px;
`;
