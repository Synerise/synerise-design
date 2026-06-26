import styled, { css } from 'styled-components';

const checkSvgWithCustomColor = (color: string): string => {
  const colorValueForSvg = color.replace(/#/, '%23');
  // NB: SVG attributes are double-quoted so the data URI can be wrapped in CSS url('...') with
  // single quotes — prettier normalises url() quotes to single inside css`` and would otherwise
  // break the string (the old single-quoted SVG ended the url early → missing tick).
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="3 3 18 18" >/><path fill="none" d="M0 0h24v24H0z" /><path style="fill: ${colorValueForSvg};" stroke-width="1" stroke="${colorValueForSvg}" d="M10.61 15.744a.75.75 0 01-.535-.224l-3.11-3.162a.75.75 0 011.07-1.052l2.575 2.618 5.355-5.444a.75.75 0 111.07 1.052l-5.89 5.988a.75.75 0 01-.535.224z"/></svg>`;
};

const soloCss = css`
  padding: 4px;
`;

export const CheckboxWrapper = styled.div<{ withoutPadding: boolean }>`
  display: flex;
  padding: ${(props) => (props.withoutPadding ? '0' : '4px 12px 8px 8px')};
  flex-direction: column;
`;

export const AdditionalData = styled.div`
  margin: 2px 12px 0px 28px;
`;

/*
 * DS-native checkbox visual, expressed entirely with styled-components — the `ant-checkbox*` /
 * `ds-checkbox-*` class names live on the elements only as hooks (ui-tests / interim external CSS),
 * never as styling selectors. State (checked / indeterminate / disabled / error) is driven by
 * transient `$`-props the component passes in; cross-element rules (hover preview, focus ring) live
 * on `CheckboxLabel` and reference the child styled-components.
 */

export const CheckboxInput = styled.input`
  position: absolute;
  inset: 0;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
`;

export const CheckboxInner = styled.span<{
  $checked?: boolean;
  $indeterminate?: boolean;
  $disabled?: boolean;
  $error?: boolean;
}>`
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.palette.white};
  border: 1px solid ${(props) => props.theme.palette['grey-300']};
  border-radius: 3px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  /* checked — white tick on a blue box */
  ${(props) =>
    props.$checked &&
    css`
      background-color: ${props.theme.palette['blue-600']};
      border-color: ${props.theme.palette['blue-600']};
      background-image: url('${checkSvgWithCustomColor(
        props.theme.palette.white,
      )}');
    `}

  /* indeterminate — white horizontal bar */
  ${(props) =>
    props.$indeterminate &&
    css`
      background-color: ${props.theme.palette['blue-600']};
      border-color: ${props.theme.palette['blue-600']};
      background-image: none;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 2px;
        background: ${props.theme.palette.white};
        border-radius: 2px;
        transform: translate(-50%, -50%);
      }
    `}

  /* error border */
  ${(props) =>
    props.$error &&
    css`
      border-color: ${props.theme.palette['red-600']};
      border-width: 2px;
    `}
  ${(props) =>
    props.$error &&
    props.$checked &&
    css`
      border-color: ${props.theme.palette['blue-600']};
    `}

  /* disabled */
  ${(props) =>
    props.$disabled &&
    css`
      border-color: ${props.theme.palette['grey-200']} !important;
      background-color: ${props.theme.palette['grey-050']} !important;
      ${props.$checked &&
      `background-image: url('${checkSvgWithCustomColor(
        props.theme.palette['grey-400'],
      )}');`}
    `}
`;

export const CheckboxText = styled.span<{
  $checked?: boolean;
  $disabled?: boolean;
}>`
  margin: 0;
  padding-left: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) =>
    props.$checked
      ? props.theme.palette['grey-800']
      : props.theme.palette['grey-700']};

  ${(props) =>
    props.$disabled &&
    css`
      color: ${props.theme.palette['grey-600']};
      opacity: 0.4;
    `}
`;

export const CheckboxBox = styled.span`
  position: relative;
  top: 0;
  display: inline-flex;
  flex: none;
  cursor: pointer;
`;

export const CheckboxLabel = styled.label<{
  $solo?: boolean;
  $checked?: boolean;
  $indeterminate?: boolean;
  $disabled?: boolean;
  $error?: boolean;
}>`
  display: flex;
  align-items: center;
  line-height: 1;
  margin: 0;
  cursor: pointer;
  ${(props) => props.$solo && soloCss};

  &:hover ${CheckboxText} {
    color: ${(props) => props.theme.palette['grey-800']};
  }

  /* hover preview of the tick on an unchecked, enabled box */
  ${(props) =>
    !props.$checked &&
    !props.$indeterminate &&
    !props.$disabled &&
    css`
      &:hover ${CheckboxInner} {
        border-color: ${props.theme.palette['blue-600']};
        background-image: url('${checkSvgWithCustomColor(
          props.theme.palette['blue-600'],
        )}');
      }
    `}

  /* hover deepens the indeterminate fill */
  ${(props) =>
    props.$indeterminate &&
    css`
      &:hover ${CheckboxInner} {
        background-color: ${props.theme.palette['blue-500']};
      }
    `}

  /* keyboard focus ring */
  ${CheckboxInput}:focus + ${CheckboxInner} {
    border-color: ${(props) => props.theme.palette['blue-600']};
    box-shadow: inset 0 0 0 1px ${(props) => props.theme.palette['blue-600']};
  }
  ${(props) =>
    props.$error &&
    css`
      ${CheckboxInput}:focus + ${CheckboxInner} {
        box-shadow: 0 0 0 1px ${props.theme.palette['red-600']};
      }
    `}

  ${(props) =>
    props.$disabled &&
    css`
      cursor: not-allowed;

      ${CheckboxBox}, ${CheckboxInput} {
        cursor: not-allowed;
      }
    `}
`;
