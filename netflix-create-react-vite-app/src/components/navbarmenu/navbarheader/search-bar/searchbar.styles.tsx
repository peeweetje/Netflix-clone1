import styled from 'styled-components';

export const NavbarSearch = styled.div`
  margin-left: auto;
  padding-right: ${(props) => props.theme.space[8]};

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: ${(props) => props.theme.space[6]};
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const NavbarInput = styled.input`
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.purple};
  border-radius: ${(props) => props.theme.borderRadius[2]};
  color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.space[4]} ${(props) => props.theme.space[4]} ${(props) => props.theme.space[4]} 40px;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${(props) => props.theme.colors.white};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.white};
  }

  &::-webkit-search-cancel-button {
    filter: invert(1);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 75%;
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 10px;
  color: ${(props) => props.theme.colors.purple};
  pointer-events: none;
`;
