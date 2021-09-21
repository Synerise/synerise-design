import * as React from 'react';

const Defs: React.FC = () => (
  <svg height="0" width="0" style={{ position: 'absolute' }}>
    <defs>
      <filter id="snrs-dropshadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
        <feOffset dx="2" dy="2" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.1" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);

export default Defs;
