import { HTMLAttributes } from 'react';

/**
 *  Allows creating a literal string union type with auto-completion in IDEs
 */
export type LiteralStringUnion<T extends string> = T | (string & {});

export type WithHTMLAttributes<ElementType extends HTMLElement, BaseType> = BaseType &
  Omit<HTMLAttributes<ElementType>, keyof BaseType>;
