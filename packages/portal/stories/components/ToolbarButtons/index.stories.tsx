import React from 'react';
import * as S from './ToolbarButtons.styles';
import Tooltip from '@synerise/ds-tooltip';
import Button from '@synerise/ds-button';
import Icon, { FolderTreeM, FullScreenM, LocationM, NotepadM, StepBackM, StepForwardM } from '@synerise/ds-icon';

const stories = {
  default: () => {
    const initialButtonKeys = {
      'Button 1': false,
      'Button 2': false,
      'Button 3': false,
      'Button 4': false,
      'Button 5': false,
      'Button 6': false,
      'Button 7': false,
      'Button 8': false,
    };
        const [active, setActive] = React.useState([initialButtonKeys]);
        const updateActiveKeys = (value: boolean, key: string): void => {
          const newActiveKeys = { ...active, [key]: value };
          setActive(newActiveKeys);
        };
    return (
      <S.ToolbarWrapper>
        <S.Wrapper>
          <S.ToolbarButtons>
            <Tooltip title="Previous">
              <Button type="ghost" mode="single-icon">
                <Icon component={<StepBackM />} color="#ffffff" />
              </Button>
            </Tooltip>
            <Tooltip title="Next">
              <Button type="ghost" mode="single-icon">
                <Icon component={<StepForwardM />} color="#ffffff" />
              </Button>
            </Tooltip>
          </S.ToolbarButtons>
        </S.Wrapper>
        <S.Wrapper>
          <S.ToolbarButtons>
            <Tooltip title="Fit to view">
              <Button
                onClick={(): void => updateActiveKeys(!active['Button 3'], 'Button 3')}
                activated={active['Button 3']}
                type="ghost"
                mode="single-icon"
              >
                <Icon component={<FullScreenM />} color="#ffffff" />
              </Button>
            </Tooltip>
            <Tooltip title={active['Button 4'] ? 'Hide map' : 'Show map'}>
              <Button
                onClick={(): void => updateActiveKeys(!active['Button 4'], 'Button 4')}
                activated={active['Button 4']}
                type="ghost"
                mode="single-icon"
              >
                <Icon component={<LocationM />} color="#ffffff" />
              </Button>
            </Tooltip>
            <Tooltip title={active['Button 5'] ? 'Hide notes' : 'Show notes'}>
              <Button
                onClick={(): void => updateActiveKeys(!active['Button 5'], 'Button 5')}
                activated={active['Button 5']}
                type="ghost"
                mode="single-icon"
              >
                <Icon component={<NotepadM />} color="#ffffff" />
              </Button>
            </Tooltip>
          </S.ToolbarButtons>
        </S.Wrapper>
        <S.Wrapper>
          <S.ToolbarButtons>
            <Tooltip title="Fit to view">
              <Button
                onClick={(): void => updateActiveKeys(!active['Button 6'], 'Button 6')}
                activated={active['Button 6']}
                type="ghost"
                mode="single-icon"
              >
                <Icon component={<FullScreenM />} color="#ffffff" />
              </Button>
            </Tooltip>
            <S.ViewPercent>100%</S.ViewPercent>
            <Tooltip title={active['Button 7'] ? 'Show notes' : 'Hide notes'}>
              <Button
                onClick={(): void => updateActiveKeys(!active['Button 7'], 'Button 7')}
                activated={active['Button 7']}
                type="ghost"
                mode="single-icon"
              >
                <Icon component={<NotepadM />} color="#ffffff" />
              </Button>
            </Tooltip>
          </S.ToolbarButtons>
        </S.Wrapper>
        <S.WrapperButton>
          <Tooltip title="Auto align">
            <Button
              onClick={(): void => updateActiveKeys(!active['Button 8'], 'Button 8')}
              activated={active['Button 8']}
              type="ghost"
              mode="single-icon"
            >
              <Icon component={<FolderTreeM />} />
            </Button>
          </Tooltip>
        </S.WrapperButton>
      </S.ToolbarWrapper>
    )
  },
};

export default {
  name: 'Components/Toolbar',
  config: {},
  stories,
}

