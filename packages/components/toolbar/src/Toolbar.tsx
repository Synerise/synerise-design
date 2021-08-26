import * as React from 'react';
import Button from '@synerise/ds-button';
import { FolderTreeM, FullScreenM, LocationM, NotepadM, StepBackM, StepForwardM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './Toolbar.styles';
import { ToolbarProps } from './Toolbar.types';

const Toolbar: React.FC<ToolbarProps> = ({textPercent}) => {
  const [active, setActive] = React.useState(false);
  return (
    <S.ToolbarWrapper>
      <S.Wrapper>
        <S.ToolbarButtons>
          <Tooltip title='back'>
            <Button activated type="ghost" mode="single-icon">
              <Icon component={<StepBackM />} color="#ffffff" />
            </Button>
          </Tooltip>
          <Tooltip title='forward'>
            <Button activated type="ghost" mode="single-icon">
              <Icon component={<StepForwardM />} color="#ffffff" />
            </Button>
          </Tooltip>
        </S.ToolbarButtons>
      </S.Wrapper>
      <S.Wrapper>
        <S.ToolbarButtons>
          <Tooltip title='fit to view'>
            <Button activated type="ghost" mode="single-icon">
              <Icon component={<FullScreenM />} color="#ffffff" />
            </Button>
          </Tooltip>
          <Tooltip title={ active ? 'show map' : 'hide map'}>
            <Button onClick={(): void => {
              setActive(!active);
            }} activated type="ghost" mode="single-icon">
              <Icon component={<LocationM />} color="#ffffff" />
            </Button>
          </Tooltip>
          <Tooltip title={active ? 'show notes' : 'hide notes'}>
            <Button onClick={(): void => {
              setActive(!active);
            }} activated type="ghost" mode="single-icon">
              <Icon component={<NotepadM />} color="#ffffff" />
            </Button>
          </Tooltip>
        </S.ToolbarButtons>
      </S.Wrapper>
      <S.Wrapper>
        <S.ToolbarButtons>
          <Tooltip title='hide map'>
            <Button activated type="ghost" mode="single-icon">
              <Icon component={<FullScreenM />} color="#ffffff" />
            </Button>
          </Tooltip>
            <S.ViewPercent>
              {textPercent}
            </S.ViewPercent>
          <Tooltip title='hide notes'>
            <Button activated type="ghost" mode="single-icon">
              <Icon component={<NotepadM />} color="#ffffff" />
            </Button>
          </Tooltip>
        </S.ToolbarButtons>
      </S.Wrapper>
      <S.WrapperButton>
        <Tooltip title='auto align'>
        <Button activated type="ghost" mode="single-icon">
          <Icon component={<FolderTreeM />} />
        </Button>
        </Tooltip>
      </S.WrapperButton>
    </S.ToolbarWrapper>
  );
};
export default Toolbar;
