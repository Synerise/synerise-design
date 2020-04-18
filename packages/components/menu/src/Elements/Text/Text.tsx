import * as React from 'react';
import Icon from '@synerise/ds-icon/';
import AngleRightS from '@synerise/ds-icon/dist/icons/AngleRightS';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as copy from 'copy-to-clipboard';
import { ClickParam, SelectParam } from 'antd/lib/menu';
import * as S from './Text.styles';

interface Props {
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
  ...rest
}) => {
  const [pressed, setPressed] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const canCopyToClipboard = copyable && copyHint && copyValue && !disabled;
  const hightlightContent = React.useMemo(() => {
    if (highlight) {
      const index = children.toLocaleLowerCase().indexOf(highlight.toLocaleLowerCase());
      if (index === -1) {
        return children;
      }
      const startOfQuery = children.toLocaleLowerCase().search(highlight.toLocaleLowerCase());
      const result = children.substr(startOfQuery, highlight.length);
      return children.replace(result, `<span class="search-highlight">${result}</span>`);
    }
    return children;
  }, [children, highlight]);
  const myChildren = hightlightContent;
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
      {...rest}
    >
      <S.Inner prefixel={Boolean(prefixel)}>
        <S.ContentWrapper prefixel={Boolean(prefixel)}>
          {prefixel && (
            <S.PrefixelWrapper className="ds-menu-prefix" pressed={pressed} disabled={disabled}>
              {prefixel}
            </S.PrefixelWrapper>
          )}
          <S.Content hightlight={!!highlight}>
            {canCopyToClipboard && hovered ? copyHint : <div dangerouslySetInnerHTML={{ __html: myChildren }} />}
            {Boolean(description) && <S.Description>{description}</S.Description>}
            {parent && (
              <S.ArrowRight>
                <Icon component={<AngleRightS />} color={theme.palette['grey-600']} />
              </S.ArrowRight>
            )}
          </S.Content>
          {Boolean(suffixel) && <S.SuffixWraper disabled={disabled}>{suffixel}</S.SuffixWraper>}
        </S.ContentWrapper>
      </S.Inner>
    </S.Wrapper>
  );
};

export default Text;
