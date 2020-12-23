import * as React from 'react';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import InlineEdit from '@synerise/ds-inline-edit/';
import { CloseM, ArrowLeftM } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button/';
import { withTheme } from 'styled-components';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './PageHeader.styles';
import { PageHeaderProps } from './PageHeader.types';

const PageHeader: React.FC<PageHeaderProps> = props => {
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
    tooltip,
    tooltipIcon,
    handleTooltipClick,
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
        <S.PageHeaderClamp>
          <S.PageHeaderTitle>{children || title}</S.PageHeaderTitle>
          {tooltip !== undefined && tooltipIcon && (
            <Tooltip {...tooltip}>
              <Icon component={tooltipIcon} onClick={handleTooltipClick} />
            </Tooltip>
          )}
        </S.PageHeaderClamp>
        {!!more && <S.PageHeaderMore>{more}</S.PageHeaderMore>}
        {!!description && <S.PageHeaderDescription>{description}</S.PageHeaderDescription>}
        <S.PageHeaderRightSide>
          <div>
            {rightSide && rightSide}
            {onClose && (
              <Button type="ghost" mode="single-icon">
                <Icon
                  className="page-header__close"
                  color={theme.palette['grey-500']}
                  component={<CloseM />}
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
