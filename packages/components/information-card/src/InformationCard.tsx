import * as React from 'react';
import { Text } from '@synerise/ds-typography';
import Button from '@synerise/ds-button';
import Divider from '@synerise/ds-divider';
import Icon, { ArrowRuCircleM, IconProps, SegmentM } from '@synerise/ds-icon/dist/cjs';
import Avatar, { ObjectAvatar } from '@synerise/ds-avatar';
import Card from '@synerise/ds-card';
import SubtleForm from '@synerise/ds-subtle-form';
import Tooltip from '@synerise/ds-tooltip';
import { TooltipProps, tooltipTypes } from '@synerise/ds-tooltip/dist/Tooltip.types';
import Copy from '@synerise/ds-description/dist/Row/Copy';
import { InlineAlertType } from '@synerise/ds-alert/dist/InlineAlert/InlineAlert.types';
import { SubtleTextAreaProps } from '@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types';
import { RowWrapper } from '@synerise/ds-description/dist/Row/DescriptionRow.styles';
import { Color, ObjectAvatarProps, Size } from '@synerise/ds-avatar/dist/Avatar.types';
import Badge from '@synerise/ds-badge';
import Alert from '@synerise/ds-alert';

import * as S from './InformationCard.styles';
import 'rc-trigger/assets/index.less';

export type BadgeData = {
  type?: string;
  title?: string;
  name?: string;
  iconColor?: Color | IconProps['color'];
  iconElement?: InformationCardProps['icon'];
  iconSize?: Size | string;
  avatarTooltipText?: string;
};

/**
 * Custom builder for badgeSlots with icon
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
  actionButtonTooltipText?: string;
  /**
   * description in a tooltip shown when user (note renderBadge has to be provided)
   */
  avatarTooltipText?: string;
  /**
   * content of the tooltip, it defaults to `SubtleForm.TextArea`
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
  subtitle: string;
  /**
   * Title of the information-card. Can be copied.
   */
  title: string;
};

function renderChildren(
  renderChild: InformationCardProps['children'],
  descriptionConfig: InformationCardProps['descriptionConfig']
): JSX.Element | React.ReactNode {
  if (typeof renderChild === 'function') {
    return renderChild(descriptionConfig);
  }
  return renderChild;
}

const InformationCard = React.forwardRef<HTMLDivElement, InformationCardProps>(
  (
    {
      actionButton,
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
    },
    ref
  ): JSX.Element => {
    const copyableSlot = (content: string): JSX.Element => (
      <RowWrapper copyable>
        <S.Flex style={{ backgroundColor: '', alignItems: 'center' }}>
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
    const cachedChildren = React.useMemo(
      () => renderChildren(children, descriptionConfig),
      [children, descriptionConfig]
    );
    return (
      <S.InfoCardWrapper ref={ref} aria-label="information card">
        <Card
          background="white"
          renderBadge={(): React.ReactNode =>
            renderBadge !== null && (
              <div style={{ marginRight: '16px' }}>
                {renderBadge?.call(null) ?? buildIconBadge({ iconElement, iconColor, avatarTooltipText })}
              </div>
            )
          }
          title={title ? copyableSlot(title) : <></>}
          description={subtitle ? copyableSlot(subtitle) : <></>}
          headerSideChildren={undefined}
          compactHeader={false}
          withoutPadding
          lively={false}
          withHeader
          className={cachedChildren ? 'custom-description' : ''}
        >
          {(cachedChildren || descriptionConfig !== null || notice) && (
            <DescriptionField extraInformation={notice || <></>} descriptionConfig={descriptionConfig} />
          )}
          {(renderFooter && renderFooter()) ||
            ((footerText || actionButton) && (
              <Footer
                text={footerText}
                {...props}
                actionButton={actionButton}
                actionButtonTooltipText={actionButtonTooltipText}
                isCustomDescription={cachedChildren !== undefined}
              />
            ))}
        </Card>
      </S.InfoCardWrapper>
    );
  }
);

export function buildInitialsBadge(name: string): JSX.Element {
  return <Initials name={name} />;
}

/**
 * helper for wrapping a notice
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

type InitialsProps = React.PropsWithChildren<{
  name?: string;
}>;

/**
 * Wrapper for obtaining an avatar based on initials
 */
export function Initials({ name, children }: InitialsProps): JSX.Element {
  return (
    <Badge>
      <Avatar size="medium" shape="circle" backgroundColor="blue">
        {(name && getInitials(name)) || children}
      </Avatar>
    </Badge>
  );
}

type DescriptionFieldProps = {
  extraInformation?: React.ReactNode;
  descriptionConfig?: SubtleTextAreaProps | null;
};

/**
 * Returns default information card's description section.
 */
function DescriptionField({ extraInformation = undefined, descriptionConfig }: DescriptionFieldProps): JSX.Element {
  // note: if popover containing this information card will have
  // `destroyTooltipOnHide` (or `keepParent`) set to false, then description state hook will be getting reset
  const [description, setDescription] = React.useState<string>('');

  return (
    <div className="information-card-description">
      {extraInformation}
      {descriptionConfig && (
        <SubtleForm.TextArea
          minRows={1}
          value={description}
          // hideLabel
          onChange={(v): void => {
            descriptionConfig.onChange && descriptionConfig.onChange(v);
            setDescription(v);
          }}
          placeholder="placeholer"
          label="Label"
          labelTooltip="label tooltip"
          suffixTooltip="Edit"
          {...descriptionConfig}
          {...(descriptionConfig.error
            ? {
                error: descriptionConfig.error,
                errorText: (isErr: boolean, text: string): string => (isErr ? text : ''),
              }
            : {})}
          disabled={descriptionConfig.disabled}
        />
      )}
    </div>
  );
}

/**
 * Tooltip helper for action button in footer
 */
function withTooltip(
  Component: React.ReactNode,
  actionButtonTooltipText: string,
  props?: Omit<TooltipProps, 'tooltipTypes'>
): JSX.Element {
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
  actionButtonTooltipText = '',
  text = '',
  isCustomDescription,
}: { text: InformationCardProps['footerText']; isCustomDescription: boolean } & Pick<
  InformationCardProps,
  'actionButton' | 'actionButtonTooltipText' | 'actionButtonTooltipText'
>): JSX.Element {
  return (
    <>
      <Divider marginTop={isCustomDescription ? 16 : 8} marginBottom={0} dashed />
      <S.Flex style={{ alignItems: 'center' }}>
        <S.FlexGrow>{text && <Text size="xsmall">{text}</Text>}</S.FlexGrow>
        <S.ActionButtonContainer>
          {(actionButton &&
            actionButton === true &&
            withTooltip(
              <Button color="grey" type="secondary" mode="single-icon">
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
