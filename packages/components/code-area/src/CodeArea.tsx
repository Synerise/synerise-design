import * as React from 'react';
import MonacoEditorBase, { monaco } from 'react-monaco-editor';
import { withTheme } from 'styled-components';
import debounce from 'lodash/debounce';
import { Label } from '@synerise/ds-input';
import { Description, ErrorText } from '@synerise/ds-typography';
import Icon from '@synerise/ds-icon';
import { FullScreenM } from '@synerise/ds-icon/dist/icons';
import Modal from '@synerise/ds-modal';

import * as S from './CodeArea.styles';
import { CodeAreaProps } from './CodeArea.types';

const MONACO_EDITOR_LAYOUT_EVENT_NAME = 'monacoEditor:layout';

const MONACO_EDITOR_DEFAULT_OPTIONS = {
  minimap: {
    enabled: false,
  },
  scrollbar: {
    horizontal: 'hidden' as 'hidden',
    vertical: 'hidden' as 'hidden',
  },
  overviewRulerLanes: 0,
  folding: false,
  renderLineHighlightOnlyWhenFocus: true,
};

const MONACO_EDITOR_ON_CHANGE_DELAY = 300;

const transparentColorCode = '#00000000';

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
  ...props
}) => {
  const [size, setSize] = React.useState<{ width: string; height: string }>({ width: '284px', height: '120px' });
  const [editor, setEditor] = React.useState<monaco.editor.IStandaloneCodeEditor>();
  const [isFullScreen, setFullScreen] = React.useState<boolean>(false);

  const showError = React.useMemo(() => Boolean(error && errorText), [errorText, error]);

  const editLayoutUpdate = React.useCallback(() => editor?.layout(), [editor]);

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
      rules: [],
      colors: {
        'editor.background': `${theme.palette[showError ? 'red-100' : 'white']}`,
        'editorGutter.background': `${theme.palette[showError ? 'red-200' : 'grey-200']}`,
        'editorLineNumber.foreground': '#404c5a',
        'editor.lineHighlightBackground': transparentColorCode,
        'editor.lineHighlightBorder': transparentColorCode,
      },
    });
  }, [theme, showError]);

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
    setSize({ width: '98%', height: '950px' });
  };

  const handleMinimize = (): void => {
    setFullScreen(false);
    setSize({ width: '284px', height: '120px' });
  };

  return !isFullScreen ? (
    <>
      {label && (
        <S.LabelWrapper>
          <Label label={label} />
        </S.LabelWrapper>
      )}
      <S.MonacoWrapper error={error}>
        <MonacoEditorBase
          options={{ ...MONACO_EDITOR_DEFAULT_OPTIONS, ...options }}
          onChange={onChangeWrapper}
          editorDidMount={editorDidMountWrapper}
          theme="synerise-theme"
          width={size.width}
          height={size.height}
          {...props}
        />
        <S.FullScreenWrapper>
          <Icon component={<FullScreenM />} color={theme.palette['grey-600']} onClick={handleFullScreenClick} />
        </S.FullScreenWrapper>
      </S.MonacoWrapper>
      {showError && <ErrorText>{errorText}</ErrorText>}
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
      <S.MonacoWrapper error={error}>
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
