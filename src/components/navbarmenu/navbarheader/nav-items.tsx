import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface InavItems {
  to: string;
  // TODO: temperary solution because of the translations errors in the navbarHeader, types are not correctly updated.
  children: any; //  React.ReactNode
}

const NavItems: FC<InavItems> = ({ children, to }) => {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default NavItems;
