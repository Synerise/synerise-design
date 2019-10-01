import * as React from 'react';

// import { Icon } from '../';

import { Props } from './CardSelect.types';
import { Container, IconWrapper, Title, Description, Main, Aside, Radio } from './CardTabs.styles';

const CardSelect: React.FC<Props> = ({
  title,
  description,
  customTickVisible,
  customTickVisibleComponent,
  tickVisible,
  raised,
  value,
  size,
  disabled,
  onChange,
  icon,
  className,
}: Props) => {
  const handleClick = () => onChange && onChange(!value);

  return (
    <Container
      raised={raised}
      disabled={disabled}
      value={value}
      size={size}
      onClick={handleClick}
      className={className}
      data-testid="test-id"
    >
      <Aside size={size}>
        {tickVisible && (
          <Radio disabled={disabled} value={value} size={size}>
            {/* <Icon name="check-s" size={this.props.size === 'small' ? 20 : 24} /> */}
          </Radio>
        )}
      </Aside>
      <Main size={size}>
        {icon && (
          <IconWrapper size={size}>
            {/* <Icon name={this.props.icon} size={this.props.size === 'small' ? 42 : this.props.iconSize || 64} /> */}
          </IconWrapper>
        )}

        {title ? <Title size={size}>{title}</Title> : null}
        {description ? <Description size={size}>{description}</Description> : null}
      </Main>
      <Aside size={size}>{customTickVisible && customTickVisibleComponent}</Aside>
    </Container>
  );
};

CardSelect.defaultProps = {
  tickVisible: true,
  value: false,
  size: 'medium',
};

export default CardSelect;
