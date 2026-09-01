import { Children, type ReactNode, isValidElement } from 'react';

/** Depth cap for the structural walk — deeper trees simply report "changed". */
const MAX_DEPTH = 6;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  Object.getPrototypeOf(value) === Object.prototype;

/**
 * Structural equality for the values that can appear in `<Select.Option>` props.
 *
 * JSX rebuilds every element — and every inline `style` object — on each parent
 * render, so reference equality would always report a change. Anything the walk
 * does not understand (functions, class instances) falls back to `Object.is`,
 * which errs towards "changed": a wasted re-derive, never a stale option list.
 */
const isEqualValue = (a: unknown, b: unknown, depth: number): boolean => {
  if (Object.is(a, b)) {
    return true;
  }
  if (depth >= MAX_DEPTH) {
    return false;
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((item, index) => isEqualValue(item, b[index], depth + 1))
    );
  }
  if (isValidElement(a) || isValidElement(b)) {
    return (
      isValidElement(a) &&
      isValidElement(b) &&
      a.type === b.type &&
      a.key === b.key &&
      isEqualValue(a.props, b.props, depth + 1)
    );
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    return (
      keysA.length === keysB.length &&
      keysA.every(
        (key) =>
          Object.prototype.hasOwnProperty.call(b, key) &&
          isEqualValue(a[key], b[key], depth + 1),
      )
    );
  }
  return false;
};

/**
 * True when two `children` node lists describe the same `<Select.Option>` set.
 * Lets the option list keep its identity across a parent re-render that did not
 * actually change the options (see `useSelectOptions`).
 */
export const areOptionChildrenEqual = (a: ReactNode, b: ReactNode): boolean => {
  const listA = Children.toArray(a);
  const listB = Children.toArray(b);
  return (
    listA.length === listB.length &&
    listA.every((child, index) => isEqualValue(child, listB[index], 0))
  );
};
