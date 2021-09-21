import * as React from 'react';
import { shallow } from 'enzyme';

import { Defs } from './SankeyChartDefs';

describe('SankeyChartDefs', () => {
  it('renders defs correctly', () => {
    const wrapper = shallow(<Defs />);

    expect(wrapper).toMatchInlineSnapshot(`
      <svg
        height="0"
        style={
          Object {
            "position": "absolute",
          }
        }
        width="0"
      >
        <defs>
          <filter
            id="snrs-sankey-node"
          >
            <feGaussianBlur
              in="SourceAlpha"
              result="DROP"
              stdDeviation="6"
            />
            <feFlood
              floodColor="rgba(171, 178, 183, 0.32)"
              result="COLOR"
            />
            <feComposite
              in="COLOR"
              in2="DROP"
              operator="in"
              result="SHADOW"
            />
            <feOffset
              dx="-3"
              dy="4"
              in="SHADOW"
              result="DROPSHADOW"
            />
            <feMerge>
              <feMergeNode
                in="DROPSHADOW"
              />
              <feMergeNode
                in="SourceGraphic"
              />
            </feMerge>
          </filter>
        </defs>
      </svg>
    `);
  });
});
