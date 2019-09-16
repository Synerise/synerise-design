import * as React from 'react';
import colors from '@synerise/ds-core/dist/style/colors.less';

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

const colorBarStyle = props => ({
  background: props.color,
  color: props.index > 5 ? props.textColor : '#fff',
});

export const ColorPalette = (props: { palette: any }) => (
  <>
    {props.palette.map(([group, values]) => {
      const colors = sort(values);
      return (
        <ColorGroup>
          {colors.map(({ color, value }, index) => (
            <ColorBar
              group={group}
              value={value}
              color={color}
              index={index}
              textColor={colors[4] && colors[4].color}
            />
          ))}
        </ColorGroup>
      );
    })}
  </>
);

export const colorMap: any = Object.entries(mapColors() as any);
export const ColorBar: React.FC<{
  color: any;
  index: number;
  textColor: string;
  group: string;
  value: string;
}> = props => (
  <div className="color-bar" style={colorBarStyle(props)}>
    <span>{props.color}</span>
    <span>{props.group !== props.value ? `${props.group}-${props.value}` : props.value}</span>
  </div>
);
export const ColorGroup: React.FC = props => <div className="color-group">{props.children}</div>;
export const sort = values => values.sort((a, b) => b.value - a.value);
