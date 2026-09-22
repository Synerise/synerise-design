import React, { forwardRef } from 'react';
import { useIntl } from 'react-intl';

import Icon, { CloseS } from '@synerise/ds-icon';

import { CONDITION_REMOVE_CLASS } from '../../constants';
import { RemoveButton } from './ConditionRemove.styles';
import type { ConditionRemoveProps } from './ConditionRemove.types';

/**
 * The remove (✕) control for a condition row. Revealed when the enclosing `ConditionRow` is
 * hovered or focused by default; set `revealOnRowHover={false}` to keep it always visible.
 *
 * The icon carries no text, so the accessible name comes from `aria-label` — translated, since a
 * consuming app renders this in the user's locale. Pass `aria-label` to override it.
 */
export const ConditionRemove = forwardRef<
  HTMLButtonElement,
  ConditionRemoveProps
>(
  (
    {
      onClick,
      revealOnRowHover = true,
      disabled = false,
      'aria-label': ariaLabel,
      className,
      ...rest
    },
    ref,
  ) => {
    const intl = useIntl();

    return (
      <RemoveButton
        ref={ref}
        $reveal={revealOnRowHover}
        onClick={onClick}
        disabled={disabled}
        aria-label={
          ariaLabel ??
          intl.formatMessage({
            id: 'DS.CONDITION-BLOCKS.REMOVE',
            defaultMessage: 'Remove',
          })
        }
        className={[CONDITION_REMOVE_CLASS, className]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        <Icon component={<CloseS />} />
      </RemoveButton>
    );
  },
);

ConditionRemove.displayName = 'ConditionRemove';
