import styled from 'styled-components';

/*==================================
           NavbarHeader
==================================*/
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 6px;
`;

export const NavbarMenu = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export const NavList = styled.ul`
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
li{
  padding 18px;
  white-space: nowrap;
}
li: first-of-type {
  font-size: 30px;
  padding: 8px;
} 
`;

/*==================================
          SearchBar
==================================*/
export const NavbarSearch = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
`;

export const NavbarInput = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  padding: 8px;
`;
