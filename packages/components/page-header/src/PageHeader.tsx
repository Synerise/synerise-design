import * as React from 'react';
import Icon from '@synerise/ds-icon';
import ArrowLeftM from '@synerise/ds-icon/dist/icons/ArrowLeftM';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import CloseS from '@synerise/ds-icon/dist/icons/CloseS';
import Button from '@synerise/ds-button/dist/Button';
import * as S from './PageHeader.styles';

export type PageHeaderProps = {
  rightSide?: React.ReactNode;
  children?: React.ReactNode;
  bar?: React.ReactNode;
  tabs?: React.ReactNode;
  avatar?: React.ReactNode;
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  more?: React.ReactNode;
  onGoBack?: () => void;
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

const PageHeader: React.FC<PageHeaderProps> = props => {
  const {
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
  } = props;

  return (
    <S.MainContainer isolated={isolated}>
      <S.PageHeaderContainer>
        {onGoBack && (
          <S.PageHeaderBack>
            <Button type="ghost" onClick={onGoBack}>
              <Icon
                className="page-header__back"
                color={theme.palette['grey-600']}
                component={<ArrowLeftM />}
                size={24}
              />
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
              <S.PageHeaderClose>
                <Icon
                  className="page-header__close"
                  color={theme.palette['grey-500']}
                  component={<CloseS />}
                  size={32}
                  onClick={onClose}
                />
              </S.PageHeaderClose>
            )}
          </div>
        </S.PageHeaderRightSide>
      </S.PageHeaderContainer>

      {!!tabs && <S.PageHeaderTabsWrapper>{tabs}</S.PageHeaderTabsWrapper>}

      {!!bar && <S.PageHeaderBar>{bar}</S.PageHeaderBar>}
    </S.MainContainer>
  );
};

export default PageHeader;
