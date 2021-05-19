import * as React from 'react';
import MonacoEditorBase, { monaco } from 'react-monaco-editor';
import { withTheme } from 'styled-components';
import debounce from 'lodash/debounce';
import { Label } from '@synerise/ds-input';
import { Description, ErrorText } from '@synerise/ds-typography';
import Icon from '@synerise/ds-icon';
import { FullScreenM } from '@synerise/ds-icon/dist/icons';
import Modal from '@synerise/ds-modal';
import Tooltip from '@synerise/ds-tooltip';

import { removeContextMenuElements } from './helpers/contextMenu';
import * as S from './CodeArea.styles';
import './style/index.less';
import { CodeAreaProps } from './CodeArea.types';
import {
  MONACO_EDITOR_ON_CHANGE_DELAY,
  MONACO_EDITOR_DEFAULT_OPTIONS,
  MONACO_EDITOR_LAYOUT_EVENT_NAME,
  MONACO_EDITOR_MENU_ID,
  MONACO_EDITOR_MENU_IDS_TO_REMOVE,
  syneriseThemeColors,
  syneriseThemeRules
} from './consts';

const CodeArea: React.FC<CodeAreaProps> = ({
  label,
  description,
  editorDidMount,
  onChange,
  onChangeDebounced = false,
  onChangeDebouncedWait = MONACO_EDITOR_ON_CHANGE_DELAY,
  options = {},
  theme,
  error,
  errorText,
  tooltipText,
  ...props
}) => {
  const [size, setSize] = React.useState<{ width: string; height: string }>({ width: '282px', height: '118px' });
  const [editor, setEditor] = React.useState<monaco.editor.IStandaloneCodeEditor>();
  const [isFullScreen, setFullScreen] = React.useState<boolean>(false);
  const [focused, setFocused] = React.useState<boolean>(false);

  const showError = React.useMemo(() => Boolean(error && errorText), [errorText, error]);

  const editLayoutUpdate = React.useCallback(() => editor?.layout(), [editor]);

  React.useEffect(
    function removeMenuElements() {
      removeContextMenuElements(MONACO_EDITOR_MENU_ID, MONACO_EDITOR_MENU_IDS_TO_REMOVE);
    },
    [editor]
  );

  React.useLayoutEffect(
    function resizeMonacoEditor() {
      document.addEventListener(MONACO_EDITOR_LAYOUT_EVENT_NAME, editLayoutUpdate);

      return function resizeMonacoEditorCleanup(): void {
        document.removeEventListener(MONACO_EDITOR_LAYOUT_EVENT_NAME, editLayoutUpdate);
      };
    },
    [editLayoutUpdate]
  );

  React.useEffect(() => {
    monaco.editor.defineTheme('synerise-theme', {
      base: 'vs',
      inherit: true,
      rules: syneriseThemeRules(),
      colors: syneriseThemeColors(theme, showError, focused),
    });
  }, [theme, showError, focused]);

  const editorDidMountWrapper = (
    currentEditor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ): void => {
    if (editorDidMount) editorDidMount(currentEditor, monacoInstance);
    setEditor(currentEditor);
  };

  const onChangeBase = (value: string, event: monaco.editor.IModelContentChangedEvent): void =>
    onChange?.(value, event);
  const onChangeWrapper = onChangeDebounced ? debounce(onChangeBase, onChangeDebouncedWait) : onChangeBase;

  const handleFullScreenClick = (): void => {
    setFullScreen(true);
    setSize({ width: '1196px', height: '950px' });
  };

  const handleMinimize = (): void => {
    setFullScreen(false);
    setSize({ width: '282px', height: '118px' });
  };

  return !isFullScreen ? (
    <>
      {label && (
        <S.LabelWrapper>
          <Label label={label} />
        </S.LabelWrapper>
      )}
      <S.MonacoWrapper error={showError} onFocus={(): void => setFocused(true)} onBlur={(): void => setFocused(false)}>
        <MonacoEditorBase
          options={{ ...MONACO_EDITOR_DEFAULT_OPTIONS, ...options }}
          onChange={onChangeWrapper}
          editorDidMount={editorDidMountWrapper}
          theme="synerise-theme"
          width={size.width}
          height={size.height}
          {...props}
        />
        <S.FullScreenWrapper height={size.height}>
          <Tooltip title={tooltipText || 'Full screen'}>
            <Icon component={<FullScreenM />} color={theme.palette['grey-600']} onClick={handleFullScreenClick} />
          </Tooltip>
        </S.FullScreenWrapper>
      </S.MonacoWrapper>
      {showError && (
        <S.ErrorWrapper>
          <ErrorText>{errorText}</ErrorText>
        </S.ErrorWrapper>
      )}
      {description && (
        <S.LabelWrapper>
          <Description>{description}</Description>
        </S.LabelWrapper>
      )}
    </>
  ) : (
    <Modal
      closable
      visible
      blank
      onCancel={handleMinimize}
      size="extraLarge"
      bodyBackground="grey"
      footer={null}
      title={<S.LabelModalWrapper>{label}</S.LabelModalWrapper>}
    >
      <S.MonacoWrapper error={showError}>
        <MonacoEditorBase
          options={{ ...MONACO_EDITOR_DEFAULT_OPTIONS, ...options }}
          onChange={onChangeWrapper}
          editorDidMount={editorDidMountWrapper}
          theme="synerise-theme"
          width={size.width}
          height={size.height}
          {...props}
        />
      </S.MonacoWrapper>
    </Modal>
  );
};

export default withTheme(CodeArea);
