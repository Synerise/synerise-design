import * as React from 'react';
import { Label } from '@synerise/ds-typography';
import '@synerise/ds-core/dist/js/style';
import { defaultColorsOrder } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import './style/index.less';
import * as S from './Slider.styles';
import { ColorMapProps, Props, SliderTypes } from './Slider.types';
import Allocation from './Allocation/Allocation';

const getDefaultTooltipPopupContainer = (): HTMLElement => document.querySelector(`.ant-slider`) as HTMLElement;
const couldBeInverted = (value: number | number[], inverted: boolean): boolean =>
  inverted && (typeof value === 'number' || value.length < 3);

const mapToColor = (_: string | object, idx: number): Record<number, string> => ({
  [idx]: defaultColorsOrder[idx] as string,
});
export const buildDefaultTracksColorMap = (): ColorMapProps =>
  Object.assign({} as Record<number, string>, ...defaultColorsOrder.map(mapToColor));

const Slider: React.FC<Props> = props => {
  const {
    useColorPalette,
    label,
    inverted,
    getTooltipPopupContainer,
    tracksColorMap = buildDefaultTracksColorMap(),
    type,
    thickness,
    description,
    tipFormatter,
    allocationConfig,
    hideMinAndMaxMarks,
    disabled,
    max,
    min,
    value,
    range,
    ...antdProps
  } = props;
  const [reachedEnd, setReachedEnd] = React.useState(false);
  const [reachedStart, setReachedStart] = React.useState(false);
  const calcHandlePosition = React.useCallback(() => {
    const handler = document.querySelectorAll('.ant-slider-handle');
    const markTexts = document.querySelectorAll('.ant-slider-mark-text');
    if (handler && markTexts?.length) {
      const firstMark = markTexts[0].getBoundingClientRect();
      const lastMark = markTexts[markTexts.length - 1].getBoundingClientRect();
      const firstHandler = handler[0].getBoundingClientRect();
      const lastHandler = handler[handler.length - 1].getBoundingClientRect();
      if (firstMark.x + 10 + firstMark.width > firstHandler.x || firstMark.x + 10 + firstMark.width > lastHandler.x) {
        setReachedStart(true);
      } else {
        setReachedStart(false);
      }
      if (lastMark.x - 30 < firstHandler.x || lastMark.x - 30 < lastHandler.x) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }
    }
    return { reachedEnd, reachedStart };
  }, [reachedEnd, reachedStart]);
  React.useEffect(() => {
    setTimeout(() => {
      calcHandlePosition();
    }, 0);
  }, [calcHandlePosition, value]);

  const labelElement = React.useMemo(
    () =>
      label ? (
        <S.LabelWrapper>
          <Label>{label}</Label>
        </S.LabelWrapper>
      ) : null,
    [label]
  );
  if (type === SliderTypes.ALLOCATION && !!allocationConfig) {
    return (
      <>
        {labelElement}
        <Allocation {...props} />
      </>
    );
  }

  return (
    <>
      {labelElement}
      <S.AntdSlider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...antdProps}
        max={max}
        value={value}
        reachedEnd={reachedEnd}
        range={range}
        reachedStart={reachedStart}
        className={value && couldBeInverted(value, !!inverted) ? 'ant-slider-inverted' : undefined}
        useColorPalette={useColorPalette}
        thickness={thickness}
        disabled={disabled}
        description={description}
        hideMinAndMaxMarks={hideMinAndMaxMarks}
        tipFormatter={(tipValue?: number): React.ReactNode => (
          <S.DescriptionWrapper>
            {description && <S.Description range={range}>{description}</S.Description>}
            {tipFormatter && tipFormatter(tipValue)}
          </S.DescriptionWrapper>
        )}
        tracksColorMap={tracksColorMap}
        getTooltipPopupContainer={getTooltipPopupContainer || getDefaultTooltipPopupContainer}
      />
    </>
  );
};

export default Slider;
