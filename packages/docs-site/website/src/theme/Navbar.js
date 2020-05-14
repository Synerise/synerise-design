import React from 'react';

const Navbar = () => {
  return (
    <header className="c-main-header">
      <nav className="c-main-header__nav l-section">
        <a className="c-main-header__logo" title="Home" href="/">
          <img src="/images/logo-synerise.svg " alt="Synerise" />
        </a>
        <button type="button" className="c-main-header__btn" aria-label="Toggle menu">
          <div className="btn"><span></span><span></span><span></span></div>
        </button>
        <ul className="c-main-nav">
          <li className="hover-action-subitem c-main-nav__item">
            <a className="c-main-nav__item__link" title="Case studies" href="/case-studies">
              <span className="c-main-nav__submenu__item__title">Coloid Design System</span>
            </a>
          </li>
          <li className="hover-action-subitem c-main-nav__item">
            <a className="c-main-nav__item__link" title="Case studies" href="/case-studies">
              <span className="c-main-nav__submenu__item__title">Guidelines</span>
            </a>
          </li>
          <li className="hover-action-subitem c-main-nav__item">
            <a className="c-main-nav__item__link" title="Case studies" href="/case-studies">
              <span className="c-main-nav__submenu__item__title">Storybook</span>
            </a>
          </li>
          <li className="hover-action-subitem c-main-nav__item c-main-nav__item--end">
            <a className="c-read-more c-main-nav__item__link" href="https://app.synerise.com/spa/login" target="_self">
              <span>Log in</span>
              <i className="c-read-more__icon icon-arrow-right-m" aria-hidden="false"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
};

export default Navbar;
