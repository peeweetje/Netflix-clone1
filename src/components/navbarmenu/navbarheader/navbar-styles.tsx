import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  padding: ${(props) => props.theme.space[4]};
  width: 100%;
`;

export const NavbarMenu = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: center;
  flex-flow: wrap;

  li {
    padding: ${(props) => props.theme.space[8]};
    white-space: nowrap;
  }
  li:hover {
    text-decoration: 5px underline;
  }
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  font-size: ${(props) => props.theme.fontSize[3]};
  padding-left: ${(props) => props.theme.space[8]};
  list-style: none;
`;
