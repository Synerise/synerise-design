import * as React from 'react';
import { MonacoEditorProps } from 'react-monaco-editor';

export type CodeAreaProps = MonacoEditorProps & {
  onChangeDebounced: boolean;
  onChangeDebouncedWait: number;
  theme: Record<string, string>;
  description?: React.ReactNode;
  label?: React.ReactNode;
  error?: boolean;
  errorText?: React.ReactNode;
};

type CommandType = {
  id: string;
};

type Node<E> = {
  element: E;
  next: Node<E>;
};

export type LinkedList<E> = {
  _first: Node<E>;
  _remove: (node: Node<E>) => void;
};

export type MenuId = {
  _debugName: string;
};

type ElementType = {
  command?: CommandType;
};

export type MenuLinkElement = {
  element: ElementType;
  next: MenuLinkElement;
  command: CommandType;
};
