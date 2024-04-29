import styled from "styled-components";

export const NavbarSearch = styled.div`
  padding: ${(props) => props.theme.space[8]};
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const NavbarInput = styled.input`
  border: 1px solid black;
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => props.theme.space[4]};
  margin: ${(props) => props.theme.space[4]};
  cursor: pointer;

  @media (max-width: 768px) {
    width: 75%;
  }
`;
