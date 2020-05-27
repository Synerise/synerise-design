import React from 'react';
import ClientOnly from '@docusaurus/ClientOnly';

const Navbar = () => {
  const [opened, setOpened] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(window.pageYOffset > 0);

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleMenu = React.useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  return (
    <header className={`c-main-header ${scrolled ? 'sticky' : ''}`}>
      <nav className={`c-main-header__nav l-section ${opened ? 'expanded' : ''}`}>
        <a className="c-main-header__logo" title="Home" href="/">
          <img src="/images/logo-synerise.svg " alt="Synerise" />
        </a>
        <button onClick={() => toggleMenu()} type="button" className={`c-main-header__btn ${opened ? 'active' : ''}`} aria-label="Toggle menu">
          <div className="btn"><span></span><span></span><span></span></div>
        </button>
        <ul className="c-main-nav">
          <NavItemExpandable label="Get started">
            <NavSubItem title="About" label="About" link="/about"/>
            <NavSubItem title="Develop" label="Develop" link="/develop"/>
          </NavItemExpandable>
          <NavItem title="Guidelines" label="Guidelines" link="/docs/palette"/>
          <NavItem title="Storybook" label="Storybook" link="/storybook-static/"/>

          <li className="hover-action-subitem c-main-nav__item c-main-nav__item--end">
            <a className="c-read-more c-main-nav__item__link" href="https://app.synerise.com/spa/login" target="_self">
              <span>Log in</span>
              <i className="c-read-more__icon icon-arrow-right-m" aria-hidden="false"></i>
            </a>
          </li>
          <div className="mobile-btn-wrapper header-sticky-wrapper">
            <a className="c-button-filled  mobile-request-btn header-sticky-btn" href="https://demo.synerise.com/request" target="_blank" rel="noreferrer">Request a demo</a>
          </div>
        </ul>
      </nav>
    </header>
  )
};

const NavItem = ({ link, label, title}) => {
  return (
    <li className="hover-action-subitem c-main-nav__item">
      <a className="c-main-nav__item__link" title={title} href={link}>
        <span className="c-main-nav__submenu__item__title">{label}</span>
      </a>
    </li>
  )
};


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

const NavSubItem = ({ link, label, title }) => {
  return (
    <li className="hover-action-subitem c-main-nav__submenu__item">
      <a className="c-main-nav__submenu__item__link" title={title} href={link}>
        <span className="c-main-nav__submenu__item__title">{label}</span>
      </a>
    </li>
  )
};


export default () => (
  <ClientOnly>
    <Navbar />
  </ClientOnly>
);
