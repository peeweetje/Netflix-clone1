import styled from 'styled-components';

export const NavbarSearch = styled.div`
  padding: ${(props) => props.theme.space[8]};
  margin-left: auto;
`;

export const NavbarInput = styled.input`
  border: 1px solid black;
  border-radius: ${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => props.theme.space[4]};
  margin: ${(props) => props.theme.space[4]};
`;
