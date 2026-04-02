'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
}

export const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/shows', label: 'Shows' },
  { href: '/movies', label: 'Movies' },
  { href: '/popular-trending', label: 'Popular & Trending' },
  { href: '/my-list', label: 'My List' },
];

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'horizontal' | 'vertical';
}

export const NavbarItem = ({ href, children, onClick, variant = 'horizontal' }: NavbarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses = 'transition-colors duration-200';
  const verticalClasses = isActive ? 'text-primary font-semibold' : 'text-white hover:text-primary';
  const horizontalClasses = isActive ? 'text-primary font-semibold' : 'text-gray-300 hover:text-primary';

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={variant === 'vertical' ? `${baseClasses} ${verticalClasses}` : `${baseClasses} ${horizontalClasses}`}
      >
        {children}
      </Link>
    </li>
  );
};

interface NavbarItemsProps {
  className?: string;
  variant?: 'horizontal' | 'vertical';
  onItemClick?: () => void;
}

export const NavbarItems = ({ className, variant = 'horizontal', onItemClick }: NavbarItemsProps) => {
  if (variant === 'vertical') {
    return (
      <ul className={`space-y-6 ${className || ''}`}>
        {navItems.map((item) => (
          <NavbarItem key={item.href} href={item.href} onClick={onItemClick} variant="vertical">
            {item.label}
          </NavbarItem>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex space-x-8 ${className || ''}`}>
      {navItems.map((item) => (
        <NavbarItem key={item.href} href={item.href}>
          {item.label}
        </NavbarItem>
      ))}
    </ul>
  );
};
