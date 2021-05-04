import * as React from 'react';
import filesize from 'filesize.js';
import Icon from '@synerise/ds-icon';
import ProgressBar from '@synerise/ds-progress-bar';
import Tooltip from '@synerise/ds-tooltip';
import {
  RepeatM,
  WarningFillM,
  FileTypeImage,
  FileTypePdf,
  FileTypeVideo,
  FileTypeSvg,
  Close3M,
  Check3M,
  FileM,
  FileTypeZip,
  FileTypeTxt,
  FileTypeHtml,
  FileTypeMp3,
  FileTypeXls,
  FileTypePptx
} from '@synerise/ds-icon/dist/icons';
import Popconfirm from '@synerise/ds-popconfirm';
import Button from '@synerise/ds-button';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './FileView.styles';
import { FileViewProps } from './FileView.types';

const previewableMimeTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/svg+xml','text/plain','text/html','video/quicktime', 'application/pdf', 'application/zip', 'audio/mpeg', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
const mapperOfIcons = {
  'image/png': <FileTypeImage />,
  'image/gif': <FileTypePdf />,
  'image/jpeg': <FileTypeImage />,
  'image/svg+xml': <FileTypeSvg />,
  'application/pdf' : <FileTypePdf />,
  'application/zip' : <FileTypeZip />,
  'text/plain' : <FileTypeTxt />,
  'text/html' : <FileTypeHtml />,
  'video/quicktime' : <FileTypeVideo />,
  'audio/mpeg' : <FileTypeMp3 />,
  'application/vnd.ms-excel': <FileTypeXls/>,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': <FileTypePptx/>
};

const FileView: React.FC<FileViewProps> = ({ data, texts, onRemove, removable }) => {

  const getFriendlySize = (size?: number): string => filesize(size || 0);

  const { disabled, error, file, progress, success } = data;

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
        <S.PreviewImage>
          <Icon component={mapperOfIcons[file.type]} size={40} />
        </S.PreviewImage>
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
          <Icon component={<RepeatM />} />
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
          okType="primary"
          title={texts.removeConfirmTitle}
          placement="top"
          mouseEnterDelay={250}
          mouseLeaveDelay={250}
          trigger="click"
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
