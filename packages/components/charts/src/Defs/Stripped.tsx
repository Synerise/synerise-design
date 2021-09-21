import * as React from 'react';

type Props = {
  colors: string[];
};

const Stripped: React.FC<Props> = ({ colors }) => {
  return (
    <svg height="0" width="0" style={{ position: 'absolute' }}>
      <defs>
        {colors.map((color, index) => (
          <pattern
            key={color}
            id={`snrs-striped-${index}`}
            width="3"
            height="3"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="3" height="3" fill={color} fillOpacity={0.125} />
            <rect width="1" height="3" fill={color} fillOpacity={0.5} />
          </pattern>
        ))}
      </defs>
    </svg>
  );
};

export default Stripped;
