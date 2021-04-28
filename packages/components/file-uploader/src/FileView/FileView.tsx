import * as React from 'react';
import filesize from 'filesize.js';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Close3M from '@synerise/ds-icon/dist/icons/Close3M';
import Check3M from '@synerise/ds-icon/dist/icons/Check3M';
import ProgressBar from '@synerise/ds-progress-bar';
import Tooltip from '@synerise/ds-tooltip';
import { RepeatLoopM, WarningFillM } from '@synerise/ds-icon/dist/icons';
import Popconfirm from '@synerise/ds-popconfirm';
import Button from '@synerise/ds-button';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './FileView.styles';
import { FileViewProps } from './FileView.types';



const FileView: React.FC<FileViewProps> = ({ data, texts, onRemove, removable }) => {
  const previewableMimeTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml'];

  const getFriendlySize = (size?: number): string => filesize(size || 0);

  const { disabled, error, file, progress, success } = data;
  const fileSource = React.useMemo(() => URL.createObjectURL(data.file), [data]);

  const hasError = !!error;
  const hasProgress = typeof progress === 'number';
  const [pressed, setPressed] = React.useState<boolean>(false);
  const handleRemove = (): void => {
    onRemove && onRemove();
    setPressed(false);
  };

  return (
    <S.FileViewContainer disabled={disabled} error={hasError} removable={removable} type="button">
      {previewableMimeTypes.indexOf(file.type) > -1 ? (
        <S.PreviewImage source={fileSource} />
      ) : (
        <S.PlaceholderImage>
          <Icon component={<FileM />} size={24} />
        </S.PlaceholderImage>
      )}

      <S.Info>
        {hasProgress ? (
          <>
            <S.Name>
              {file.name} <S.FileWeight>{texts.fileWeight}</S.FileWeight>
            </S.Name>
            <ProgressBar amount={100} percent={texts.percent} />
            <S.RemoveWrapper onClick={onRemove} data-testid="fileview-remove">
              <Tooltip title={texts.removeTooltip}>
                <Icon component={<Close3M />} size={20} />
              </Tooltip>
            </S.RemoveWrapper>
          </>
        ) : (
          <>
            <S.Name>{file.name}</S.Name>

            <S.SizeOrError>
              {error || (
                <>
                  {texts.size} {getFriendlySize(file.size)}
                </>
              )}
            </S.SizeOrError>
          </>
        )}
      </S.Info>
      {error && (
        <Button mode="icon-label" type="ghost-primary">
          <Icon component={<RepeatLoopM />} />
          Retry
        </Button>
      )}
      {success && !disabled && (
        <S.CheckButtonWrapper data-testid="fileview-check">
          <Icon component={<Check3M />} size={20} />
        </S.CheckButtonWrapper>
      )}
      {removable && !disabled && !error && !hasProgress && (
        <Popconfirm
          onConfirm={handleRemove}
          onCancel={(): void => setPressed(false)}
          icon={<Icon component={<WarningFillM />} color={theme.palette['yellow-600']} />}
          cancelText={texts.cancelText}
          okText={texts.okText}
          okType='primary'
          title={texts.removeConfirmTitle}
          disabled={disabled}
          placement= 'top'
          mouseEnterDelay= {250}
          mouseLeaveDelay= {250}
          trigger= 'click'
        >
          <S.RemoveButtonWrapper
            onMouseDown={(): void => setPressed(true)}
            pressed={pressed}
            data-testid="fileview-remove"
          >
            <Tooltip title={texts.removeTooltip}>
              <Icon component={<Close3M />} size={20} />
            </Tooltip>
          </S.RemoveButtonWrapper>
        </Popconfirm>
      )}
    </S.FileViewContainer>
  );
};

export default FileView;
