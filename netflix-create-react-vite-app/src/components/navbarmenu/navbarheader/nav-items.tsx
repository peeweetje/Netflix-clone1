import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type navItemsProps = {
  to: string;
  children: React.ReactNode;
};

export const NavItems = ({ children, to }: navItemsProps) => {
  const { t } = useTranslation();

  return (
    <li aria-label={t('navigate-to', { to })}>
      <Link to={to}>{children}</Link>
    </li>
  );
};
