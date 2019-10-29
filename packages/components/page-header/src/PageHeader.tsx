import * as React from 'react';
import Icon from '@synerise/ds-icon';
import ArrowLeftM from '@synerise/ds-icon/dist/icons/ArrowLeftM';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import InlineEdit from '@synerise/ds-inline-edit/dist/InlineEdit';
import Button from '@synerise/ds-button/dist/Button';
import { ArrowRightCircleM, CloseS } from '@synerise/ds-icon/dist/icons';
import * as S from './PageHeader.styles';

export type PageHeaderProps = {
  rightSide?: React.ReactNode;
  children?: React.ReactNode;
  bar?: React.ReactNode;
  tabs?: React.ReactNode;
  avatar?: React.ReactNode;
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  backLabel?: string;
  onGoBack?: () => void;
  onClose?: () => void;
  isolated?: boolean;
  inlineEdit?: boolean;
  more?: boolean;
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
  const [inputValue, setInputValue] = React.useState<string>('');

  return (
    <S.MainContainer isolated={isolated}>
      <S.PageHeaderContainer>
        {onGoBack && (
          <S.PageHeaderBack>
            <Icon color={theme.palette['grey-500']} component={<ArrowLeftM />} size={24} onClick={onGoBack} />
          </S.PageHeaderBack>
        )}
        {avatar && avatar}
        {inlineEdit && (
          <S.PageHeaderInlineEdit>
            <InlineEdit
              input={{
                name: 'name-of-input',
                value: inputValue,
              }}
              maxLength={60}
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setInputValue(event.target.value)}
              placeholder="Example text"
              size="normal"
            />
          </S.PageHeaderInlineEdit>
        )}

        {more && (
          <S.PageHeaderMore>
            <Button type="ghost" mode="icon-label">
              <Icon component={<ArrowRightCircleM />} color={theme.palette['grey-600']} />
              More details
            </Button>
          </S.PageHeaderMore>
        )}

        {children || <S.PageHeaderClamp>{title}</S.PageHeaderClamp>}

        {description && <S.PageHeaderDescription>{description}</S.PageHeaderDescription>}
        <S.PageHeaderRightSide>
          <div>
            {rightSide && rightSide}
            {onClose && (
              <S.PageHeaderClose>
                <Icon color={theme.palette['grey-500']} component={<CloseS />} size={32} onClick={onClose} />
              </S.PageHeaderClose>
            )}
          </div>
        </S.PageHeaderRightSide>
      </S.PageHeaderContainer>

      {tabs && <S.PageHeaderTabsWrapper>{tabs}</S.PageHeaderTabsWrapper>}

      {bar && <S.PageHeaderBar>{bar}</S.PageHeaderBar>}
    </S.MainContainer>
  );
};

PageHeader.defaultProps = {
  backLabel: 'Back',
};

export default PageHeader;
