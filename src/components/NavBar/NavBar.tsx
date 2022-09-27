import './NavBar.scss';
import React from 'react';
import { PageNavLink } from '../PageNavLink/PageNavLink';

export const NavBar: React.FC = () => {
  return (
    <nav className="navbar page__section">
      <ul className="navbar__list">
        <PageNavLink to="/" text="Dictionary" isEnd />
        <PageNavLink to="/addAWord" text="Add a Word" />
        <PageNavLink to="/test" text="Check yourself" />
      </ul>
    </nav>
  );
};
