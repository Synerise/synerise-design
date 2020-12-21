import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Label } from '@synerise/ds-input';
import * as S from '../../SubtleForm.styles';
import { SelectContainer, ContentAbove } from './Field.styles';
import { SubtleFieldProps } from '../../SubtleForm.types';

const SutbleField: React.FC<SubtleFieldProps> = ({
  disabled,
  suffix,
  suffixTooltip,
  label,
  labelTooltip,
  activeElement,
  inactiveElement,
}) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [blurred, setBlurred] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  /*  const handleDeactivate = React.useCallback(() => {
    setActive(false);
    setBlurred(true);
  }, []); */
  const handleActivate = React.useCallback(() => {
    setActive(true);
    setBlurred(false);
  }, []);
  return (
    <S.Subtle className="ds-subtle-form" disabled={disabled}>
      <ContentAbove active={active}>
        <Label label={label} tooltip={labelTooltip} />
      </ContentAbove>
      <SelectContainer ref={containerRef} className="ds-subtle-select" active={active}>
        {active && !blurred ? (
          activeElement
        ) : (
          <S.Inactive onClick={!disabled ? handleActivate : undefined} blurred={blurred} disabled={disabled}>
            <S.MainContent hasMargin>{inactiveElement}</S.MainContent>
            {!active && !disabled && (
              <S.Suffix select>
                <Tooltip title={suffixTooltip}>
                  {suffix ?? <Icon component={<AngleDownS />} color={theme.palette['grey-600']} />}
                </Tooltip>
              </S.Suffix>
            )}
          </S.Inactive>
        )}
      </SelectContainer>
    </S.Subtle>
  );
};
export default SutbleField;
