import * as React from 'react';
// @ts-ignore
import colors from '@synerise/ds-core/dist/style/colors.less';
import { storiesOf } from '@storybook/react';
import './index.css';

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const mapColors = () =>
  Object.entries(colors).reduce((previousValue: any, currentValue: any) => {
    const key = currentValue[0].split('-');
    const value = key[key.length - 1];
    return {
      ...previousValue,
      [key[0]]: previousValue[key[0]]
        ? previousValue[key[0]].concat({
            value,
            color: currentValue[1],
          })
        : [
            {
              value,
              color: currentValue[1],
            },
          ],
    };
  }, {});

const colorMap: any = Object.entries(mapColors() as any);
const colorBarStyle = props => ({
  background: props.color,
});
const ColorBar: React.FC<{ color: any }> = props => (
  <div className="color-bar" style={colorBarStyle(props)}>
    {props.children}
  </div>
);
const ColorGroup: React.FC = props => <div className="color-group">{props.children}</div>;
const sort = values => values.sort((a, b) => a.value - b.value);
storiesOf('Intro|Core', module).add('Colors', () => (
  <div>
    <div className="container">
      {colorMap.map(([group, values]) => (
        <ColorGroup>
          <h3>{capitalize(group)}</h3>
          {sort(values).map(({ color, value }) => (
            <ColorBar color={color}>
              <span>{group !== value ? `${group}-${value}` : value}</span>
              <span>{color}</span>
            </ColorBar>
          ))}
        </ColorGroup>
      ))}
    </div>
  </div>
));
