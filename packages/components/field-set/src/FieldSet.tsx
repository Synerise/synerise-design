import React, { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Divider from '@synerise/ds-divider';
import Button from '@synerise/ds-button';
import * as S from './FieldSet.styles';
import { FieldSetProps } from './FieldSet.types';

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
  ...htmlAttributes
}: FieldSetProps) => {
  const [expanded, setExpanded] = useState(!!defaultExpanded);
  const [maxHeight, setMaxHeight] = useState<number>();

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollHeight && setMaxHeight(containerRef.current?.scrollHeight);
  }, [component, button]);

  useEffect(() => {
    defaultExpanded !== undefined && setExpanded(defaultExpanded);
  }, [defaultExpanded]);

  const headerPrefix = useMemo(() => {
    if (expandable) {
      return (
        <S.ButtonWrapper>
          <S.ExpanderWrapper description={!!description}>
            <Button.Expander expanded={expanded} onClick={() => setExpanded(!expanded)} />
          </S.ExpanderWrapper>
        </S.ButtonWrapper>
      );
    }
    return prefix && <S.ButtonWrapper>{prefix}</S.ButtonWrapper>;
  }, [expandable, prefix, description, expanded]);

  const handleTitleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      expandable && setExpanded(!expanded);
      onTitleClick && onTitleClick(event);
    },
    [onTitleClick, expandable, expanded]
  );

  return (
    <S.ContainerWrapper className={`ds-field-set ${className}`} {...htmlAttributes}>
      <S.HeaderWrapper>
        {headerPrefix}
        <S.FieldSetTitle description={Boolean(description)}>
          <S.Title
            onClick={handleTitleClick}
            isClickable={Boolean(onTitleClick || expandable)}
            description={Boolean(description)}
          >
            {title}
          </S.Title>
          <S.Description>{description}</S.Description>
        </S.FieldSetTitle>
      </S.HeaderWrapper>
      {divider && <Divider />}
      {(component || button) && (
        <S.CollapsibleContent
          data-testid="field-set-collapsible"
          ref={containerRef}
          expanded={!expandable || expanded}
          aria-hidden={expandable && !expanded}
          maxHeight={maxHeight}
        >
          {component && <S.ComponentWrapper>{component}</S.ComponentWrapper>}
          {button && <S.ActionButton>{button}</S.ActionButton>}
        </S.CollapsibleContent>
      )}
    </S.ContainerWrapper>
  );
};
export default FieldSet;
