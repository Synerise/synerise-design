import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { SegmentM } from '@synerise/ds-icon';
import Card from '@synerise/ds-card';
import { useResizeObserver } from '@synerise/ds-utils';
import { RowWrapper } from '@synerise/ds-description/dist/Row/DescriptionRow.styles';
import 'rc-trigger/assets/index.less';

import * as S from './InformationCard.styles';
import { InformationCardProps } from './InformationCard.types';
import { InformationCardFooter } from './InformationCardFooter/InformationCardFooter';
import { buildIconBadge } from './InformationCard.utils';

import { InformationCardActions } from './InformationCardActions/InformationCardActions';
import { InformationCardDescription } from './InformationCardDescription/InformationCardDescription';
import { InformationCardPropertyList } from './InformationCardPropertyList/InformationCardPropertyList';
import { InformationCardSummary } from './InformationCardSummary/InformationCardSummary';

const InformationCard = forwardRef<HTMLDivElement, InformationCardProps>(
  (
    {
      actionButton,
      actionButtonTooltipText,
      actionButtonCallback,
      actionsMenu,
      asTooltip,
      avatarTooltipText,
      copyTooltip,
      copiedTooltip,
      renderFooter,
      renderBadge,
      subtitle,
      title,
      notice,
      footerText,
      icon: iconElement = <SegmentM />,
      iconColor,
      descriptionConfig,
      className,
      renderAdditionalDescription,
      propertyListItems,
      summaryItems,
      ...props
    },
    ref
  ) => {
    const [isActionsMenuVisible, setIsActionsMenuVisible] = useState(false);
    const mainSlideRef = useRef<HTMLDivElement>(null);

    const { height } = useResizeObserver(mainSlideRef);
    const copyableSlot = (content: string) =>
      content && (
        <RowWrapper copyable>
          <S.Flex style={{ backgroundColor: '', alignItems: 'center', textAlign: 'left' }}>
            <span>{content}</span>
            <S.Copyable
              copyValue={content}
              texts={{
                copyTooltip: copyTooltip ?? 'Copy to clipboard',
                copiedTooltip: copiedTooltip ?? 'Copied',
              }}
            />
          </S.Flex>
        </RowWrapper>
      );

    const hasFooter = !!(footerText || actionButton || actionsMenu);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      if (!mainSlideRef.current?.clientWidth) {
        setIsActionsMenuVisible(false);
      }
    });
    return (
      <S.InfoCardWrapper
        data-testid="information-card"
        data-popup-container
        ref={ref}
        aria-label="information card"
        className={`ds-info-card ${className}`}
        asTooltip={asTooltip}
        isActionsMenuVisible={isActionsMenuVisible}
        hasActionsMenu={!!actionsMenu}
        hasFooter={!!(renderFooter || hasFooter)}
        {...props}
      >
        <S.InfoCardSlidesWrapper>
          <S.InfoCardSlide ref={mainSlideRef}>
            <Card
              background="white"
              renderBadge={() => {
                return (
                  renderBadge !== null && (
                    <div style={{ marginRight: '16px' }}>
                      {renderBadge?.() ?? buildIconBadge({ iconElement, iconColor, avatarTooltipText })}
                    </div>
                  )
                );
              }}
              title={typeof title === 'string' ? copyableSlot(title) : title}
              description={typeof subtitle === 'string' ? copyableSlot(subtitle) : subtitle}
              headerSideChildren={undefined}
              compactHeader={false}
              withoutPadding
              lively={false}
              withHeader
            >
              {(descriptionConfig !== null || notice) && (
                <InformationCardDescription extraInformation={notice || <></>} descriptionConfig={descriptionConfig} />
              )}
              {renderAdditionalDescription && renderAdditionalDescription()}
              {propertyListItems && <InformationCardPropertyList items={propertyListItems} />}
              {summaryItems && <InformationCardSummary items={summaryItems} />}
              {(renderFooter && renderFooter()) ||
                (hasFooter && (
                  <InformationCardFooter
                    text={footerText}
                    actionButton={actionButton}
                    actionButtonCallback={actionButtonCallback}
                    actionButtonTooltipText={actionButtonTooltipText}
                    actionsMenuButtonLabel={actionsMenu?.buttonLabel}
                    actionsMenuButtonOnClick={actionsMenu ? () => setIsActionsMenuVisible(true) : undefined}
                  />
                ))}
            </Card>
          </S.InfoCardSlide>
          {actionsMenu && (
            <S.InfoCardSlide height={height}>
              <InformationCardActions
                {...actionsMenu}
                maxHeight={height}
                onHeaderClick={() => setIsActionsMenuVisible(false)}
              />
            </S.InfoCardSlide>
          )}
        </S.InfoCardSlidesWrapper>
      </S.InfoCardWrapper>
    );
  }
);

export default InformationCard;
