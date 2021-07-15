import * as React from 'react';
import { CloseM, WarningFillM, UserAddM, Check3M, HelpFillM, DuplicateS } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import UnorderedList from '@synerise/ds-unordered-list';
import * as S from './SectionMessage.styles';
import { AlertType, Props } from './SectionMessage.types';

const ICONS: Record<AlertType, React.ReactNode> = {
  positive: <Check3M />,
  notice: <WarningFillM />,
  negative: <WarningFillM />,
  neutral: <HelpFillM />,
};

const data = [
  {
    label: (
      <S.OrderWrapper >
        <div style={{ marginRight: '10px' }}>•</div> Schedule section must be defined
        <S.NumberWrapper>(505-456)</S.NumberWrapper>
        <S.IconOrderWrapper><Icon component={<DuplicateS/>}/></S.IconOrderWrapper>
      </S.OrderWrapper>
    ),
    index: (1),
    id:('list')
  },
  {
    label: (
      <S.OrderWrapper >
        <div style={{ marginRight: '10px' }}>•</div> Missing email template
        <S.NumberWrapper>(505-456)</S.NumberWrapper>
        <S.IconOrderWrapper><Icon component={<DuplicateS/>}/></S.IconOrderWrapper>
      </S.OrderWrapper>
    ),
    index: (1),
    id:('list')
  },
];

const DEFAULT_ICON = <WarningFillM />;

const SectionMessage: React.FC<Props> = (props: Props) => {
  const {
    icon,
    type,
    message,
    description,
    showMoreLabel,
    onShowMore,
    newClient,
    moreButtons,
    withEmphasis,
    withLink,
    unorderedList,
    color,
    withClose,
    customColor,
    customColorIcon,
    customIcon,
  } = props;

  const renderMessage = React.useMemo(() => {
    return (
      <S.AlertContent>
        {message && <S.AlertMessage>{message}</S.AlertMessage>}
        <S.Text>
          {description && <S.AlertDescription>{description}</S.AlertDescription>}
          {withLink && <S.WithLink>{withLink}</S.WithLink>}
          {withEmphasis && !withLink && <S.WithEmphasis>{withEmphasis}</S.WithEmphasis>}
        </S.Text>
        {onShowMore && showMoreLabel && <S.AlertShowMore onClick={onShowMore}>{showMoreLabel}</S.AlertShowMore>}
        {moreButtons && (
          <S.ButtonsWrapper>
            <div style={{ marginRight: '8px' }}>
              <Button type="secondary" mode="label">
                Button
              </Button>
            </div>
            <Button type="ghost" mode="label">
              Button
            </Button>
          </S.ButtonsWrapper>
        )}
        {unorderedList && !moreButtons && (
          <S.Wrapper>
            <UnorderedList data={data} indexFormatter={undefined} />
          </S.Wrapper>
        )}
      </S.AlertContent>
    );
  }, [message, description, showMoreLabel, onShowMore, moreButtons, withEmphasis, withLink, unorderedList]);

  const renderIcon = React.useMemo(() => {
    if (icon) return icon;
    if (ICONS[type]) return ICONS[type];
    return DEFAULT_ICON;
  }, [icon, type]);

  return (
    <S.Container color={color} customColor={customColor}>
      <S.WrapperSectionMessage>
        <S.AllContent>
          <S.IconWrapper color={color} customColorIcon={customColorIcon}>
            {customIcon || (
            <Icon component={renderIcon} />
            )}
          </S.IconWrapper>
          {renderMessage}
        </S.AllContent>
        <S.ButtonWrapper>
          {newClient && (
            <Button type="ghost" mode="icon-label">
              <Icon component={<UserAddM />} />
              Add client
            </Button>
          )}
          {withClose && (
            <S.IconCloseWrapper>
              <Icon component={<CloseM />} />
            </S.IconCloseWrapper>
          )}
        </S.ButtonWrapper>
      </S.WrapperSectionMessage>
    </S.Container>
  );
};

export default SectionMessage;
