import * as React from 'react';
import Icon from '@synerise/ds-icon';

import { AngleLeftS, AngleRightS, ArrowLeftS, ArrowRightS } from '@synerise/ds-icon/dist/icons';
import { Container, ArrowContainer, Text, Link } from './Navbar.styles';
import { NavbarProps} from './Navbar.types';

const hiddenStyle: React.CSSProperties = { display: 'none' };

export default (props: NavbarProps) => {
  const { title, onTitleClick, hidePrev, hideNext, onLongPrev, onLongNext, onShortPrev, onShortNext } = props;
  return (
    <Container>
      <ArrowContainer style={hidePrev ? hiddenStyle : undefined}>
        <Icon component={<ArrowLeftS/>} style={!onLongPrev ? hiddenStyle : undefined} onClick={onLongPrev}/>
        <Icon component={<AngleLeftS/>} style={!onShortPrev ? hiddenStyle : undefined} onClick={onShortPrev}/>
      </ArrowContainer>
      <Text>{onTitleClick ? <Link onClick={onTitleClick}>{title}</Link> : title}</Text>
      <ArrowContainer style={hideNext ? hiddenStyle : undefined}>
        <Icon component={<AngleRightS/>} style={!onShortNext ? hiddenStyle : undefined} onClick={onShortNext} />
        <Icon component={<ArrowRightS/>} style={!onLongNext ? hiddenStyle : undefined} onClick={onLongNext} />
      </ArrowContainer>
    </Container>
  );
};
