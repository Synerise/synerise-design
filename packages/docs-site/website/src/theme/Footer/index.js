/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

function Footer() {
  const [openedLinks, setOpenedLinks] = React.useState(false);

  const toggleLinks = React.useCallback(() => {
    setOpenedLinks(!openedLinks);
  }, [openedLinks]);
  return (
    <footer className="c-main-footer">
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
          </div>
            <div className={`c-links-box ${openedLinks ? 'expanded' : ''}`}>
              <span className="c-links-box__title" role="button"  onClick={() => toggleLinks()}>
                Colloid Design System
                <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                     viewBox="0 0 24 24" fill="none" stroke="#0E69FF" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <ul className="c-links-box__submenu submenu-group-0">
                <li>
                  <a className="c-links-box__lnk" href="/about">About</a>
                </li>
                <li>
                  <a className="c-links-box__lnk" href="/develop">Develop</a>
                </li>
                <li>
                  <a className="c-links-box__lnk" href="/docs/palette">Guidelines</a>
                </li>
                <li>
                  <a className="c-links-box__lnk" href="/storybook-static/">Components</a>
                </li>
              </ul>
            </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
