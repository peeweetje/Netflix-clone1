import React, { FC } from "react";
import SearchBar from "./search-bar/searchBar";
import NavItems from "./nav-items";
import { NavbarMenu, NavList, BrandContainer } from "./navbar-styles";
import { useTranslation } from "react-i18next";

export type navbarHeaderProps = {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  value: string;
};

const NavbarHeader: FC<navbarHeaderProps> = ({ onChange, value }) => {
  const { t } = useTranslation();

  return (
    <NavbarMenu role="navigation" aria-label={t("site-navigation")}>
      <BrandContainer>
        <NavItems aria-label={t("binge-watch")} to="/">
          {t("binge-watch")}
        </NavItems>
      </BrandContainer>
      <NavList>
        <NavItems aria-label={t("home-page")} to="/">
          {t("home-page")}
        </NavItems>
        <NavItems aria-label={t("show-page")} to="shows">
          {t("show-page")}
        </NavItems>
        <NavItems aria-label={t("movie-page")} to="/movies">
          {t("movie-page")}
        </NavItems>
        <NavItems aria-label={t("recently-added-page")} to="/recentlyAdded">
          {t("recently-added-page")}
        </NavItems>
        <NavItems aria-label={t("my-list")} to="/mylist">
          {t("my-list")}
        </NavItems>
      </NavList>
      <SearchBar value={value} onChange={onChange} />
    </NavbarMenu>
  );
};

export default NavbarHeader;
