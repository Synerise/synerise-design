import React, { Children, type ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Icon, { ArrowDownCircleM, ArrowUpCircleM } from '@synerise/ds-icon';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

import { type ListContextProps } from '../ListContext/ListContext';
import { ListContextProvider } from '../ListContext/ListContextProvider';
import * as S from './ListWrapper.styles';

export type ListWrapperTexts = {
  showMore: ReactNode;
  showLess: ReactNode;
};

export type ListWrapperProps = WithHTMLAttributes<
  HTMLDivElement,
  ListContextProps & {
    children?: ReactNode;
    maxToShowItems?: number;
    texts?: Partial<ListWrapperTexts>;
  }
>;

export const ListWrapper = ({
  children,
  onClick,
  maxToShowItems,
  texts,
  ...htmlAttributes
}: ListWrapperProps) => {
  const intl = useIntl();
  const [allVisible, setAllVisible] = useState(false);

  const resolvedTexts: ListWrapperTexts = {
    showMore: intl.formatMessage({
      id: 'DS.LIST-ITEM.SHOW-MORE',
      defaultMessage: 'Show more',
    }),
    showLess: intl.formatMessage({
      id: 'DS.LIST-ITEM.SHOW-LESS',
      defaultMessage: 'Show less',
    }),
    ...texts,
  };

  const isTogglable = maxToShowItems !== undefined;
  const childrenArray = Children.toArray(children);
  const hasItemsOverLimit =
    isTogglable && childrenArray.length > maxToShowItems;
  // In togglable mode render from the same `childrenArray` for both states so expanding only appends
  // the trailing items (stable keys) rather than swapping key namespaces and remounting the first N.
  const visibleChildren = !isTogglable
    ? children
    : allVisible
      ? childrenArray
      : childrenArray.slice(0, maxToShowItems);

  const toggleButton = hasItemsOverLimit && (
    <S.ToggleButtonWrapper>
      <Button
        onClick={() => setAllVisible((v) => !v)}
        type="ghost-primary"
        mode="icon-label"
        aria-expanded={allVisible}
      >
        <Icon
          component={allVisible ? <ArrowUpCircleM /> : <ArrowDownCircleM />}
        />
        {allVisible ? resolvedTexts.showLess : resolvedTexts.showMore}
      </Button>
    </S.ToggleButtonWrapper>
  );

  return (
    <S.ListWrapperContainer {...htmlAttributes}>
      <ListContextProvider onClick={onClick}>
        {visibleChildren}
      </ListContextProvider>
      {toggleButton}
    </S.ListWrapperContainer>
  );
};
