import styled from 'styled-components';

export const NavbarSearch = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding:  ${(props) => props.theme.space[10]};
`;

export const NavbarInput = styled.input`
  border: 1px solid black;
  border-radius:${(props) => props.theme.borderRadius[2]};
  padding: ${(props) => props.theme.space[4]};
`;
