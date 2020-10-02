import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Label } from '@synerise/ds-input';
import Select from '@synerise/ds-select';
import * as S from '../../SubtleForm.styles';
import { SubtleSelectProps } from './Select.types';

const SubtleTextArea: React.FC<SubtleSelectProps> = ({ suffix, suffixTooltip, label, children,labelTooltip }) => {
  const [active, setActive] = React.useState<boolean>(false);
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
  return (
    <S.Subtle className="ds-subtle-form">
      <S.ContentAbove active={active}>
        <Label label={label} tooltip={labelTooltip} />
      </S.ContentAbove>
      <S.Container ref={containerRef} className="ds-subtle-textarea" active={active}>
        {active && !blurred ? (
          <Select size="middle" onBlur={handleDeactivate}>
            {children}
          </Select>
        ) : (
          <S.Inactive onClick={handleActivate} blurred={blurred}>
            <S.MainContent>hello</S.MainContent>
            <S.Suffix select>
              <Tooltip title={suffixTooltip}>
                {suffix ?? <Icon component={<AngleDownS />} color={theme.palette['grey-600']} />}
              </Tooltip>
            </S.Suffix>
          </S.Inactive>
        )}
      </S.Container>
    </S.Subtle>
  );
};
export default SubtleTextArea;
