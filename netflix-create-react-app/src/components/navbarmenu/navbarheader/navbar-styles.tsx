import styled from "styled-components";

export const NavbarMenu = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  font-size: ${(props) => props.theme.fontSize[2]};
  padding-left: ${(props) => props.theme.space[8]};
  list-style: none;

  @media (max-width: 768px) {
    justify-content: center;
    margin-right: 0;
  }
`;
