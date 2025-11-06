import React, {
  type HTMLProps,
  type ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from 'react';

import { useMergeRefs } from '@floating-ui/react';

import { usePopoverContext } from '../hooks/usePopoverContext';
import * as S from './PopoverTrigger.styles';

export type PopoverTriggerProps = {
  children: ReactNode;
  asChild?: boolean;
};

export const PopoverTrigger = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & PopoverTriggerProps
>(({ children, asChild = false, ...props }, propRef) => {
  const context = usePopoverContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);
  // `asChild` allows the user to pass any element as the anchor
  // if the child is a component it needs to forward the ref to a html element
  // so that the Popover can position itself correctly.
  if (asChild && isValidElement(children)) {
    const referenceProps = context.getReferenceProps({
      ref,
      'data-popover-trigger': true,
      'data-testid': `popover-${context.testId}-trigger`,
      ...props,
      ...children.props,
      'data-state': context.open ? 'open' : 'closed',
    });

    return cloneElement(children, {
      ...referenceProps,
    });
  }

  return (
    <S.Trigger
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? 'open' : 'closed'}
      data-popover-trigger
      data-testid={`popover-${context.testId}-trigger`}
      {...context.getReferenceProps(props)}
    >
      {children}
    </S.Trigger>
  );
});
