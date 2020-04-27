import * as React from 'react';
import Icon from '@synerise/ds-icon/';
import AngleRightS from '@synerise/ds-icon/dist/icons/AngleRightS';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as copy from 'copy-to-clipboard';
import { ClickParam, SelectParam } from 'antd/lib/menu';
import * as S from './Text.styles';

interface Props {
  className?: string;
  parent?: boolean;
  disabled?: boolean;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  danger?: boolean;
  actions?: React.ReactNode;
  onSelect?: (props: SelectParam) => void;
  onClick?: (props: ClickParam) => void;
  description?: string | React.ReactNode;
  copyable?: boolean;
  copyHint?: string;
  copyValue?: string;
  highlight?: string;
  style?: React.CSSProperties;
  onItemHover?: (e: MouseEvent) => void;
}
const Text: React.FC<Props> = ({
  parent,
  disabled,
  prefixel,
  suffixel,
  danger,
  children,
  description,
  copyable,
  copyHint,
  copyValue,
  highlight,
  style,
  ...rest
}) => {
  const [pressed, setPressed] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const canCopyToClipboard = copyable && copyHint && copyValue && !disabled;

  const renderChildren = (): React.ReactNode => {
    if (highlight && typeof children === 'string') {
      const index = children.toLocaleLowerCase().indexOf(highlight.toLocaleLowerCase());
      if (index === -1) {
        return children;
      }
      const startOfQuery = children.toLowerCase().search(highlight.toLowerCase());
      const endOfQuery = startOfQuery + highlight.length;
      const resultArray = [
        children.substring(0, startOfQuery),
        <span key={children} className="search-highlight">
          {children.substring(startOfQuery, endOfQuery)}
        </span>,
        children.substring(endOfQuery, children.length),
      ];
      return resultArray;
    }
    return children;
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.Wrapper
      onMouseOver={(): void => {
        canCopyToClipboard && setHovered(true);
      }}
      onMouseLeave={(): void => {
        canCopyToClipboard && setHovered(false);
      }}
      onMouseDown={(): void => {
        setPressed(true);
        canCopyToClipboard && copyValue && copy(copyValue);
      }}
      onMouseOut={(): void => setPressed(false)}
      onMouseUp={(): void => setPressed(false)}
      onBlur={(): void => setPressed(false)}
      pressed={pressed}
      disabled={disabled}
      tabIndex={!disabled ? 0 : undefined}
      danger={danger}
      prefixel={prefixel}
      description={description}
      style={style}
      {...rest}
    >
      <S.Inner prefixel={!!prefixel}>
        <S.ContentWrapper prefixel={!!prefixel}>
          {prefixel && (
            <S.PrefixelWrapper className="ds-menu-prefix" pressed={pressed} disabled={disabled}>
              {prefixel}
            </S.PrefixelWrapper>
          )}
          <S.Content highlight={!!highlight}>
            {canCopyToClipboard && hovered ? copyHint : renderChildren()}
            {!!description && <S.Description>{description}</S.Description>}
            {parent && (
              <S.ArrowRight>
                <Icon component={<AngleRightS />} color={theme.palette['grey-600']} />
              </S.ArrowRight>
            )}
          </S.Content>
          {!!suffixel && <S.SuffixWraper disabled={disabled}>{suffixel}</S.SuffixWraper>}
        </S.ContentWrapper>
      </S.Inner>
    </S.Wrapper>
  );
};

export default Text;
