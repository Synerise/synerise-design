import React from 'react';

const Footer = () => {
  return (
    <footer className="c-main-footer ds-footer">
      <section className="c-footer-links l-section">
        <div className="c-main-footer__columns">
          <div className="c-main-footer__first-column">
            <img className="c-main-nav__logo-image c-dynamic-image" alt="Synerise" src="https://strapi.synerise.com/uploads/7cce7cae97314cee865f977b9baf13e5.svg" />
            <ul className="c-social-list">
              <li>
                <a href="https://facebook.com/synerise" aria-label="Facebook" rel="nofollow">
                  <i className="c-dynamic-image c-dynamic-icon  icon-facebook-fill-m c-dynamic-icon__icon"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/synerise/" aria-label="Instagram" rel="nofollow">
                  <i className="c-dynamic-image c-dynamic-icon  icon-instagram-fill-m c-dynamic-icon__icon"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/synerise/" aria-label="LinkedIn" rel="nofollow">
                  <i className="c-dynamic-image c-dynamic-icon   icon-linkedin-fill-m c-dynamic-icon__icon"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/synerise" aria-label="Twitter" rel="nofollow">
                  <i className="c-dynamic-image c-dynamic-icon  icon-twitter-fill-m c-dynamic-icon__icon"></i>
                </a>
              </li>
            </ul>
            <div className="c-links-box">
              <span className="c-links-box__title" role="button">Coloid Design System</span>
              <ul className="c-links-box__submenu submenu-group-0">
                <li>
                  <a className="c-links-box__lnk" href="/trust">About System</a>
                </li>
                <li>
                  <a className="c-links-box__lnk" href="/partners">Guidelines</a>
                </li>
                <li>
                  <a className="c-links-box__lnk" href="/csr">Components</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
