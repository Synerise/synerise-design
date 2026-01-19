import React, {
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Button from '@synerise/ds-button';
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
  divider = true,
  expandable,
  defaultExpanded,
  triggerType = 'expander',
  ...htmlAttributes
}: FieldSetProps) => {
  const [expanded, setExpanded] = useState(!!defaultExpanded);
  const [maxHeight, setMaxHeight] = useState<number>();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureMaxHeightRef = useRef<HTMLDivElement | null>(null);

  useResizeObserver(measureMaxHeightRef, (dimensions: DOMRect) =>
    setMaxHeight(dimensions.height),
  );

  useEffect(() => {
    containerRef.current?.scrollHeight &&
      setMaxHeight(containerRef.current?.scrollHeight);
  }, [component, button]);

  useEffect(() => {
    defaultExpanded !== undefined && setExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const headerPrefix = useMemo(() => {
    if (expandable && (!triggerType || triggerType === 'expander')) {
      return (
        <S.PrefixWrapper>
          <Button.Expander
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          />
        </S.PrefixWrapper>
      );
    }
    if (expandable && triggerType === 'switch') {
      return (
        <S.PrefixWrapper>
          <RawSwitch
            checked={expanded}
            onClick={() => setExpanded(!expanded)}
          />
        </S.PrefixWrapper>
      );
    }
    return prefix && <S.PrefixWrapper>{prefix}</S.PrefixWrapper>;
  }, [expandable, prefix, expanded, triggerType]);

  const handleTitleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      expandable && setExpanded(!expanded);
      onTitleClick && onTitleClick(event);
    },
    [onTitleClick, expandable, expanded],
  );

  const hasTitleAndDescription = Boolean(title && description);

  return (
    <S.ContainerWrapper
      className={`ds-field-set ${className}`}
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
          ref={containerRef}
          expandable={expandable}
          expanded={expandable && expanded}
          aria-hidden={expandable && !expanded}
          maxHeight={maxHeight}
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
