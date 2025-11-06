import classnames from 'classnames';
import React, {
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  forwardRef,
} from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, {
  AngleDownS,
  AngleRightS,
  AngleUpS,
  CheckS,
} from '@synerise/ds-icon';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

import { type ItemSize } from '../../ListItem.types';
import * as S from './Text.styles';

type ItemLabelProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
    onMouseOver?: (event: MouseEvent<HTMLDivElement>) => void;
    onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
    onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
    onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
    onBlur?: (event: FocusEvent<HTMLDivElement>) => void;

    checked?: boolean;
    disabled?: boolean;
    hasSubMenu?: boolean;
    subMenuOpen?: boolean;
    ordered?: boolean;
    noHover?: boolean;
    hasHighlight: boolean;
    inTooltip: boolean;
    prefixVisible?: boolean;
    suffixVisible?: boolean;
    parent?: boolean;

    size?: ItemSize;

    prefixElement?: ReactNode;
    suffixElement?: ReactNode;

    description?: ReactNode;
    content?: ReactNode;
    indentLevel?: number;
  }
>;

export const ItemLabel = forwardRef<HTMLDivElement, ItemLabelProps>(
  (
    {
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onMouseOver,
      onMouseLeave,
      onMouseDown,
      checked,
      noHover,
      disabled,
      ordered,
      className,
      hasHighlight,
      prefixElement,
      prefixVisible,
      suffixElement,
      suffixVisible,
      hasSubMenu,
      subMenuOpen,
      content,
      inTooltip,
      parent,
      description,
      size,
      indentLevel,

      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    return (
      <S.Wrapper
        role="menuitem"
        data-testid="ds-list-item"
        className={classnames('ds-list-item', className, {
          'ds-list-item-selected': checked,
        })}
        tabIndex={disabled ? -1 : 0}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        ordered={ordered}
        disabled={disabled}
        noHover={noHover}
        highlight={hasHighlight}
        size={size}
        // style={inTooltip ? undefined : style}
        inTooltip={inTooltip}
        ref={ref}
        indentLevel={indentLevel}
        {...rest}
      >
        <S.Inner>
          {prefixElement && (
            <S.PrefixWrapper
              data-testid="list-item-prefix"
              visible={prefixVisible}
              disabled={disabled}
            >
              {prefixElement}
            </S.PrefixWrapper>
          )}
          <S.Content className="ds-list-item-content" highlight={hasHighlight}>
            {content}
            {description && size === 'large' && (
              <S.Description>{description}</S.Description>
            )}
          </S.Content>
          {parent && (
            <S.ArrowRight>
              <Icon
                component={<AngleRightS />}
                color={theme.palette['grey-600']}
              />
            </S.ArrowRight>
          )}
          {(!!suffixElement || !!checked || hasSubMenu) && (
            <S.SuffixWrapper
              data-testid="list-item-suffix"
              visible={suffixVisible || hasSubMenu}
              disabled={disabled}
            >
              {!!checked && (
                <Icon
                  component={<CheckS />}
                  color={theme.palette[`green-600`]}
                />
              )}
              {hasSubMenu && (
                <Icon component={subMenuOpen ? <AngleUpS /> : <AngleDownS />} />
              )}
              {suffixElement}
            </S.SuffixWrapper>
          )}
        </S.Inner>
      </S.Wrapper>
    );
  },
);
