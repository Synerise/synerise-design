import * as React from 'react';
import * as S from './Icon.styles';

type IconProps = {
  color?: string;
  name?: string;
  title?: string;
  size?: string | number;
  type?: string;
  stroke?: boolean;
  onClick?: EventListener;
  component?: React.ReactNode;
};

class Icon extends React.Component<IconProps> {
  state = {
    SVGComponent: null,
  };

  componentDidMount() {
    const { name } = this.props;
    return import(`@synerise/ds-icon/dist/icons/${name}.svg`)
      .then(module => {
        this.setState({ SVGComponent: module.default });
      })
      .catch(error => {
        return error;
      });
  }

  render(): React.ReactNode {
    const { name, color, size, type, stroke, onClick, component } = this.props;
    const { SVGComponent } = this.state;
    const IconComponent = SVGComponent;

    return (
      <S.IconContainer
        color={color}
        title={name}
        size={size}
        type={type}
        stroke={stroke}
        onClick={onClick}
        data-testid="icon-container"
      >
        {' '}
        {component || (SVGComponent ? <IconComponent /> : null)}{' '}
      </S.IconContainer>
    );
  }
}

export default Icon;
