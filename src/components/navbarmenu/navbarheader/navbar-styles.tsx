import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: ${(props) => props.theme.space[2]};
`;

export const NavbarMenu = styled.nav`
  display: flex;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  li {
    padding: ${(props) => props.theme.space[6]};
    white-space: nowrap;
  }
  li:hover {
    text-decoration: 6px underline;
  }
`;

export const BrandContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  list-style: none;
`;
