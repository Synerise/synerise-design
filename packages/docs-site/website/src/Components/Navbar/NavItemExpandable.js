import React from 'react';

const NavItemExpandable = ({children, label}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <li
      className={`c-main-nav__item--expandable ${expanded ? 'opened' : ''}`}
      onMouseOver={() => setExpanded(true)}
      onMouseOut={() => setExpanded(false)}
      onClick={() => setExpanded(!expanded)}
    >
      <span className="c-main-nav__item__link" role="button">
        {label}<i className="c-main-nav__item__link__icon icon-angle-down-m"></i>
      </span>
      <div className={`c-main-nav__submenu with-featured featured-null initialized ${expanded ? 'expanded' : ''}`}>
        <ul className="c-main-nav__submenu__list">
          {children}
        </ul>
      </div>
    </li>
  )
};

export default NavItemExpandable;
