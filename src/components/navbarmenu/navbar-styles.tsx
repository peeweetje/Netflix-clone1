import styled from 'styled-components';

/*==================================
           NavbarHeader
==================================*/
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0.375rem;
`;

export const NavbarMenu = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  li {
    padding: 1.125rem;
    white-space: nowrap;
  }
  li: first-of-type {
    font-size: 1.875rem;
    padding: 0.5rem;
  }
`;

/*==================================
          SearchBar
==================================*/
export const NavbarSearch = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2.5rem;
`;

export const NavbarInput = styled.input`
  border: 0.0625rem solid black;
  border-radius: 0.375rem;
  padding: 0.5rem;
`;
