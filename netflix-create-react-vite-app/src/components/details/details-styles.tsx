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
 margin-top: ${({ theme }) => theme.space[4]};
  width: 300px;
  border-radius: ${({ theme }) => theme.borderRadius[2]};
`;

export const DetailFlex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

export const InfoColumnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
 
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 1;
  min-width: 0;
  line-height:${({ theme }) => theme.lineHeight[3]};
  padding: ${({ theme }) => theme.space[3]};
  border: 1px solid ${({ theme }) => theme.colors.grey[2]};
 
`;

export const InfoText = styled.p`
  margin:${({ theme }) => theme.space[1]} ;
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
  margin-bottom: ${({ theme }) => theme.space[6]};
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

export const Tagline = styled.p`
  width: 300px; 
  margin-top: ${({ theme }) => theme.space[3]};
  text-align: center;
  word-break: break-word;
  margin-left: auto;
  margin-right: auto;
`;

export const MainColumns = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.space[4]};
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

export const Title = styled.h2`
  width: 300px;
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

export const PosterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
`;
