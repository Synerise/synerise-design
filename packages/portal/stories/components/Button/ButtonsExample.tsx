import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS, DragHandleM, ShowM } from '@synerise/ds-icon/dist/icons';
import * as React from 'react';

const ButtonsExample = (props) => {
  const isGhost = ['ghost', 'ghost-white', 'ghost-primary'].includes(props.type);
  return (
    <div style={{background:`${(props.type === 'tertiary-white' || props.type === 'ghost-white') ? '#384350' : 'transparent'}`, display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex'}}>
        <Button {...props} mode="simple">
          Button
        </Button>
        {!isGhost && (
          <Button {...props} mode="split">
            Button
            <Icon component={<AngleDownS />} />
          </Button>
        )}
        <Button {...props} mode="two-icons">
          <Icon component={<DragHandleM />} />
          Button
          <Icon component={<AngleDownS />} />
        </Button>
        <Button {...props} mode="label-icon">
          Button
          <Icon component={<AngleDownS />} />
        </Button>
        <Button {...props} mode="icon-label">
          <Icon component={<AngleDownS />} />
          Button
        </Button>
        <Button {...props} mode="single-icon">
          <Icon component={<ShowM />} />
        </Button>
      </div>
      <div style={{display: 'flex'}}>
        <Button {...props} disabled mode="simple">
          Button
        </Button>
        {!isGhost && (
          <Button {...props} disabled mode="split">
            Button
            <Icon component={<AngleDownS />} />
          </Button>
        )}
        <Button {...props} disabled mode="two-icons">
          <Icon component={<DragHandleM />} />
          Button
          <Icon component={<AngleDownS />} />
        </Button>
        <Button {...props} disabled mode="label-icon">
          Button
          <Icon component={<AngleDownS />} />
        </Button>
        <Button {...props} disabled mode="icon-label">
          <Icon component={<AngleDownS />} />
          Button
        </Button>
        <Button {...props} disabled mode="single-icon">
          <Icon component={<ShowM />} />
        </Button>
      </div>
      <div style={{display: 'flex'}}>
        <Button {...props} spinner mode="simple">
          Button
        </Button>
        {!isGhost && (
          <Button {...props} spinner mode="split">
            Button
            <Icon component={<AngleDownS />} />
          </Button>
        )}
        <Button {...props} spinner mode="two-icons">
          <Icon component={<DragHandleM />} />
          Button
          <Icon component={<AngleDownS />} />
        </Button>
        <Button {...props} spinner mode="label-icon">
          Button
          <Icon component={<AngleDownS />} />
        </Button>
        <Button {...props} spinner mode="icon-label">
          <Icon component={<AngleDownS />} />
          Button
        </Button>
        <Button {...props} spinner mode="single-icon">
          <Icon component={<ShowM />} />
        </Button>
      </div>
      <div style={{display: 'flex'}}>
        <Button {...props} mode="simple" groupVariant="left-rounded">
          Button
        </Button>
        <Button {...props} mode="simple" groupVariant="squared">
          Button
        </Button>
        <Button {...props} mode="simple" groupVariant="right-rounded">
          Button
        </Button>
      </div>
    </div>
  )
};

export default ButtonsExample;
