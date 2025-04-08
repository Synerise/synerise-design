import type monaco from 'monaco-editor/esm/vs/editor/editor.api';
import type { EditorProps, loader } from '@monaco-editor/react';
import type { ReactNode, CSSProperties } from 'react';
import type { TooltipProps } from 'antd/lib/tooltip';
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

export type CodeAreaCommonProps<SyntaxName extends CodeAreaSyntax = CodeAreaSyntax> = Omit<
  EditorProps,
  'language' | 'height'
> & {
  label?: ReactNode;
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
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  value?: string;
  defaultValue?: string;
  readOnly?: boolean;
  tooltip?: ReactNode;
  tooltipProps?: TooltipExtendedProps & TooltipProps;
  style?: CSSProperties;
  zIndex?: string | number;
  /**
   * Height of the editor wrapper
   */
  height?: string | number;
  className?: string;
  renderFooterContent?: (props: { isFullscreen?: boolean; count?: number; isValid?: boolean }) => ReactNode;
  onSyntaxChange?: (newSyntax: SyntaxName) => void;
  loaderConfig?: Parameters<typeof loader.config>[0];
};

export type CodeAreaEditorProps<SyntaxName extends CodeAreaSyntax = CodeAreaSyntax> =
  CodeAreaCommonProps<SyntaxName> & {
    fullscreenLabel?: ReactNode;
    renderAdditionalDescription?: (props: { isFullscreen?: boolean; count?: number; isValid?: boolean }) => ReactNode;
  };

export type CodeAreaProps<SyntaxName extends CodeAreaSyntax = CodeAreaSyntax> = Omit<
  CodeAreaEditorProps<SyntaxName>,
  'toggleFullscreen' | 'isFullscreen'
> & {
  onFullscreenChange?: (isFullscreen: boolean) => void;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
};

export type CodeAreaEditorRawProps<SyntaxName extends CodeAreaSyntax = CodeAreaSyntax> =
  CodeAreaCommonProps<SyntaxName> & {
    isValid: boolean;
    isSyntaxSelectVisible?: boolean;
    onDidChangeMarkers?: (markers: monaco.editor.IMarker[]) => void;
    counterLimit?: number;
    count?: number;
  };
