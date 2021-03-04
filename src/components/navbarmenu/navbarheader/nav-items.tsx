import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface InavItems {
  to: string;
  children: React.ReactNode;
}

const NavItems: FC<InavItems> = ({ children, to }) => {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default NavItems;
