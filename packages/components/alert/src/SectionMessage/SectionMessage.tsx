import * as React from 'react';
import { CloseM, WarningFillM, UserAddM, Check3M, HelpFillM, Thunder2M } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import UnorderedList from '@synerise/ds-unordered-list';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './SectionMessage.styles';
import { AlertType, Props } from './SectionMessage.types';

const ICONS: Record<AlertType, React.ReactNode> = {
  positive: <Check3M />,
  notice: <WarningFillM />,
  negative: <WarningFillM />,
  informative: <Thunder2M />,
  neutral: <HelpFillM />,
};

const data = [
  {
    label: (
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '10px' }}>•</div> Schedule section must be defined
        <div style={{ marginLeft: '4px', color: theme.palette['grey-400'], cursor: 'pointer' }}>(505-456)</div>
      </div>
    ),
    index: (1),
    id:('list')
  },
  {
    label: (
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '10px' }}>•</div> Missing email template
        <div style={{ marginLeft: '4px', color: theme.palette['grey-400'], cursor: 'pointer' }}>(505-456)</div>
      </div>
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
    <S.Container color={color}>
      <S.WrapperSectionMessage>
        <S.AllContent>
          <S.IconWrapper color={color}>
            <Icon component={renderIcon} />
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
          <Button type="ghost" mode="single-icon">
            <Icon component={<CloseM />} />
          </Button>
        </S.ButtonWrapper>
      </S.WrapperSectionMessage>
    </S.Container>
  );
};

export default SectionMessage;
