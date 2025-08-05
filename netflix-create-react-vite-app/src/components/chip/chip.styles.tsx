import styled from 'styled-components';

export const ChipContainer = styled.div<{
  color: string | undefined;
}>`
  display: inline-block;
  padding: 2px 6px;
  border-radius:${(props) => props.theme.borderRadius[1]};
  font-size: ${(props) => props.theme.fontSize[2]};
  background-color: ${(props) => props.color};
  color:${(props) => props.theme.colors.white};
 
  @media (max-width: 768px) {
    font-size: ${(props) => props.theme.fontSize[0]};
    padding: 1px 4px;
  }
`;
