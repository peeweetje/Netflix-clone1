import styled from 'styled-components';

export const TrailerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* Fill the viewport height */
  padding: ${(props) => props.theme.space[4]}; /* Padding around content */
  box-sizing: border-box; /* Include padding in height */
  justify-content: flex-start; /* Align content to the top */
  overflow: hidden; /* Prevent scrolling on the container itself */
`;

export const VideoWrapper = styled.div`
  width: 100%;
  max-width: 900px; /* Max width for the video */
  flex-grow: 1; /* Allow video wrapper to take available space */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    max-height: calc(
      100vh - 100px
    ); /* Calculate max height based on viewport minus button/padding */
    aspect-ratio: 16 / 9; /* Maintain aspect ratio */
  }
`;

 export const GoBackButton = styled.button`
   background-color: ${(props) => props.theme.colors.primary};
   color: ${(props) => props.theme.colors.buttonText};
   border: none;
   padding: 10px 20px;
   font-size: ${(props) => props.theme.fontSize[3]};
   cursor: pointer;
   border-radius: ${(props) => props.theme.borderRadius[1]};
   margin-bottom: ${(props) =>
     props.theme.space[4]}; /* Space below the button */
   &:hover {
     background-color: ${(props) => props.theme.colors.primaryLight};
   }
 `;
