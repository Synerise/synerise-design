import { SortableContainer, SortableContainerProps } from 'react-sortable-hoc';
import * as React from 'react';
import { Expression, FilterProps, LogicType, StepType } from 'Filter.types';
import { SortableItem } from '../SortableItem';

export interface SortableListProps extends SortableContainerProps {
  expressions: Expression[];
  isActive: (id: Expression) => boolean;
  setActiveExpressionId: (id: string | null) => void;
  componentProps: (type: StepType | LogicType) => {};
  text: FilterProps['texts'];
}

// eslint-disable-next-line import/prefer-default-export
export const SortableList = SortableContainer(
  ({ expressions, isActive, setActiveExpressionId, text, componentProps }: SortableListProps) => {
    return (
      <>
        {expressions.map((expression, index) => (
          <SortableItem
            key={`item-${expression.id}`}
            index={index}
            expression={expression}
            expressionsCount={expressions.length}
            text={text}
            componentProps={componentProps}
            setActiveExpressionId={setActiveExpressionId}
            isActive={isActive}
          />
        ))}
      </>
    );
  }
);
