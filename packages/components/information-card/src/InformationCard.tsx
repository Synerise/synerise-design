import * as React from 'react';
import { Text } from '@synerise/ds-typography';
import Divider from '@synerise/ds-divider';
import Button from '@synerise/ds-button';
import Icon, { ArrowRuCircleM, IconProps, SegmentM } from '@synerise/ds-icon/dist/cjs';
import Avatar, { ObjectAvatar } from '@synerise/ds-avatar';
import Card from '@synerise/ds-card';
import SubtleForm from '@synerise/ds-subtle-form';
import Tooltip from '@synerise/ds-tooltip';
import { tooltipTypes } from '@synerise/ds-tooltip/dist/Tooltip.types';
import Copy from '@synerise/ds-description/dist/Row/Copy';
import { InlineAlertType } from '@synerise/ds-alert/dist/InlineAlert/InlineAlert.types';
import { SubtleTextAreaProps } from '@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types';
import { RowWrapper } from '@synerise/ds-description/dist/Row/DescriptionRow.styles';
import { Color, ObjectAvatarProps, Size } from '@synerise/ds-avatar/dist/Avatar.types';
import Badge from '@synerise/ds-badge';
import Alert from '@synerise/ds-alert';

import * as S from './InformationCard.styles';

/**
 * custom builder for badgeSlots with icon
 */
export function buildIconBadge(data: BadgeData): JSX.Element {
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

export type InformationCardProps = {
  /**
   * custom jsx element for rendering in action button (bottom-right)
   */
  actionButton?: boolean | (() => React.ReactNode);
  /**
   * default action button tooltip
   */
  actionButtonText?: string;
  /**
   * action button tooltip type (title and a scription is needed)
   */
  actionButtonTooltipType?: tooltipTypes;
  /**
   * additional line (subtitle) in action button's tooltip
   */
  actionButtonTooltipText?: string;
  /**
   * description in a tooltip shown when user (note renderBadge has to be provided)
   */
  avatarTooltipText?: string;
  /**
   * content of the tooltip, by default it's a `SubtleForm.TextArea`
   */
  children?: React.ReactNode | ((props?: SubtleTextAreaProps | null) => React.ReactNode);
  /**
   * subtitle's value to be copied when clicking on the copy button
   */
  copyTooltip?: string;
  /**
   * feedback to the user once information card's subtitle has been copied
   */
  copiedTooltip?: string;
  /**
   * when information-card's `children` prop is not provided,
   * `defaultTextAreaProps` can be used to parametrize default textarea
   */
  descriptionConfig?: SubtleTextAreaProps | null | undefined;
  /**
   * render prop for rendering the bottom part of (by default section with a small text and an optional action button on the right)
   */
  renderFooter?: () => JSX.Element;
  /**
   * additional feedback info to the user, when set to null - footer is hidden
   */
  footerText?: string | React.ReactNode | null;
  /**
   * icon (note this needs to be pure SVG icon, it relies on `buildBadgeIcon` helper)
   */
  icon?: React.ReactNode;
  /**
   * icon color to be applied to `icon` element
   */
  iconColor?: string;
  /**
   * additional information shown between subtitle and description section.
   * Can be used for warnings, errors, destructive actions, notices. See `buildExtraInfo` and alert `level` there.
   */
  notice?: string | React.ReactNode;
  /**
   * Custom render prop for displaying. If set to `null` - badge won't be shown.
   */
  renderBadge?: Function | null;
  /**
   * Second line. Required prop. Can be copied.
   */
  subtitle: string | React.ReactNode;
  /**
   * First line in the information-card (bolded)
   */
  title: string | React.ReactNode;
};

export type BadgeData = {
  type?: string;
  title?: string;
  name?: string;
  iconColor?: Color | IconProps['color'];
  iconElement?: InformationCardProps['icon'];
  iconSize?: Size | string;
  avatarTooltipText?: string;
};

const InformationCard: React.FC<InformationCardProps> = ({
  actionButton,
  actionButtonText,
  actionButtonTooltipType,
  actionButtonTooltipText,
  avatarTooltipText,
  children,
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
  ...props
}): JSX.Element => {
  const subtitleSlot = (
    <RowWrapper copyable>
      <S.Flex style={{ backgroundColor: '', alignItems: 'center' }}>
        <span>{subtitle}</span>
        <Copy
          copyValue={(subtitle as unknown) as string}
          texts={{
            copyTooltip: copyTooltip ?? 'Copy to clipboard',
            copiedTooltip: copiedTooltip ?? 'Copied',
          }}
        />
      </S.Flex>
    </RowWrapper>
  );
  const anyChildrenToRender = (typeof children === 'function' && children(descriptionConfig)) || children;
  return (
    <S.InfoCardWrapper aria-label="information card">
      <Card
        background="white"
        badgeSlot={
          renderBadge !== null && (
            <div style={{ marginRight: '16px' }}>
              {renderBadge?.call(null) ?? buildIconBadge({ iconElement, iconColor, avatarTooltipText })}
            </div>
          )
        }
        title={title}
        description={subtitle ? subtitleSlot : <></>}
        headerSideChildren={undefined}
        compactHeader={false}
        withoutPadding
        lively={false}
        withHeader
      >
        {anyChildrenToRender ||
          (descriptionConfig !== null && (
            <DescriptionField extraInformation={notice || <></>} {...descriptionConfig} />
          ))}
        {(renderFooter && renderFooter()) ||
          (footerText && (
            <Footer
              text={footerText}
              {...props}
              actionButton={actionButton}
              actionButtonText={actionButtonText}
              actionButtonTooltipType={actionButtonTooltipType}
              actionButtonTooltipText={actionButtonTooltipText}
            />
          ))}
      </Card>
    </S.InfoCardWrapper>
  );
};

export function buildInitialsBadge(name: string): JSX.Element {
  return <Initials name={name} />;
}

/**
 * helper for wrapping notice
 */
export function buildExtraInfo(message: string, level?: InlineAlertType): JSX.Element {
  return (
    <S.ExtraInfo>
      <Alert.InlineAlert type={level || 'warning'} message={message} />
    </S.ExtraInfo>
  );
}

/**
 * Helper for returning initials. Handles cases such as John Smith, J. Smith, JS.
 */
export function getInitials(name: string): string {
  const hasTokens = name.indexOf(' ') !== -1;
  return name.substring(0, hasTokens ? 1 : 2) + (hasTokens ? name.charAt(name.lastIndexOf(' ') + 1) : '');
}

/**
 * Wrapper for obtaining an avatar based on initials
 */
export function Initials({ name, children }: { name?: string; children?: any }): JSX.Element {
  return (
    <Badge>
      <Avatar size="medium" shape="circle" backgroundColor="blue">
        {(name && getInitials(name)) || children}
      </Avatar>
    </Badge>
  );
}

/**
 * Returns default information card's description section.
 */
function DescriptionField({
  extraInformation = undefined,
  descriptionHook,
  error,
  disabled,
  ...props
}: Record<string, any> & SubtleTextAreaProps): JSX.Element {
  const [description, setDescription] = descriptionHook ?? React.useState<string>();
  return (
    <div>
      {extraInformation}
      <SubtleForm.TextArea
        minRows={1}
        value={description}
        hideLabel
        onChange={setDescription}
        placeholder="placeholer"
        label="Label"
        labelTooltip="label tooltip"
        suffixTooltip="Edit"
        {...props}
        {...(error
          ? {
              error,
              errorText: (isErr: boolean, text: string): string => (isErr ? text : ''),
            }
          : {})}
        disabled={disabled}
      />
    </div>
  );
}

/**
 * Tooltip helper for action button in footer
 */
function withTooltip(
  Component: React.ReactNode,
  actionButtonText: string,
  actionButtonTooltipText: string,
  tooltipType: tooltipTypes,
  props?: any
): JSX.Element {
  // type is related to ds-tooltip's: shouldRenderDescription (it makes use of description prop only if tooltip type!=='default')
  return (
    <Tooltip
      type={actionButtonTooltipText ? tooltipType : 'default'}
      title={actionButtonText}
      {...(actionButtonTooltipText && tooltipType === 'header-label' ? { description: actionButtonTooltipText } : {})}
      {...props}
    >
      {Component}
    </Tooltip>
  );
}

/**
 * Renders footer part including handling action button with optional tooltip
 */
function Footer({
  actionButton = false,
  actionButtonText = '',
  actionButtonTooltipText = '',
  actionButtonTooltipType = 'header-label',
  text = '',
}: { text: InformationCardProps['footerText'] } & Pick<
  InformationCardProps,
  'actionButton' | 'actionButtonText' | 'actionButtonTooltipText' | 'actionButtonTooltipType'
>): JSX.Element {
  return (
    <>
      <Divider dashed marginTop={16} marginBottom={16} />
      <S.Flex style={{ alignItems: 'center' }}>
        <S.FlexGrow1>
          <Text size="xsmall">{text}</Text>
        </S.FlexGrow1>
        {(actionButton &&
          actionButton === true &&
          withTooltip(
            <Button color="grey" type="secondary" mode="single-icon">
              <ArrowRuCircleM />
            </Button>,
            actionButtonText,
            actionButtonTooltipText,
            actionButtonTooltipType
          )) ||
          (typeof actionButton === 'function' && actionButton())}
      </S.Flex>
    </>
  );
}

export default InformationCard;
