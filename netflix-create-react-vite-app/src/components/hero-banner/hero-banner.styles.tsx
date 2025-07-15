import styled from 'styled-components';



export const BannerContainer = styled.section<{ backgroundImage: string }>`
  position: relative;
  width: 100%;
  height: 75vh;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.backgroundImage});
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

export const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2vw;
  z-index: 2;
`;

export const BannerTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  max-width: 30vw;
  text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.7);
`;

export const BannerOverview = styled.p`
  font-size: 1.1rem;
  color: #fff;
  max-width: 32vw;
  margin-left: 2vw;
  text-align: right;
  text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.6);
`;

export const BannerButtons = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 1.5rem;
`;

export const BannerButton = styled.button`
  background: rgba(51, 51, 51, 0.7);
  color: #fff;
  border: none;
  padding: 0.7rem 2rem;
  font-size: 1.1rem;
  border-radius: 0.3vw;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
  &:hover {
    background: ${(props) => props.theme.colors.blue};
    color: #fff;
  }
`;
