import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

const About = () => {
  return (
    <Layout title="Synerise">
      <div className="ds-wrapper u-bg-white">
        <div className="ds-about l-grid">
          <h1 className="ds-headline-1">
            <strong>About Coloid</strong>
          </h1>
        </div>
      </div>
      <div className="ds-stats">
        <div className="l-grid">
          <div className="ds-stat l-col-desktop-4 l-col-tablet-4 l-col-mobile-4">
            <span className="ds-stat-value">8</span>
            <span className="ds-stat-description">
              <strong>Extensive guidelines</strong>
              <span> that describe the best design practices</span>
            </span>
          </div>
          <div className="ds-stat l-col-desktop-4 l-col-tablet-4 l-col-mobile-4 ">
            <span className="ds-stat-value">53</span>
            <span className="ds-stat-description">
              <strong>Components for reusing,</strong>
              <span> described in detail</span>
            </span>
          </div>
          <div className="ds-stat l-col-desktop-4 l-col-tablet-4 l-col-mobile-4 ">
            <span className="ds-stat-value">6</span>
            <span className="ds-stat-description">
              <strong>Contributors to the documentation</strong>
              <span> that include designers, tech writers and developers</span>
            </span>
          </div>
        </div>
      </div>
      <div className="ds-about-copy u-bg-white">
        <div className="l-grid">
          <div className="l-col-desktop-7">
            <h2>Introduction</h2>
            <p>
              Synerise is more than AI company. We passionately support our customers with our constantly developed product in growing their businesses. Companies of all sizes can make use of the services we provide as Synerise is capable of managing enormous complexity.
              <br />
              <br />
              While developing solutions for our product, either we our third parties,  want to keep and improve UI consistency and quality. It lies in our best interest to make the design and development process more efficient by establishing a shared vocabulary and providing clear guidance between designers and developers.
            </p>
            <h3>Coloid guiding principles</h3>
            <ul>
              <li>
                Coloid is open - The Synerise design system is our common effort, so all users and its makers are encouraged to contribute.
              </li>
              <li>
                Be attentive - Without our customers there would be no „us”. When we create, develop and improve, make sure the needs and requests of our customers are heard and they resonate in our projects and finally in all features.
              </li>
              <li>
                Be consistent - By consistent use of the design patterns, we can educate the users about the meaning and scope of actions to be performed on the interface. Disobedience of the rules may cause incorrect identification of features.
              </li>
              <li>
                Modularity and flexibility - Maximum flexibility of the application is ensured by modularity. The components are designed to suit the needs of users in any combination and most of all,
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ds-our-approach u-bg-light-gray">
        <div className="l-grid">
          <h2>Out approach</h2>
          <div className="ds-approach-boxes">
            <div className="ds-approach-box l-col-desktop-4">
              <img src={useBaseUrl('images/information-02-m-02-knowledge-02-04-bulb-tip-m-copy.svg')} />
              <strong>Attentive</strong>
              <span>Build reliability and ensure experiences working in every nook and cranny in our app.</span>
            </div>
            <div className="ds-approach-box l-col-desktop-4">
              <img src={useBaseUrl('images/information-02-m-02-knowledge-02-04-bulb-tip-m.svg')} />
              <strong>Efficient</strong>
              <span>Create experiences that let customers achieve their goals fast, accurately and effortlessly.</span>
            </div>
            <div className="ds-approach-box l-col-desktop-4">
              <img src={useBaseUrl('images/information-02-m-02-knowledge-02-04-bulb-tip-m-copy-2.svg')} />
              <strong>Reliable</strong>
              <span>We are transparent in our actions to assure users that we’re always have their best interest in mind.</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default About;
