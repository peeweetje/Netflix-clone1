import type React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
