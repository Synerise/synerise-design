import React, { SyntheticEvent, useState } from 'react';
import { ObjectAvatar, UserAvatar } from '@synerise/ds-avatar';
import { useArgs } from 'storybook/preview-api';

import Tooltip from '@synerise/ds-tooltip';
import { theme } from '@synerise/ds-core';
import Icon, {
  AiSearchGreyM,
  AnalyticsGreyM,
  CheckS,
  FileCodeM,
  FilterM,
  SearchM,
  SegmentM,
  UserCircleM,
  UserM,
  WarningFillM,
} from '@synerise/ds-icon';
import Tag, { TagShape } from '@synerise/ds-tag';
import Button from '@synerise/ds-button';
import Card, { CardBadge } from '@synerise/ds-card';
import type { CardProps } from '@synerise/ds-card';

import * as S from './Card.styles';

const objectAvatar = (
  iconComponent = <FileCodeM />,
  documentTitle = 'Document title with a very long and truncated filename'
) => (
  <S.ObjectWithAvatar>
    <ObjectAvatar
      iconComponent={<Icon color={theme.palette['grey-600']} size={18} component={iconComponent} />}
      backgroundColor="grey-300"
      color="grey"
      size="small"
    />
    <Tooltip placement="top" title={documentTitle} trigger="hover" type="default">
      <S.ObjectLabel size="small" ellipsis={{ tooltip: documentTitle }}>
        {documentTitle}
      </S.ObjectLabel>
    </Tooltip>
  </S.ObjectWithAvatar>
);

const objectUserAvatar = (firstName = 'Jane', lastName = 'Doe') => (
  <S.ObjectWithAvatar>
    <UserAvatar
      size="small"
      user={{
        firstName,
        lastName,
      }}
    />
    <Tooltip placement="top" title="Username with a very long and truncated label" trigger="hover" type="default">
      <S.ObjectLabel size="small" ellipsis={{ tooltip: 'Username with a very long and truncated label' }}>
        Username with a very long and truncated label
      </S.ObjectLabel>
    </Tooltip>
  </S.ObjectWithAvatar>
);

const objectWithTag = (letter = 'A', color = theme.palette['blue-600']) => (
  <S.ObjectWithTag>
    <Tag shape={TagShape.SINGLE_CHARACTER_SQUARE} id="0" name={letter} color={color} asPill />
    <Tooltip placement="top" title="Value" trigger="hover" type="default">
      <S.ObjectLabel>Value</S.ObjectLabel>
    </Tooltip>
  </S.ObjectWithTag>
);

export const CARD_SUMMARY_ITEMS = [
  {
    key: '1',
    label: 'Total audience',
    value: '1234',
    summaryRowObjects: [objectAvatar(), objectAvatar(<AiSearchGreyM />, 'Short filename'), objectAvatar(<AnalyticsGreyM />)],
  },
  {
    key: '2',
    label: 'Estimated reach',
    value: '34 (30%)',
  },
  {
    key: '3',
    label: 'Selected segments',
    value: '3',
    summaryRowObjects: [
      objectWithTag('A', theme.palette['blue-600']),
      objectWithTag('B', theme.palette['mars-600']),
      objectWithTag('C', theme.palette['fern-600']),
    ],
  },
  {
    key: '4',
    label: 'Users',
    value: '2',
    summaryRowObjects: [objectUserAvatar('Tom', 'Hilding'), objectUserAvatar('Martha', 'Thompson')],
  },
];

export const CARD_CONTENT = (
  <>
    <br />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    <br />
    <br />
    Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
    <br />
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
    voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
    voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
    velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
    enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
    consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
    vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
    <br />
    <br />
    1914 translation by H. Rackham
    <br />
    But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
    give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the
    master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but
    because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.
    Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because
    occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial
    example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who
    has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who
    avoids a pain that produces no resultant pleasure?
  </>
);

export const CARD_BACKGROUNDS = ['white', 'white-shadow', 'grey', 'grey-shadow', 'outline'];

export const CUSTOM_BADGES = {
  icon: (
    <div style={{ marginRight: '16px' }}>
      <ObjectAvatar color="mars" iconComponent={<Icon component={<SegmentM />} />} />
    </div>
  ),
  undefined: undefined,
  text: <div>Badge</div>,
};

const titleTag = <Tag asPill name='OPTIONAL' color={theme.palette['grey-500']} shape={TagShape.SMALL_SQUARE} />;
export const CARD_HEADER_VARIANTS = [
  {
    title: 'With Title Status Tag',
    titleTag: titleTag,
  },
  {
    title: 'Compact',
    compactHeader: true,
  },
  {
    title: 'With Header Side Buttons',
    headerSideChildren: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px' }}>
        <Button type="ghost">Cancel</Button>
        <Button type="primary">Apply</Button>
      </div>
    ),
  },
  {
    title: 'With Icons',
    headerSideChildren: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px' }}>
        <Button type="ghost" mode="single-icon">
          <Icon component={<FilterM />} />
        </Button>
        <Button type="ghost" mode="single-icon">
          <Icon component={<SearchM />} />
        </Button>
      </div>
    ),
  },
  {
    title: 'With Icon Badge',
    icon: <CardBadge icon={<CheckS />} />,
    headerSideChildren: (
      <div>
        <Button>Define</Button>
      </div>
    ),
  },
  {
    title: 'With Icon Badge Success',
    icon: <CardBadge icon={<CheckS />} status="success" />,
    headerSideChildren: <></>,
  },
  {
    title: 'with Header Bottom Border',
    headerBorderBottom: true,
    headerSideChildren: <></>,
  },
  {
    title: 'With Cancel and Apply',
    headerSideChildren: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
        <Button
          type="ghost">
          Cancel
        </Button>
        <Button
          type="custom-color"
          color="green"
        >
          Apply
        </Button>
      </div>
    ),
  },
  {
    title: 'With Skip Step',
    headerSideChildren: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
        <Button
          type="custom-color"
          color={'yellow'}>
          Skip step
        </Button>
        <Button>
          Define
        </Button>
      </div>
    ),
  },
  {
    title: 'Disabled',
    disabled: true,
  },
  {
    title: 'With Icon',
    iconColor: theme.palette['grey-400'],
  },
  {
    title: 'With User Icon',
    icon: <Icon component={<UserM />} />,
    iconColor: theme.palette['grey-400'],
  },
  {
    title: 'With warning',
    iconColor: theme.palette['grey-400'],
    headerSideChildren: (
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridColumnGap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon component={<WarningFillM />} color={theme.palette['yellow-600']} style={{ marginRight: '4px' }} />
          <span style={{ fontWeight: 500, color: theme.palette['yellow-600'] }}>Uncompleted</span>
        </div>
        <Button type="custom-color" color="green" disabled>
          Apply
        </Button>
      </div>
    ),
  },
  {
    title: 'With Avatar',
    icon: false,
    avatar: (
      <UserAvatar
        text="A"
        size="medium"
        badgeStatus="active"
        backgroundColor="auto"
        iconComponent={<Icon component={<UserCircleM />} />}
      />
    ),
  },
];

export const defaultRender = ({ children, ...args }: CardProps) => {
  const [{ hideContent }, updateArgs] = useArgs();

  const handleHeaderClick = (event: SyntheticEvent) => {
    args.onHeaderClick?.(event);
    updateArgs({ hideContent: !hideContent });
  };

  const headerSideChildren = (
    <Button type="primary" onClick={() => updateArgs({ hideContent: !hideContent })}>
      {!hideContent ? 'Close' : 'Open'}
    </Button>
  );

  return (
    <Card {...args} headerSideChildren={headerSideChildren} onHeaderClick={handleHeaderClick}>
      {children}
    </Card>
  );
};

export const CardWithState = ({ children, hideContent, ...args }: CardProps) => {
  const [isVisible, setIsVisible] = useState(!hideContent);

  const handleHeaderClick = (event: SyntheticEvent) => {
    args.onHeaderClick?.(event);
    setIsVisible(!isVisible);
  };

  const headerSideChildren = args.headerSideChildren || (
    <Button type="primary" onClick={() => setIsVisible(!isVisible)}>
      {!hideContent ? 'Close' : 'Open'}
    </Button>
  );

  return (
    <Card {...args} hideContent={!isVisible} headerSideChildren={headerSideChildren} onHeaderClick={handleHeaderClick}>
      {children}
    </Card>
  );
};
