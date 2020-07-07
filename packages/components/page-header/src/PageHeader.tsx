import * as React from 'react';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import InlineEdit from '@synerise/ds-inline-edit/';
import { CloseS, ArrowLeftM } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button/';
import { withTheme } from 'styled-components';
import * as S from './PageHeader.styles';

export type PageHeaderProps = {
  className?: string;
  rightSide?: React.ReactNode;
  children?: React.ReactNode;
  bar?: React.ReactNode;
  tabs?: React.ReactNode;
  avatar?: React.ReactNode;
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  more?: React.ReactNode;
  onGoBack?: () => void;
  goBackIcon?: React.ReactNode;
  onClose?: () => void;
  isolated?: boolean;
  inlineEdit?: {
    name?: string;
    value: string | number;
    maxLength?: number;
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnBlur?: React.FocusEventHandler<HTMLInputElement>;
    handleOnEnterPress?: React.KeyboardEventHandler<HTMLInputElement>;
    placeholder?: string;
    size: 'small' | 'normal';
    style?: {
      [key: string]: string | number;
    };
    error?: boolean;
    disabled?: boolean;
    hideIcon?: boolean;
  };
};

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const {
    className,
    onGoBack,
    onClose,
    children,
    rightSide,
    title,
    description,
    bar,
    tabs,
    isolated,
    inlineEdit,
    more,
    avatar,
    goBackIcon,
  } = props;

  const backIcon = goBackIcon || (
    <Icon className="page-header__back" color={theme.palette['grey-600']} component={<ArrowLeftM />} size={24} />
  );

  return (
    <S.MainContainer isolated={isolated} className={`${className || ''} ds-page-header`}>
      <S.PageHeaderContainer>
        {onGoBack && (
          <S.PageHeaderBack>
            <Button type="ghost" mode="single-icon" onClick={onGoBack}>
              {backIcon}
            </Button>
          </S.PageHeaderBack>
        )}
        {!!avatar && avatar}
        {inlineEdit && (
          <S.PageHeaderInlineEdit>
            <InlineEdit
              input={{
                name: inlineEdit.name,
                value: inlineEdit.value,
                maxLength: inlineEdit.maxLength,
                onChange: inlineEdit.handleOnChange,
                onBlur: inlineEdit.handleOnBlur,
                onEnterPress: inlineEdit.handleOnEnterPress,
                placeholder: inlineEdit.placeholder,
              }}
              size={inlineEdit.size}
              error={inlineEdit.error}
              disabled={inlineEdit.disabled}
              hideIcon={inlineEdit.hideIcon}
              style={inlineEdit.style}
            />
          </S.PageHeaderInlineEdit>
        )}

        {!!more && <S.PageHeaderMore>{more}</S.PageHeaderMore>}

        <S.PageHeaderClamp>{children || title}</S.PageHeaderClamp>

        {!!description && <S.PageHeaderDescription>{description}</S.PageHeaderDescription>}
        <S.PageHeaderRightSide>
          <div>
            {rightSide && rightSide}
            {onClose && (
              <Button type="ghost" mode="single-icon">
                <Icon
                  className="page-header__close"
                  color={theme.palette['grey-500']}
                  component={<CloseS />}
                  size={32}
                  onClick={onClose}
                />
              </Button>
            )}
          </div>
        </S.PageHeaderRightSide>
      </S.PageHeaderContainer>

      {!!tabs && <S.PageHeaderTabsWrapper>{tabs}</S.PageHeaderTabsWrapper>}

      {!!bar && <S.PageHeaderBar>{bar}</S.PageHeaderBar>}
    </S.MainContainer>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default withTheme(PageHeader);
