import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { RepeatM, FileTypeImageM, Close3M, FileM } from '@synerise/ds-icon/dist/icons';
import { Loader } from '@synerise/ds-loader/dist/Loader.styles';
import * as S from './FileViewAvatar.styles';
import { FileViewAvatarProps } from './FileViewAvatar.types';
import { Description } from '../AvatarUploader.styles';

const previewableMimeTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml'];
const mapperOfIcons = {
  'image/png': <FileTypeImageM />,
  'image/gif': <FileTypeImageM />,
  'image/jpeg': <FileTypeImageM />,
  'image/svg+xml': <FileTypeImageM />,
};

const FileViewAvatar: React.FC<FileViewAvatarProps> = ({ data, texts, onRemove, removable, description }) => {
  const { disabled, error, file, progress } = data;
  const fileSource = React.useMemo(() => URL.createObjectURL(data.file), [data]);

  const hasError = !!error;
  const hasProgress = typeof progress === 'number';
  const [pressed1, setPressed1] = React.useState<boolean>(false);
  const handleRemove1 = (): void => {
    onRemove && onRemove();
    setPressed1(false);
  };
  const [pressed2, setPressed2] = React.useState<boolean>(false);
  const handleRemove2 = (): void => {
    onRemove && onRemove();
    setPressed2(false);
  };

  return (
    <S.FileAvatarContainer>
      <S.AvatarContainer  removable={removable} disabled={disabled} source={fileSource}>
        {removable && !disabled && !error && !hasProgress && (
          <S.RemoveWrapper
            onClick={handleRemove1}
            onMouseDown={(): void => setPressed1(true)}
            pressed={pressed1}
            data-testid="file-view-avatar-remove"
          >
            <Tooltip title={texts.removeTooltip}>
              <Icon component={<Close3M />} size={24} />
            </Tooltip>
          </S.RemoveWrapper>
        )}
      </S.AvatarContainer>
      <S.FileViewContainer>
        <S.FileView progress={hasProgress} disabled={disabled} error={hasError} removable={removable} type="button">
          {previewableMimeTypes.indexOf(file.type) > -1 ? (
            <S.PreviewImage>
              <Icon component={mapperOfIcons[file.type]} size={24} />
            </S.PreviewImage>
          ) : (
            <S.PlaceholderImage>
              <Icon component={<FileM />} size={24} />
            </S.PlaceholderImage>
          )}
          <S.Info>
            <>
              <S.Name>{file.name}</S.Name>
            </>
          </S.Info>
          {hasProgress && (
            <S.LoaderIcon>
              <Loader color="blue" size="S" />
            </S.LoaderIcon>
          )}
          {error && (
            <Tooltip title={texts.retryTooltip}>
              <S.RepeatIcon>
                <Icon component={<RepeatM />} />
              </S.RepeatIcon>
            </Tooltip>
          )}
          {removable && !disabled && !error && !hasProgress && (
            <S.RemoveButtonWrapper
              onClick={handleRemove2}
              onMouseDown={(): void => setPressed2(true)}
              pressed={pressed2}
              data-testid="fileview-remove"
            >
              <Tooltip title={texts.removeTooltip}>
                <Icon component={<Close3M />} size={16} />
              </Tooltip>
            </S.RemoveButtonWrapper>
          )}
        </S.FileView>
        <Description>{description}</Description>
      </S.FileViewContainer>
    </S.FileAvatarContainer>
  );
};

export default FileViewAvatar;
