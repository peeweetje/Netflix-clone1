import styled from 'styled-components';

export const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const NavbarMenu = styled.nav`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.black};
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};

  @media (max-width: 992px) {
    position: relative;
    justify-content: space-between;
    padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[4]};
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const NavList = styled.ul<{ $centered?: boolean; $isOpen?: boolean }>`
  display: flex;
  justify-content: center;
  ${(props) =>
    props.$centered &&
    `
      margin-left: auto;
      margin-right: auto;
    `}

  li {
    padding: ${(props) => props.theme.space[8]};
    white-space: nowrap;
    font-size: ${(props) => props.theme.fontSize[4]};
    color: ${(props) => props.theme.colors.primaryLight};

    @media (max-width: 1200px) {
      font-size: ${(props) => props.theme.fontSize[3]};
      padding: ${(props) => props.theme.space[7]};
    }

    @media (max-width: 1024px) {
      font-size: ${(props) => props.theme.fontSize[3]};
      padding: ${(props) => props.theme.space[6]};
    }

    @media (max-width: 992px) {
      font-size: ${(props) => props.theme.fontSize[2]};
      padding: ${(props) => props.theme.space[1]};
    }

    @media (max-width: 768px) {
      font-size: ${(props) => props.theme.fontSize[0]};
      padding: ${(props) => props.theme.space[1]};
    }
  }

  li:hover {
    text-decoration: 5px underline;
  }
 
  li.active {
    text-decoration: 5px underline;
    BackgroundColor: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.white};
  }

  @media (max-width: 992px) {
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 100%;
    background-color:rgba(0, 0, 0, 0.5);
    padding-bottom: ${(props) => props.theme.space[4]};
    z-index: 100;
  }
`;

export const HamburgerButton = styled.button`
  display: none;

  @media (max-width: 992px) {
    display: block;
    background: none;
    border: none;
    color: ${(props) => props.theme.colors.primaryLight};
    font-size: ${(props) => props.theme.fontSize[5]};
    cursor: pointer;
    margin-left: auto;
    padding-right: ${(props) => props.theme.space[4]};
  }
`;

export const BrandContainer = styled.div<{ $centered?: boolean }>`
  display: flex;
  align-items: center;
  ${(props) => !props.$centered && 'margin-right: auto;'}
  font-size: ${(props) => props.theme.fontSize[5]};
  padding-left: ${(props) => props.theme.space[8]};
  list-style: none;
  color: ${(props) => props.theme.colors.primaryLight};


  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    font-size: ${(props) => props.theme.fontSize[4]};
    padding-left: ${(props) => props.theme.space[7]};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    font-size: ${(props) => props.theme.fontSize[3]};
    padding-left: ${(props) => props.theme.space[6]};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    font-size: ${(props) => props.theme.fontSize[2]};
    padding-left: ${(props) => props.theme.space[2]};
    margin-right: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: ${(props) => props.theme.fontSize[1]};
    padding-left: ${(props) => props.theme.space[1]};
    margin-right: 0;
  }
`;

export const SwitchThemeButton = styled.button`
   display:flex;
   justify-content: center;
   min-width: 120px;
   margin-left: auto;
   padding: ${(props) => props.theme.space[4]};
   background-color: ${(props) => props.theme.colors.primary};
   color: ${(props) => props.theme.colors.buttonText};
   border: none;
   border-radius:${(props) => props.theme.borderRadius[1]};
   cursor: pointer;
   &:hover {
     background-color: ${(props) => props.theme.colors.primaryLight};
   }

   @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
     margin:${(props) => props.theme.space[2]}; 
     padding: 10px;
   }

   @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
     margin: ${(props) => props.theme.space[2]};
     padding:${(props) => props.theme.space[4]};
   }

   @media (max-width: ${(props) => props.theme.breakpoints.md}) {
     margin:${(props) => props.theme.space[1]};
     padding:${(props) => props.theme.space[3]};
   }

   @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
     margin:${(props) => props.theme.space[2]};
     padding: ${(props) => props.theme.space[2]};
   }
 `;
