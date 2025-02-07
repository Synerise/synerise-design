import React from 'react';
import Layout from '@theme/Layout';
import Breadcrumbs from '../Components/Breadcrumbs';

const LINKS = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: false,
    label: 'Get started / Develop',
  },
];

const Develop = () => {
  return (
    <Layout title="Synerise">
      <Breadcrumbs links={LINKS} />
      <section className="ds-develop u-bg-white">
        <div className="l-grid">
          <div className="l-col-desktop-7">
            <h2>Develop</h2>
            <p>
              We have put interface elements together to create a collection of reusable components inside the Synerise
              application.
              <br />
              Every person that contributes by building products for Synerise can refer to the library of components to
              combine them and create coherent designs for merchants.
              <br />
              This way, instead of making over the interface elements, we can stay concentrated on finding solutions to
              unique challenges.
            </p>
            <h3>Getting started</h3>
            <p className="small-margin">
              React UI component library, inspired by Ant Design was introduced to support developers in implementing
              the best experience for Synerise merchants.
            </p>
            <ul>
              <li>Components are written in TypeScript with predictable static types.</li>
              <li>Internationalization by react-intl</li>
              <li>
                Each component contains its own styles passed by styled-component library, so there is no need to import
                any additional styles
              </li>
            </ul>
            <h3>How to use</h3>
            <p>
              Each component is installed separately. If you want to use one of them you have to use DSProvider first.
              <br />
              <br />
              DSProvider is located in @synerise/ds-core package. DSProvider serves the functions of ThemeProvider (
              <a target="_blank" href="https://styled-components.com/docs/advanced#theming">
                https://styled-components.com/docs/advanced#theming
              </a>
              ) and IntlProvider (
              <a target="_blank" href="https://formatjs.io/docs/react-intl/components#intlprovider">
                https://formatjs.io/docs/react-intl/components#intlprovider
              </a>
              ).
              <br />
              <br />
              It provides a theme with all variables, colors and so on, which are required for proper working of all
              components, and passes the configuration of internationalization. DSProvider is required by all
              components.
            </p>
          </div>
          <div className="l-col-desktop-12">
            <h3>Installation</h3>
            <p className="small-margin">
              Before the component installation, you must add react-intl, styled-components and antd packages.
            </p>
            <ul className="no-margin">
              <li>for yarn</li>
            </ul>
            <code className="ds-code">yarn add react-intl@6.8.7 styled-components@5.3.3 antd@4.24.16</code>
            <ul className="no-margin">
              <li>for npm</li>
            </ul>
            <code className="ds-code">npm install react-intl@6.8.7 styled-components@5.3.3 antd@4.24.16 --save</code>
            <p className="small-margin">And then, you can install a component (example with the Button component):</p>
            <ul className="no-margin">
              <li>for yarn</li>
            </ul>
            <code class="ds-code">yarn add @synerise/ds-core @synerise/ds-button</code>
            <ul className="no-margin">
              <li>for npm</li>
            </ul>
            <code className="ds-code">npm install @synerise/ds-core @synerise/ds-button —-save</code>
            <div className="l-col-desktop-12">
              <h3>Usage</h3>
              <code className="ds-code">
                {`import { DSProvider } from "@synerise/ds-core";`}
                <br />
                {`import Button from "@synerise/ds-button";`}
                <br />
                {`<DSProvider>`}
                <br />
                &nbsp;&nbsp;{`<Button>Click me!</Button>`}
                <br />
                {`</DSProvider>`}
              </code>
            </div>
          </div>
          <div className="l-col-desktop-4 ds-troubleshooting">
            <div className="c-measure-success__tile u-bg-cod-dark">
              <h3 className="c-measure-success__tile__title u-title-with-underline">Troubleshooting</h3>
              <div className="c-measure-success__tile__paragaph">
                <p className="no-margin">
                  In case of any issues you encounter while working with the Colloid Design System, visit our{' '}
                  <a target="_blank" href="https://github.com/Synerise/synerise-design">
                    Github
                  </a>{' '}
                  repo for guidelines and support.
                  <br />
                  <br />
                  If the issue you experienced hasn't been reported yet, please create one.
                </p>
              </div>
              <a
                className="c-button-filled  c-measure-success__tile__button"
                href="https://github.com/Synerise/synerise-design/issues/new"
                target="_blank"
              >
                Create an issue
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Develop;
