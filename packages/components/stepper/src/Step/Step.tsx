import * as React from 'react';
import { CheckS, WarningFillS } from '@synerise/ds-icon';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip';
import AnimateHeight from 'react-animate-height';
import { StepProps } from './Step.types';
import * as S from './Step.styles';
import { ORIENTATIONS } from '../Stepper.types';

const Step: React.FC<StepProps> = ({
  stepNumber,
  label,
  active,
  done,
  validated,
  tooltip,
  onClick,
  children,
  size = 'default',
  orientation = ORIENTATIONS.HORIZONTAL,
}) => {
  const [wasActive, setWasActive] = React.useState(Boolean(active));

  const handleClick = React.useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  React.useEffect(() => {
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
      validated={Boolean(validated)}
      hasChildren={Boolean(children)}
      size={size}
      orientation={orientation}
    >
      <S.StepWrapper onClick={handleClick} clickable={Boolean(onClick)}>
        <Tooltip trigger={['hover']} title={label}>
          <S.StepPrefix noMargin={!label}>
            {done && !validated ? (
              <Icon component={<CheckS />} color={theme.palette['green-600']} />
            ) : (
              <S.StepNumber>{stepNumber}</S.StepNumber>
            )}
          </S.StepPrefix>
        </Tooltip>
        <S.StepName data-label={label}>
          <S.StepLabel>{label}</S.StepLabel>
          {tooltip && active && (
            <Tooltip trigger={['hover']} title={tooltip}>
              <Icon component={<WarningFillS />} color={theme.palette['yellow-600']} />
            </Tooltip>
          )}
        </S.StepName>
      </S.StepWrapper>
      <S.StepContent>
        <AnimateHeight className="ds-step-content" duration={200} height={active ? 'auto' : 0}>
          {children}
        </AnimateHeight>
      </S.StepContent>
    </S.Step>
  );
};

export default Step;
