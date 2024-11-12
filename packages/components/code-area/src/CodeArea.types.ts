import type { CSSProperties, ReactNode } from 'react';
import { MonacoEditorProps } from 'react-monaco-editor';
import { TooltipProps } from 'antd/lib/tooltip';
import TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';

export type CodeAreaSyntax = 'json' | 'html' | 'css' | 'typescript' | 'javascript' | string;

export type CodeAreaSyntaxOption<SyntaxName extends CodeAreaSyntax = CodeAreaSyntax> = {
  language: SyntaxName;
  label?: string;
};

export type CodeAreaTexts = {
  fullscreen: ReactNode;
  closeFullscreen: ReactNode;
  fullscreenTitle: ReactNode;
};

export type CodeAreaProps<SyntaxName extends CodeAreaSyntax = CodeAreaSyntax> = Omit<MonacoEditorProps, 'language'> & {
  label?: ReactNode;
  fullscreenLabel?: ReactNode;
  description?: ReactNode;
  texts?: Partial<CodeAreaTexts>;
  counter?: {
    limit: number;
    placement?: 'bottom' | 'top';
  };
  errorText?: ReactNode;
  syntaxOptions?: CodeAreaSyntaxOption<SyntaxName>[];
  currentSyntax: SyntaxName;
  allowFullscreen?: boolean;
  readOnly?: boolean;
  tooltip?: ReactNode;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  tooltipProps?: TooltipExtendedProps & TooltipProps;
  style?: CSSProperties;
  zIndex?: string | number;
  className?: string;
  renderFooterContent?: (props: { isFullscreen?: boolean; count?: number; isValid?: boolean }) => ReactNode;
  renderAdditionalDescription?: (props: { isFullscreen?: boolean; count?: number; isValid?: boolean }) => ReactNode;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  onSyntaxChange?: (newSyntax: SyntaxName) => void;
};

export type CodeAreaEditorProps<SyntaxName extends CodeAreaSyntax = CodeAreaSyntax> = CodeAreaProps<SyntaxName> & {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
};
