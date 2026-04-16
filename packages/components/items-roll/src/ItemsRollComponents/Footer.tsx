import React, { useMemo } from 'react';

import Icon, {
  ArrowDownCircleM,
  ArrowUpCircleM,
  CloseS,
  WarningFillM,
} from '@synerise/ds-icon';
import Popconfirm from '@synerise/ds-popconfirm';

import * as S from '../ItemsRoll.styles';
import {
  type FooterProps,
  type ShowLessButtonProps,
  type ShowMoreButtonProps,
} from './Footer.types';

const ShowLessButton = ({
  showDefaultItemsAmount,
  showLessLabel,
}: ShowLessButtonProps) => (
  <S.ShowButton
    type="ghost"
    mode="icon-label"
    onClick={showDefaultItemsAmount}
    data-testid="ds-items-roll-show-less"
  >
    <S.ArrowIcon component={<ArrowUpCircleM />} size={20} />
    <span className="bold-label">{showLessLabel}</span>
  </S.ShowButton>
);

const ShowMoreButton = ({
  showLabel,
  moreLabel,
  showAdditionalItems,
  getShowMoreNumber,
}: ShowMoreButtonProps) => (
  <S.ShowButton
    type="ghost"
    mode="icon-label"
    onClick={showAdditionalItems}
    data-testid="ds-items-roll-show-more"
  >
    <S.ArrowIcon component={<ArrowDownCircleM />} size={20} />
    <S.ShowButtonLabel>
      {showLabel}
      {` `}
      <span className="bold-label">{getShowMoreNumber}</span>
      {` `}
      {moreLabel}
    </S.ShowButtonLabel>
  </S.ShowButton>
);

const Footer = ({
  allTexts,
  itemsCount,
  maxToShowItems = 10,
  onClearAll,
  showAdditionalItems,
  showDefaultItemsAmount,
  showMoreStep = 10,
  visibleItemsCount,
  searchMode,
}: FooterProps) => {
  const getShowMoreNumber = useMemo(
    () =>
      visibleItemsCount + showMoreStep < itemsCount
        ? showMoreStep
        : itemsCount - visibleItemsCount,
    [itemsCount, showMoreStep, visibleItemsCount],
  );

  const showButtons = useMemo(
    () => itemsCount > maxToShowItems,
    [itemsCount, maxToShowItems],
  );
  const showClearButton = useMemo(
    () => onClearAll && !searchMode,
    [onClearAll, searchMode],
  );

  const showDivider = useMemo(() => {
    return showButtons || showClearButton;
  }, [showButtons, showClearButton]);

  const buttonsConfiguration = useMemo(() => {
    if (visibleItemsCount === itemsCount) {
      return (
        <ShowLessButton
          showLessLabel={allTexts.showLessLabel}
          showDefaultItemsAmount={showDefaultItemsAmount}
        />
      );
    }

    if (visibleItemsCount === maxToShowItems) {
      return (
        <ShowMoreButton
          getShowMoreNumber={getShowMoreNumber}
          moreLabel={allTexts.moreLabel}
          showLabel={allTexts.showLabel}
          showAdditionalItems={showAdditionalItems}
        />
      );
    }

    return (
      <S.ShowButtonsWrapper>
        <ShowMoreButton
          getShowMoreNumber={getShowMoreNumber}
          moreLabel={allTexts.moreLabel}
          showLabel={allTexts.showLabel}
          showAdditionalItems={showAdditionalItems}
        />
        <ShowLessButton
          showLessLabel={allTexts.showLessLabel}
          showDefaultItemsAmount={showDefaultItemsAmount}
        />
      </S.ShowButtonsWrapper>
    );
  }, [
    itemsCount,
    maxToShowItems,
    visibleItemsCount,
    getShowMoreNumber,
    showDefaultItemsAmount,
    showAdditionalItems,
    allTexts,
  ]);

  return visibleItemsCount !== 0 ? (
    <>
      {showDivider && <S.Divider dashed footer />}
      {(showButtons || showClearButton) && (
        <S.ContainerSpaceBetween data-testid="items-roll-footer">
          {showButtons && buttonsConfiguration}
          {showClearButton && (
            <Popconfirm
              onConfirm={onClearAll}
              icon={<S.WarningIcon component={<WarningFillM />} />}
              cancelText={allTexts.popconfirmNoLabel}
              okText={allTexts.popconfirmYesLabel}
              title={allTexts.popconfirmTitleLabel}
            >
              <S.ClearButton
                type="custom-color-ghost"
                color="red"
                mode="icon-label"
              >
                <Icon component={<CloseS />} size={22} />
                {allTexts.clearAllLabel}
              </S.ClearButton>
            </Popconfirm>
          )}
        </S.ContainerSpaceBetween>
      )}
    </>
  ) : null;
};

export default Footer;
