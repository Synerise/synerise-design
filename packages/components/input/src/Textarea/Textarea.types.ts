import { type ResizeProperty } from 'csstype';
import type { CSSProperties, ReactNode, TextareaHTMLAttributes } from 'react';

export type AutoSizeType = boolean | { minRows?: number; maxRows?: number };

export type RawTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Auto-grow height to fit content. `true` grows freely; object bounds it by rows. */
  autoSize?: AutoSizeType;
  error?: boolean;
  errorText?: string | ReactNode;
  wrapperStyle?: CSSProperties;
  resize?: ResizeProperty;
};

/**
 * @deprecated Use RawTextAreaProps instead.
 */
export type TextAreaProps = RawTextAreaProps;
