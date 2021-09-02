import * as React from 'react';
import AnimateHeight from 'react-animate-height';
import * as copy from 'copy-to-clipboard';
import Icon from '@synerise/ds-icon';
import { DuplicateS, ArrowDownCircleM } from '@synerise/ds-icon/dist/icons';
import Scrollbar from '@synerise/ds-scrollbar';

import { CodeSnippetProps, CodeSnippetType } from '../../CodeSnippet.types';
import Highlight from '../../Highlight/Highlight';
import * as S from '../../CodeSnippet.styles';

import CopyAction from '../../CopyAction/CopyAction';

const ANIMATE_HEIGHT_TIME = 300;

const MultiCode: React.FC<CodeSnippetProps> = ({
  type = CodeSnippetType.INLINE,
  languages = ['javascript', 'typescript', 'json'],
  children = '',
  colorSyntax = false,
  tooltipTitleHover,
  tooltipTitleClick,
  labelBeforeExpanded,
  labelAfterExpanded,
  wrap = false,
  rows = 6,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [scrollable, setScrollable] = React.useState(false);
  const [allRows, setAllRows] = React.useState(1);
  const codeRef = React.useRef<HTMLElement>(null);

  const buttonProps = {
    type: 'ghost',
    mode: 'icon-label',
    className: 'btn-expander',
    expanded,
  };

  const initialContentHeight = React.useMemo((): number => {
    const numberRows = allRows > rows ? rows : allRows;
    return (numberRows + 1) * S.LINE_HEIGHT_DEFAULT;
  }, [rows, allRows]);

  const onMounting = React.useCallback(() => {
    if (!!codeRef && !!codeRef?.current) {
      setAllRows(Math.round(codeRef.current.offsetHeight / S.LINE_HEIGHT_DEFAULT));
    }
  }, [codeRef]);

  React.useLayoutEffect(() => {
    onMounting();
  }, [onMounting, children, rows, wrap]);

  const handleButton = React.useCallback((isScroll: boolean): void => {
    setExpanded(prevState => !prevState);
    if (isScroll) setTimeout(() => setScrollable(prevState => !prevState), ANIMATE_HEIGHT_TIME);
    else setScrollable(prevState => !prevState);
  }, []);

  const isButtonVisible = React.useMemo((): boolean => allRows > rows + 1, [rows, allRows]);
  const extraHeightOption = React.useMemo((): number | string => (isButtonVisible ? initialContentHeight : 'auto'), [
    isButtonVisible,
    initialContentHeight,
  ]);

  const multilineStructureContent: React.ReactNode = (
    <S.PreBlock wrap={wrap} expanded={expanded} isButtonVisible={isButtonVisible}>
      <AnimateHeight
        className="content-animation"
        duration={ANIMATE_HEIGHT_TIME}
        height={!expanded ? extraHeightOption : 'auto'}
        style={{ minHeight: S.LINE_HEIGHT_DEFAULT }}
      >
        <Scrollbar
          maxHeight={!scrollable ? (rows + 1) * S.LINE_HEIGHT_DEFAULT : '100%'}
          style={{
            marginRight: '17px',
          }}
        >
          <S.BlockCodeWrapper ref={codeRef} isButtonVisible={isButtonVisible} type={CodeSnippetType.MULTI_LINE}>
            {children}
          </S.BlockCodeWrapper>
        </Scrollbar>
      </AnimateHeight>
    </S.PreBlock>
  );
  const iconElement: React.ReactNode = (
    <CopyAction
      tooltipTitleHover={tooltipTitleHover}
      tooltipTitleClick={tooltipTitleClick}
      className={S.ICON_CLASSNAME}
      onClick={(): void => {
        copy(children);
      }}
      icon={<DuplicateS />}
    />
  );
  return (
    <S.CodeSnippetWrapper type={type} expanded={expanded} isButtonVisible={isButtonVisible}>
      <S.ContentIconWrapper type={type}>
        {colorSyntax && languages ? (
          <Highlight languages={languages}>{multilineStructureContent}</Highlight>
        ) : (
          multilineStructureContent
        )}
        {iconElement}
      </S.ContentIconWrapper>
      {rows && isButtonVisible && (
        <S.ExpanderButton {...buttonProps} onClick={(): void => handleButton(expanded)}>
          <Icon component={<ArrowDownCircleM />} />
          {expanded ? labelAfterExpanded : labelBeforeExpanded}
        </S.ExpanderButton>
      )}
    </S.CodeSnippetWrapper>
  );
};

export default MultiCode;
