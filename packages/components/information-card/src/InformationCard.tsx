import React, { forwardRef, PropsWithChildren, useState, ReactNode } from 'react';

import { Text } from '@synerise/ds-typography';
import Button from '@synerise/ds-button';
import Divider from '@synerise/ds-divider';
import Icon, { ArrowRuCircleM, SegmentM } from '@synerise/ds-icon';
import Avatar, { ObjectAvatar } from '@synerise/ds-avatar';
import Card from '@synerise/ds-card';
import SubtleForm from '@synerise/ds-subtle-form';
import Tooltip from '@synerise/ds-tooltip';
import { TooltipProps, tooltipTypes } from '@synerise/ds-tooltip/dist/Tooltip.types';
import Copy from '@synerise/ds-description/dist/Row/Copy';
import { InlineAlertType } from '@synerise/ds-alert/dist/InlineAlert/InlineAlert.types';
import { SubtleTextAreaProps } from '@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types';
import { RowWrapper } from '@synerise/ds-description/dist/Row/DescriptionRow.styles';
import { Color, ObjectAvatarProps } from '@synerise/ds-avatar/dist/Avatar.types';
import Badge from '@synerise/ds-badge';
import Alert from '@synerise/ds-alert';

import * as S from './InformationCard.styles';
import { InformationCardProps, BadgeData } from './InformationCard.types';

import 'rc-trigger/assets/index.less';

/**
 * Custom builder for badgeSlots with icon
 */
export function buildIconBadge(data: BadgeData) {
  const avatarExtra = { object: {} as ObjectAvatarProps['object'] };
  if (data.avatarTooltipText) {
    avatarExtra.object = {
      description: data.avatarTooltipText,
    };
  }
  return (
    <ObjectAvatar
      {...avatarExtra}
      color={data.iconColor as Color}
      iconComponent={<Icon component={data.iconElement} />}
    />
  );
}

const InformationCard = forwardRef<HTMLDivElement, InformationCardProps>(
  (
    {
      actionButton,
      actionButtonTooltipText,
      actionButtonCallback,
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
      ...props
    },
    ref
  ) => {
    const copyableSlot = (content: string) => (
      <RowWrapper copyable>
        <S.Flex style={{ backgroundColor: '', alignItems: 'center', textAlign: 'left' }}>
          <span>{content}</span>
          <Copy
            copyValue={content}
            texts={{
              copyTooltip: copyTooltip ?? 'Copy to clipboard',
              copiedTooltip: copiedTooltip ?? 'Copied',
            }}
          />
        </S.Flex>
      </RowWrapper>
    );

    return (
      <S.InfoCardWrapper
        data-testid="information-card"
        ref={ref}
        aria-label="information card"
        className={`ds-info-card ${className}`}
        asTooltip={asTooltip}
      >
        <Card
          background="white"
          // @ts-ignore
          renderBadge={() => {
            return (
              renderBadge !== null && (
                <div style={{ marginRight: '16px' }}>
                  {renderBadge?.() ?? buildIconBadge({ iconElement, iconColor, avatarTooltipText })}
                </div>
              )
            );
          }}
          title={title ? copyableSlot(title) : <></>}
          description={subtitle ? copyableSlot(subtitle) : <></>}
          headerSideChildren={undefined}
          compactHeader={false}
          withoutPadding
          lively={false}
          withHeader
        >
          {(descriptionConfig !== null || notice) && (
            <DescriptionField extraInformation={notice || <></>} descriptionConfig={descriptionConfig} />
          )}
          {renderAdditionalDescription && renderAdditionalDescription()}
          {(renderFooter && renderFooter()) ||
            ((footerText || actionButton) && (
              <Footer
                text={footerText}
                {...props}
                actionButton={actionButton}
                actionButtonCallback={actionButtonCallback}
                actionButtonTooltipText={actionButtonTooltipText}
              />
            ))}
        </Card>
      </S.InfoCardWrapper>
    );
  }
);

export function buildInitialsBadge(name: string) {
  return <Initials name={name} />;
}

/**
 * helper for wrapping a notice
 */
export function buildExtraInfo(message: string, level?: InlineAlertType) {
  return (
    <S.ExtraInfo>
      <Alert.InlineAlert type={level || 'warning'} message={message} />
    </S.ExtraInfo>
  );
}

/**
 * Helper for returning initials. Handles cases such as John Smith, J. Smith, JS.
 */
export function getInitials(name: string) {
  const hasTokens = name.indexOf(' ') !== -1;
  return name.substring(0, hasTokens ? 1 : 2) + (hasTokens ? name.charAt(name.lastIndexOf(' ') + 1) : '');
}

type InitialsProps = PropsWithChildren<{
  name?: string;
}>;

/**
 * Wrapper for obtaining an avatar based on initials
 */
export function Initials({ name, children }: InitialsProps) {
  return (
    <Badge>
      <Avatar size="medium" shape="circle" backgroundColor="blue">
        {(name && getInitials(name)) || children}
      </Avatar>
    </Badge>
  );
}

type DescriptionFieldProps = {
  extraInformation?: ReactNode;
  descriptionConfig?: SubtleTextAreaProps | string | null;
};

/**
 * Returns default information card's description section.
 */
function DescriptionField({ extraInformation = undefined, descriptionConfig }: DescriptionFieldProps) {
  // note: if popover containing this information card will have
  // `destroyTooltipOnHide` (or `keepParent`) set to false, then description state hook will be getting reset
  const [description, setDescription] = useState<string>('');
  const renderDescription = () => {
    if (descriptionConfig) {
      return typeof descriptionConfig === 'string' ? (
        <S.NonEditableWrapper>{descriptionConfig}</S.NonEditableWrapper>
      ) : (
        <SubtleForm.TextArea
          minRows={1}
          value={description}
          onChange={value => {
            descriptionConfig.onChange && descriptionConfig.onChange(value);
            setDescription(value);
          }}
          placeholder="placeholder"
          suffixTooltip="Edit"
          {...descriptionConfig}
          {...(descriptionConfig.error
            ? {
                error: descriptionConfig.error,
                errorText: (isErr: boolean, text: string) => (isErr ? text : ''),
              }
            : {})}
          disabled={descriptionConfig.disabled}
        />
      );
    }
    return <></>;
  };

  return (
    <S.DescriptionWrapper data-testid="information-card-description">
      <S.AlertWrapper>{extraInformation}</S.AlertWrapper>
      {descriptionConfig && renderDescription()}
    </S.DescriptionWrapper>
  );
}

/**
 * Tooltip helper for action button in footer
 */
function withTooltip(
  Component: ReactNode,
  actionButtonTooltipText: string,
  props?: Omit<TooltipProps, 'tooltipTypes'>
) {
  // type is related to ds-tooltip's: shouldRenderDescription (it makes use of description prop only if tooltip type!=='default')
  return (
    <Tooltip type={'default' as tooltipTypes} title={actionButtonTooltipText} {...props}>
      {Component}
    </Tooltip>
  );
}

/**
 * Renders footer part including handling action button with an optional tooltip
 */
function Footer({
  actionButton = false,
  actionButtonCallback,
  actionButtonTooltipText = '',
  text = '',
}: { text: InformationCardProps['footerText'] } & Pick<
  InformationCardProps,
  'actionButton' | 'actionButtonTooltipText' | 'actionButtonTooltipText' | 'actionButtonCallback'
>) {
  return (
    <>
      <Divider marginTop={8} marginBottom={0} dashed />
      <S.Flex data-testid="information-card-footer" style={{ alignItems: 'center' }}>
        <S.FlexGrow>{text && <Text size="xsmall">{text}</Text>}</S.FlexGrow>
        <S.ActionButtonContainer>
          {(actionButton &&
            actionButton === true &&
            withTooltip(
              <Button color="grey" type="secondary" mode="single-icon" onClick={actionButtonCallback}>
                <ArrowRuCircleM />
              </Button>,
              actionButtonTooltipText
            )) ||
            (typeof actionButton === 'function' && actionButton())}
        </S.ActionButtonContainer>
      </S.Flex>
    </>
  );
}

export default InformationCard;
