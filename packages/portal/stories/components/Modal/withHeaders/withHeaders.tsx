import * as React from 'react';
import { sizes } from '../index.stories';
import { boolean, select } from '@storybook/addon-knobs';
import * as S from './withHeaders.styles';
import Avatar from '@synerise/ds-avatar';
import { MailM, SearchM, UserM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon';
import Badge from '@synerise/ds-badge';
import Button from '@synerise/ds-button';
import Tabs from '@synerise/ds-tabs';
import { action } from '@storybook/addon-actions';

const HeaderTypes = {
  DEFAULT: 'DEFAULT',
  DESCRIPTION: 'DESCRIPTION',
  BLANK: 'BLANK',
  TABS: 'TABS',
  ICON_AND_LABEL: 'ICON_AND_LABEL',
  AVATAR: 'AVATAR',
  AVATAR_DESCRIPTION: 'AVATAR_DESCRIPTION',
};
const HeaderKnobs = {
  Default: HeaderTypes.DEFAULT,
  'With description': HeaderTypes.DESCRIPTION,
  Blank: HeaderTypes.BLANK,
  'With tabs': HeaderTypes.TABS,
  'Avatar and label': HeaderTypes.AVATAR,
  'Avatar, label and description': HeaderTypes.AVATAR_DESCRIPTION,
  'Icon and label': HeaderTypes.ICON_AND_LABEL,
};

const tabs = [
  {
    label: 'Tab first',
  },
  {
    label: 'Tab second ',
  },
  {
    label: 'Tab third',
  },
];

const headerWithPrefix = (text: string, prefix: React.ReactNode) => {
  return (
    <S.HeaderWrapper>
      <S.HeaderTitleWrapper>
        <S.HeaderPrefix>{prefix}</S.HeaderPrefix>
        {text}
      </S.HeaderTitleWrapper>
    </S.HeaderWrapper>
  );
};

const headerWithTabs = (text: string) => {
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <S.HeaderWrapper>
      {text}
      <S.HeaderPlaceholder />
      <S.TabsContainer>
        <Tabs
          underscore
          tabs={tabs}
          activeTab={activeTab}
          handleTabClick={(index: number) => {
            setActiveTab(index);
          }}
          configuration={{ label: 'Manage tabs', action: action('Manage tabs clicked') }}
        />
      </S.TabsContainer>
    </S.HeaderWrapper>
  );
};
const customHeaderProps = (headerType: string) => {
  switch (headerType) {
    case HeaderTypes.DEFAULT:
      return {
        title: 'Simple header',
      };
    case HeaderTypes.DESCRIPTION:
      return {
        title: 'Header with description',
        description: 'Description',
      };
    case HeaderTypes.BLANK: {
      return { title: '' };
    }
    case HeaderTypes.TABS: {
      return { title: headerWithTabs('With tabs') };
    }
    case HeaderTypes.AVATAR: {
      return {
        title: headerWithPrefix(
          'Header with avatar',
          <Badge status="active">
            <Avatar size={'medium'} shape={'circle'} backgroundColor={'red'} backgroundColorHue={'100'} hasStatus>
              <Icon component={<MailM />} color={theme.palette['red-500']} />{' '}
            </Avatar>
          </Badge>
        ),
      };
    }
    case HeaderTypes.AVATAR_DESCRIPTION: {
      return {
        title: headerWithPrefix(
          'Header with avatar and description',
          <Badge status="active">
            <Avatar size={'medium'} shape={'circle'} backgroundColor={'red'} backgroundColorHue={'100'} hasStatus>
              <Icon component={<MailM />} color={theme.palette['red-500']} />{' '}
            </Avatar>
          </Badge>
        ),
        description: 'Description',
      };
    }
    case HeaderTypes.ICON_AND_LABEL: {
      return {
        title: headerWithPrefix('Header with icon', <Icon component={<UserM />} color={theme.palette['grey-600']} />),
      };
    }
    default:
      return {
        title: 'Header',
      };
  }
};

const withHeaders = () => {
  const storyProps = {
    size: select('Size', sizes, null),
    visible: boolean('Set open', true),
    footer: null,
    headerActions: (
      <div>
        <Button mode="single-icon" type="ghost" onClick={action('Additional header button clicked')}>
          <Icon component={<SearchM />} color={theme.palette['grey-600']} />
        </Button>
      </div>
    ),
  };
  const header = select('Set header type', HeaderKnobs, HeaderTypes.DEFAULT);
  return <S.Modal {...storyProps} {...customHeaderProps(header)} withTabs={header === HeaderTypes.TABS} />;
};
export default withHeaders;
