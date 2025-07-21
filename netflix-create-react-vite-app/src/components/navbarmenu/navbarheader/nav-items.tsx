import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type navItemsProps = {
  to: string;
  children?: React.ReactNode;
};

const StyledNavLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

export const NavItems = ({ children, to }: navItemsProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (
      location.pathname === to ||
      location.pathname === `/${to.replace(/^\//, '')}`
    ) {
      e.preventDefault();
      // Optionally, scroll to top or do nothing
      return;
    }
    navigate(to);
    e.preventDefault();
  };

  return (
    <li
      aria-label={t('navigate-to', { to })}
      className={
        location.pathname === to ||
        location.pathname === `/${to.replace(/^\//, '')}`
          ? 'active'
          : ''
      }
    >
      <StyledNavLink href={to} onClick={handleClick}>
        {children}
      </StyledNavLink>
    </li>
  );
};
