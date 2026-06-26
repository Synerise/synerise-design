import classNames from 'classnames';
import React, {
  Children,
  type ReactElement,
  cloneElement,
  isValidElement,
  useState,
} from 'react';

import { CollapseRoot } from './Collapse.styles';
import {
  type CollapseKey,
  type CollapsePanelProps,
  type CollapseProps,
} from './Collapse.types';

const toKeyArray = (key?: CollapseKey | CollapseKey[]): string[] =>
  key === null || key === undefined
    ? []
    : (Array.isArray(key) ? key : [key]).map(String);

/**
 * Resolve a panel's collapse key the way antd's `Collapse` did: use the child's React `key`, and
 * fall back to the child index when no key was provided. The sidebar's panel helpers mirror `id`
 * into the React `key` (`key={id}`), so id-based `activeKey`/`defaultActiveKey`/`onChange` keep
 * working; panels written without a key (e.g. the `WithBlock` story, `defaultActiveKey="0"`) match
 * by index, as they did under antd. `Children.toArray` (the sortable path) prefixes keys with `.$`
 * and assigns positional `.N` keys to unkeyed children — strip the former, treat the latter as
 * "no key" so the index fallback applies.
 */
const resolvePanelKey = (child: ReactElement, index: number): string => {
  const rawKey = child.key;
  if (rawKey !== null && rawKey !== undefined) {
    const key = String(rawKey);
    if (key.startsWith('.$')) {
      return key.slice(2);
    }
    if (!/^\.\d+$/.test(key)) {
      return key;
    }
  }
  return String(index);
};

/**
 * DS-native, antd-free accordion (replaces antd `Collapse`). Manages the open panel(s) by each
 * panel's `id` prop — controlled via `activeKey`, uncontrolled via `defaultActiveKey` — and clones
 * its children, injecting `isActive` / `onItemClick` / `expandIcon` / `expandIconPosition`.
 *
 * Reproduces antd's `ant-collapse*` DOM class hooks (kept for ui-tests / interim external CSS) and
 * emits `ds-sidebar-*` alongside.
 */
export const Collapse = ({
  activeKey,
  defaultActiveKey,
  onChange,
  accordion = false,
  expandIcon,
  expandIconPosition = 'start',
  className,
  children,
  ...rest
}: CollapseProps) => {
  const isControlled = activeKey !== undefined;
  const [internalKeys, setInternalKeys] = useState<string[]>(() =>
    toKeyArray(defaultActiveKey),
  );
  const activeKeys = isControlled ? toKeyArray(activeKey) : internalKeys;

  const handleItemClick = (key: string): void => {
    let next: string[];
    if (accordion) {
      next = activeKeys[0] === key ? [] : [key];
    } else {
      next = activeKeys.includes(key)
        ? activeKeys.filter((k) => k !== key)
        : [...activeKeys, key];
    }
    if (!isControlled) {
      setInternalKeys(next);
    }
    onChange?.(next);
  };

  return (
    <CollapseRoot
      className={classNames(
        'ant-collapse',
        'ds-sidebar',
        `ant-collapse-icon-position-${expandIconPosition}`,
        className,
      )}
      {...rest}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child;
        }
        const panelKey = resolvePanelKey(child, index);
        return cloneElement(child as ReactElement<CollapsePanelProps>, {
          isActive: activeKeys.includes(panelKey),
          onItemClick: () => handleItemClick(panelKey),
          expandIcon,
          expandIconPosition,
        });
      })}
    </CollapseRoot>
  );
};

export default Collapse;
