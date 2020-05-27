import React from 'react';

const NavSubItem = ({ link, label, title }) => {
  return (
    <li className="hover-action-subitem c-main-nav__submenu__item">
      <a className="c-main-nav__submenu__item__link" title={title} href={link}>
        <span className="c-main-nav__submenu__item__title">{label}</span>
      </a>
    </li>
  )
};

export default NavSubItem;
