import React, {
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Expander } from '@synerise/ds-button';
import { RawSwitch } from '@synerise/ds-switch';
import { useResizeObserver } from '@synerise/ds-utils';

import * as S from './FieldSet.styles';
import { type FieldSetProps } from './FieldSet.types';

const FieldSet = ({
  className,
  prefix,
  title,
  description,
  component,
  button,
  onTitleClick,
  onExpandChange,
  divider = true,
  expandable,
  defaultExpanded,
  triggerType = 'expander',
  ...htmlAttributes
}: FieldSetProps) => {
  const [expanded, setExpanded] = useState(!!defaultExpanded);
  const [maxHeight, setMaxHeight] = useState<number>();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const measureMaxHeightRef = useRef<HTMLDivElement | null>(null);

  useResizeObserver(measureMaxHeightRef, (dimensions: DOMRect) => {
    setMaxHeight(dimensions.height);
  });

  useEffect(() => {
    defaultExpanded !== undefined && setExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const handleTransitionEnd = useCallback(() => {
    setShouldAnimate(false);
  }, []);

  const handleExpandedClick = useCallback(() => {
    if (!expandable) {
      return;
    }
    setShouldAnimate(true);
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onExpandChange?.(newExpanded);
  }, [expandable, onExpandChange, expanded]);

  const headerPrefix = useMemo(() => {
    if (expandable && (!triggerType || triggerType === 'expander')) {
      return (
        <S.PrefixWrapper>
          <Expander expanded={expanded} onClick={handleExpandedClick} />
        </S.PrefixWrapper>
      );
    }
    if (expandable && triggerType === 'switch') {
      return (
        <S.PrefixWrapper>
          <RawSwitch checked={expanded} onClick={handleExpandedClick} />
        </S.PrefixWrapper>
      );
    }
    return prefix && <S.PrefixWrapper>{prefix}</S.PrefixWrapper>;
  }, [expandable, prefix, expanded, triggerType, handleExpandedClick]);

  const handleTitleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      handleExpandedClick();
      onTitleClick && onTitleClick(event);
    },
    [handleExpandedClick, onTitleClick],
  );

  const hasTitleAndDescription = Boolean(title && description);

  return (
    <S.ContainerWrapper
      className={`ds-field-set ${className ?? ''}`}
      {...htmlAttributes}
    >
      <S.HeaderWrapper topAlign={Boolean(hasTitleAndDescription)}>
        {headerPrefix}
        <S.FieldSetTitle>
          {title && (
            <S.Title
              onClick={handleTitleClick}
              isClickable={Boolean(onTitleClick || expandable)}
              description={Boolean(description)}
            >
              {title}
            </S.Title>
          )}
          {description && <S.Description>{description}</S.Description>}
        </S.FieldSetTitle>
      </S.HeaderWrapper>
      {divider && <S.StyledDivider />}
      {(component || button) && (
        <S.CollapsibleContent
          data-testid="field-set-collapsible"
          expandable={expandable}
          expanded={expandable && expanded}
          aria-hidden={expandable && !expanded}
          maxHeight={maxHeight}
          shouldAnimate={shouldAnimate}
          onTransitionEnd={handleTransitionEnd}
        >
          <S.CollapsibleContentInner ref={measureMaxHeightRef}>
            {component && <S.ComponentWrapper>{component}</S.ComponentWrapper>}
            {button && <S.ActionButton>{button}</S.ActionButton>}
          </S.CollapsibleContentInner>
        </S.CollapsibleContent>
      )}
    </S.ContainerWrapper>
  );
};
export default FieldSet;
