import React from 'react';

const Breadcrumbs = () => {
  return (
    <div className="c-main-breadcrumbs">
      <div className="c-main-header__bottom-bar">
        <div className="l-section">
          <div className="c-main-header__bottom-bar__columns l-grid">
            <div className="c-breadcrumb">
              <ul className="c-breadcrumb__list">
                <li><a className="c-breadcrumb__lnk" href="/">Synerise</a></li>
                <li><span className="c-breadcrumb__label">Industries - Retail</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Breadcrumbs;
