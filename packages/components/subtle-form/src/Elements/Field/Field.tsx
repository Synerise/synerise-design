import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { EditS } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { Label } from '@synerise/ds-input';
import { useOnClickOutside } from '@synerise/ds-utils';
import * as S from '../../SubtleForm.styles';
import { ContentAbove } from './Field.styles';
import { SubtleFieldProps } from '../../SubtleForm.types';
import { MaskedDatePlaceholder } from '../DatePicker/DatePicker.styles';

const SubtleField: React.FC<SubtleFieldProps> = ({
  disabled,
  suffix,
  suffixTooltip,
  label,
  labelTooltip,
  activeElement,
  inactiveElement,
  mask,
  maskVisible,
  active: activeProp,
}) => {
  const [active, setActive] = React.useState<boolean | undefined>(activeProp);
  const [blurred, setBlurred] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const handleDeactivate = React.useCallback(() => {
    setActive(false);
    setBlurred(true);
  }, []);
  const handleActivate = React.useCallback(() => {
    setActive(true);
    setBlurred(false);
  }, []);

  React.useEffect((): void => setActive(activeProp), [activeProp]);

  useOnClickOutside(containerRef, () => {
    handleDeactivate();
  });
  return (
    <S.Subtle className="ds-subtle-form" disabled={disabled}>
      <ContentAbove active={active}>
        <Label label={label} tooltip={labelTooltip} />
      </ContentAbove>
      <S.Container ref={containerRef} className="ds-subtle-field" active={active}>
        {active && !blurred && !!activeElement ? (
          activeElement()
        ) : (
          <S.Inactive
            tabIndex={0}
            onFocus={!disabled ? handleActivate : undefined}
            onClick={!disabled ? handleActivate : undefined}
            onBlur={handleDeactivate}
            blurred={blurred}
            disabled={disabled}
            mask={maskVisible}
          >
            <S.MainContent hasMargin>
              {inactiveElement && inactiveElement()}
              {!disabled && maskVisible && <MaskedDatePlaceholder>{mask}</MaskedDatePlaceholder>}
            </S.MainContent>
            {!active && !disabled && (
              <S.Suffix select>
                <Tooltip title={suffixTooltip}>
                  {suffix ?? <Icon component={<EditS />} color={theme.palette['grey-600']} />}
                </Tooltip>
              </S.Suffix>
            )}
          </S.Inactive>
        )}
      </S.Container>
    </S.Subtle>
  );
};
export default SubtleField;
