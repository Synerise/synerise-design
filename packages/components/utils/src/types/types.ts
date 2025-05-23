import { HTMLAttributes } from 'react';

/**
 *  Allows creating a literal string union type with auto-completion in IDEs
 */
export type LiteralStringUnion<T extends string> = T | (string & {});

/**
 *  Enforces props from one type and excludes props from the other
 */
export type ExactlyOne<T, U> = (T & { [K in keyof U]?: never }) | (U & { [K in keyof T]?: never });

export type DataAttributes = Record<`data-${string}`, string>;
export type WithHTMLAttributes<ElementType extends HTMLElement, BaseType> = BaseType &
  Omit<HTMLAttributes<ElementType>, keyof BaseType> &
  DataAttributes;

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Makes selected props of the base type required
 */
export type RequiredProps<BaseType, PropName extends keyof BaseType> = Required<Pick<BaseType, PropName>> &
  Omit<BaseType, PropName>;
