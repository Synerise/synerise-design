import * as React from 'react';
import * as copy from 'copy-to-clipboard';
import { DuplicateS } from '@synerise/ds-icon';
import Scrollbar from '@synerise/ds-scrollbar';

import CopyAction from '../../CopyAction/CopyAction';
import * as S from './SingleCode.styles';
import { FontSize } from '../../CodeSnippet.types';

export interface SingleCodeProps {
  children?: string;
  className?: string;
  style?: React.CSSProperties;
  tooltipTitleHover?: string;
  tooltipTitleClick?: string;
  fontSize?: FontSize;
  onCopy?: () => void;
  maxWidth?: string | number;
}

const SingleCode: React.FC<SingleCodeProps> = ({
  children = '',
  fontSize = FontSize.SMALL,
  tooltipTitleHover,
  tooltipTitleClick,
  className,
  onCopy,
  maxWidth = '100%',
}) => {
  const iconElement = React.useMemo(
    () => (
      <CopyAction
        tooltipTitleHover={tooltipTitleHover}
        tooltipTitleClick={tooltipTitleClick}
        className={S.ICON_CLASSNAME}
        onClick={(): void => {
          copy(children);
          onCopy && onCopy();
        }}
        icon={<DuplicateS />}
        data-testid="ds-copy-code-snippet"
      />
    ),
    [children, tooltipTitleHover, tooltipTitleClick, onCopy]
  );
  const renderWithScroll = (): React.ReactNode | boolean => {
    return <S.BlockCodeWrapperSingle fontSize={fontSize}>{children}</S.BlockCodeWrapperSingle>;
  };

  return (
    <S.CodeSnippetWrapperSingle fontSize={fontSize} className={className}>
      <S.ContentIconWrapper>
        {maxWidth ? (
          <Scrollbar style={{ whiteSpace: 'nowrap' }} maxWidth={maxWidth}>
            {renderWithScroll()}
          </Scrollbar>
        ) : (
          <S.BlockCodeWrapperSingle fontSize={fontSize}>{children}</S.BlockCodeWrapperSingle>
        )}
        {iconElement}
      </S.ContentIconWrapper>
    </S.CodeSnippetWrapperSingle>
  );
};

export default SingleCode;
