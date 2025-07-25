import styled from 'styled-components';

export const NavbarMenu = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NavList = styled.ul<{ $centered?: boolean }>`
  
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  ${(props) =>
    props.$centered &&
    `
      margin-left: auto;
      margin-right: auto;
    `}

  li {
    padding: ${(props) => props.theme.space[8]};
    white-space: nowrap;
    font-size: ${(props) => props.theme.fontSize[4]};
    color: ${(props) => props.theme.colors.lightPurple};
  }

  li:hover {
    text-decoration: 5px underline;
  }
 
  li.active {
    text-decoration: 5px underline;
    BackgroundColor: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.white};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const BrandContainer = styled.div<{ $centered?: boolean }>`
  display: flex;
  align-items: center;
  ${(props) => !props.$centered && `margin-right: auto;`}
  font-size: ${(props) => props.theme.fontSize[5]};
  padding-left: ${(props) => props.theme.space[8]};
  list-style: none;
  color: ${(props) => props.theme.colors.lightPurple};


  @media (max-width: 768px) {
    justify-content: center;
    margin-right: ${(props) => props.theme.space[0]};
  }
`;

 export const ToggleButton = styled.button`
  margin-left: auto;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.buttonText};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightPurple};
  }
`;
