import * as React from "react";
import { Link } from "react-router-dom";

interface InavItems {
  to: string;
  children: React.ReactNode;
}

const NavItems: React.FC<InavItems> = ({ children, to }) => {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default NavItems;
