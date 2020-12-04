import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import dayjs from 'dayjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat';
import Button from '@synerise/ds-button';
import { CheckS, CloseS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip';
import { Props } from './Day.types';
import * as S from './Day.styles';

dayjs.extend(customParseFormatPlugin);

const Day: React.FC<Props> = ({
  active,
  intl,
  label,
  onChange,
  onToggle,
  readOnly,
  restricted,
  tooltip,
  texts,
  ...rest
}: Props) => {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const type = active ? 'primary' : 'secondary';
  const icon = React.useMemo(() => {
    return hovered ? (
      <Icon component={<CloseS />} onClick={(): void => onToggle(false)} color={theme.palette['red-600']} />
    ) : (
      <Icon component={<CheckS />} color={theme.palette['green-600']} />
    );
  }, [hovered, onToggle]);
  return (
    <S.Container>
      <Button
        {...rest}
        block
        onClick={(): void => {
          onToggle && onToggle(true);
        }}
        type={type}
        mode="label-icon"
      >
        <S.Content>{label}</S.Content>
      </Button>
      {restricted && !active && (
        <Tooltip
          trigger={['hover']}
          title={texts?.clear || 'Clear'}
          onVisibleChange={(visible: boolean): void => setHovered(visible)}
          getPopupContainer={(node: HTMLElement): HTMLElement =>
            node.parentElement ? node.parentElement : document.body
          }
        >
          <S.IconWrapper active={hovered}>{icon}</S.IconWrapper>
        </Tooltip>
      )}
    </S.Container>
  );
};

export default Day;
