import * as React from 'react';
import Button from '@synerise/ds-button';
import { FolderTreeM, FullScreenM, LocationM, NotepadM, StepBackM, StepForwardM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './Toolbar.styles';
import { ToolbarProps } from './Toolbar.types';

const Toolbar: React.FC<ToolbarProps> = ({}) => {
  return (
    <S.ToolbarWrapper>
      <S.Wrapper>
        <S.ToolbarButtons>
          <Tooltip title='back'>
            <Button type="ghost" mode="single-icon">
              <Icon component={<StepBackM />} color="#ffffff" />
            </Button>
          </Tooltip>
          <Tooltip title='back'>
            <Button type="ghost" mode="single-icon">
              <Icon component={<StepForwardM />} color="#ffffff" />
            </Button>
          </Tooltip>
        </S.ToolbarButtons>
      </S.Wrapper>
      <S.Wrapper>
        <S.ToolbarButtons>
          <Tooltip title='fit to view'>
            <Button type="ghost" mode="single-icon">
              <Icon component={<FullScreenM />} color="#ffffff" />
            </Button>
          </Tooltip>
          <Tooltip title='show map'>
            <Button type="ghost" mode="single-icon">
              <Icon component={<LocationM />} color="#ffffff" />
            </Button>
          </Tooltip>
          <Tooltip title='show notes'>
            <Button type="ghost" mode="single-icon">
              <Icon component={<NotepadM />} color="#ffffff" />
            </Button>
          </Tooltip>
        </S.ToolbarButtons>
      </S.Wrapper>
      <S.Wrapper>
        <S.ToolbarButtons>
          <Tooltip title='hide map'>
            <Button type="ghost" mode="single-icon">
              <Icon component={<FullScreenM />} color="#ffffff" />
            </Button>
          </Tooltip>
          <Tooltip>
            <Button type="ghost" mode="label">
              100%
            </Button>
          </Tooltip>
          <Tooltip title='hide notes'>
            <Button type="ghost" mode="single-icon">
              <Icon component={<NotepadM />} color="#ffffff" />
            </Button>
          </Tooltip>
        </S.ToolbarButtons>
      </S.Wrapper>
      <S.WrapperButton>
        <Tooltip title='auto align'>
        <Button type="ghost" mode="single-icon">
          <Icon component={<FolderTreeM />} />
        </Button>
        </Tooltip>
      </S.WrapperButton>
    </S.ToolbarWrapper>
  );
};
export default Toolbar;
