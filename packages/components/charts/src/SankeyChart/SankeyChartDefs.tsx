import * as React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const Defs: React.FC = () => (
  <svg height="0" width="0" style={{ position: 'absolute' }}>
    <defs>
      <filter id="snrs-sankey-node">
        <feGaussianBlur in="SourceAlpha" result="DROP" stdDeviation="6" />
        <feFlood floodColor="rgba(171, 178, 183, 0.32)" result="COLOR" />
        <feComposite in="COLOR" in2="DROP" operator="in" result="SHADOW" />
        <feOffset in="SHADOW" dx="-3" dy="4" result="DROPSHADOW" />
        <feMerge>
          <feMergeNode in="DROPSHADOW" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);
