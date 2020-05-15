import styled from "styled-components";

/*==================================
           NavbarHeader
==================================*/
export const NavbarContainer = styled.div`
  display: flex;
  padding: 6px;
`;

export const NavbarMenu = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export const NavList = styled.ul`
display: flex;
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
  margin-top: 26px;
  margin-left: 30%;
`;

export const NavbarInput = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  padding: 8px;
`;
