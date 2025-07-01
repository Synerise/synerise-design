import React, { useCallback, useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';

import { theme } from '@synerise/ds-core';
import Icon, { CheckS, WarningFillS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { ORIENTATIONS } from '../Stepper.types';
import * as S from './Step.styles';
import { type StepProps } from './Step.types';

const Step = ({
  stepNumber,
  label,
  active,
  done,
  warning,
  validated,
  tooltip,
  onClick,
  children,
  size = 'default',
  orientation = ORIENTATIONS.HORIZONTAL,
}: StepProps) => {
  const [wasActive, setWasActive] = useState(Boolean(active));

  const handleClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  useEffect(() => {
    if (!active && wasActive) {
      setWasActive(false);
    }
    if (active) {
      setWasActive(true);
    }
  }, [active, wasActive]);

  return (
    <S.Step
      className="ds-step"
      active={Boolean(active)}
      wasActive={wasActive}
      done={Boolean(done)}
      warning={Boolean(warning)}
      validated={Boolean(validated)}
      hasChildren={Boolean(children)}
      size={size}
      orientation={orientation}
      clickable={Boolean(onClick)}
    >
      <S.StepWrapper onClick={handleClick}>
        <Tooltip trigger={['hover']} title={label}>
          <S.StepPrefix noMargin={!label}>
            {done && !validated ? (
              <Icon
                component={<CheckS />}
                color={
                  warning
                    ? theme.palette['yellow-600']
                    : theme.palette['green-600']
                }
              />
            ) : (
              <S.StepNumber>{stepNumber}</S.StepNumber>
            )}
          </S.StepPrefix>
        </Tooltip>
        <S.StepName data-label={label}>
          <S.StepLabel>{label}</S.StepLabel>
          {tooltip && active && (
            <Tooltip trigger={['hover']} title={tooltip}>
              <Icon
                component={<WarningFillS />}
                color={theme.palette['yellow-600']}
              />
            </Tooltip>
          )}
        </S.StepName>
      </S.StepWrapper>
      <S.StepContent>
        <AnimateHeight
          className="ds-step-content"
          duration={200}
          height={active ? 'auto' : 0}
        >
          {children}
        </AnimateHeight>
      </S.StepContent>
    </S.Step>
  );
};

export default Step;
