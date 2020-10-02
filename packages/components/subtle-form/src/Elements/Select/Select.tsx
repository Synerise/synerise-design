import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { EditS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { Label } from '@synerise/ds-input';
import Select from '@synerise/ds-select';
import * as S from '../../SubtleForm.styles';
import { SubtleSelectProps } from './Select.types';

const SubtleTextArea: React.FC<SubtleSelectProps> = ({ suffix, suffixTooltip, label, labelTooltip }) => {
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
          <Select size="middle" />
        ) : (
          <div onClick={handleActivate} onBlur={handleDeactivate}>
            <S.MainContent >
              hello
            </S.MainContent>
            <S.Suffix>
              <Tooltip title={suffixTooltip}>
                {suffix ?? <Icon component={<EditS />} color={theme.palette['grey-600']} />}
              </Tooltip>
            </S.Suffix>
          </div>
        )}
      </S.Container>
    </S.Subtle>
  );
};
export default SubtleTextArea;
