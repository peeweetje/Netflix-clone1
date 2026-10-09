import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { navbarStyles } from './navbar-styles';

interface navItemsProps {
  to: string;
  children?: React.ReactNode;
  highlightActive?: boolean;
}

export const NavItems = ({ children, to, highlightActive = true }: navItemsProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive =
    highlightActive &&
    (location.pathname === to || location.pathname === `/${to.replace(/^\//, '')}`);

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
      {...stylex.props(navbarStyles.navItem, isActive && navbarStyles.navItemActive)}
    >
      <a {...stylex.props(navbarStyles.link)} href={to} onClick={handleClick}>
        {children}
      </a>
    </li>
  );
};
