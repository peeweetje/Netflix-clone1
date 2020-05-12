import styled from "styled-components";

/*==================================
           NavbarHeader
==================================*/
export const NavbarContainer = styled.div`
  h1 {
    color: #8eb3cc;
    padding-left: 15px;
  }

  li {
    padding-left: 37px;
  }
`;

export const NavbarMenu = styled.nav`
  display: flex;
  justify-content: flex-start;
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: center;
  padding: 11px;
`;

/*==================================
          SearchBar
==================================*/
export const NavbarSearch = styled.form`
  margin-top: 24px;
  margin-left: 5%;
  border-radius: 1px solid #000;
`;

export const NavbarInput = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  width: 134%;
  border-radius: 1px solid #000;
  outline: none;
`;
