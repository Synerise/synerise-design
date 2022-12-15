import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { TagsStyles, Tag } from '@synerise/ds-tags';
import Select from '@synerise/ds-select';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';
import { BorderLessInput } from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';
import { ColorPickerSize } from './ColorPicker.types';

export const TagDot = styled.div<{ pressed?: boolean }>`
  display: ${(props): string => (props.pressed ? 'flex' : 'none')};
  width: 4px;
  height: 4px;
  background-color: ${(props): string => props.theme.palette.white};
  border-radius: 50%;
`;
const SIZE_DEFAULT = 167;
const Container = styled.div<{ size?: 'S' | 'M' | 'L' }>`
  @media (min-width: 200px) {
    min-width: 200px;
    margin: -8px;
  }
  .react-colorful__last-control {
    margin: 24px 56px 8px 18px;
    border-radius: 4px;
    height: 8px;
  }
  .react-colorful__saturation {
    border-bottom: 0px;
    border-radius: 4px 4px 0 0;
    height: 96px;
    .react-colorful__interactive {
      height: 96px;
    }
  }
  &&& .ds-tag {
    width: 16px;
    height: 16px;
    margin: 0px 4px 8px;
    border: 1px solid ${(props): string => props.theme.palette['grey-300']};

    &:hover {
      ${TagDot} {
        display: flex;
      }
    }
  }

  .react-colorful__pointer {
    width: 16px;
    height: 16px;
  }
  .react-colorful {
    width: 262px;
    height: ${(props): string => ColorPickerSize[props.size as string] || SIZE_DEFAULT}px;
  }
  .react-colorful__hue-pointer {
    border: 1px solid ${(props): string => props.theme.palette['grey-300']};
    box-shadow: none !important;
    .react-colorful__pointer-fill {
      background-color: ${(props): string => props.theme.palette.white} !important;
    }
  }
  .ant-divider-horizontal {
    margin: 16px 0px;
  }

  ${TagsStyles.Container} {
    margin-bottom: -8px;
  }
`;
const SubContainer = styled.div`
  padding: 8px 16px 16px;
`;

export const ColorTag = styled(Tag)`
  width: 16px;
  height: 16px;
  margin: 7px 8px 0px;
  border: 1px solid ${(props): string => props.theme.palette['grey-300']};
`;

export const SelectInput = styled(BorderLessInput)`
  width: 80px;
`;

export const SelectColorPicker = styled(Select)`
  .ant-select-single {
    .ant-select-selector {
      padding: 0px 12px 0px 0px;
      .ant-select-selection-search-input {
        padding-left: 15px;
      }
      .ant-select-selection-item {
        margin-left: -3px;
      }
    }
  }
  min-width: 100px;
`;
export const AddColorButton = styled(Button)`
  &&&.ant-btn {
    width: 16px;
    height: 16px;
    margin-right: 2px;
  }
`;
export const CopyIcon = styled(Icon)`
  display: none;
`;
export const ColorPickerInput = styled(Input)`
  &:hover {
    ${CopyIcon} {
      display: flex;
    }
  }
`;
export const PrefixTag = styled.div<{ height?: boolean }>`
  &&& .ds-tag {
    width: 24px;
    height: 24px;
    border: 1px solid ${(props): string => props.theme.palette['grey-300']};
    cursor: auto;
    &:hover:before {
      cursor: auto;
      filter: brightness(100%);
    }
  }
  position: absolute;
  right: ${(props): string => (props.height ? '12px' : '12px')};
  bottom: ${(props): string => (props.height ? '97px' : '65px')};
  z-index: 2;
  cursor: auto;
`;
export const SwatchSectionWrapper = styled.div`
  display: flex;
  alignitems: center;
`;
export const PreffixWrapper = styled.div`
  padding: 6px 12px;
`;
export const ValueWrapper = styled.div`
  display: flex;
  font-size: 12px;
`;

export default {
  Container,
  SubContainer,
  ColorTag,
  PrefixTag,
  SelectColorPicker,
  AddColorButton,
  SwatchSectionWrapper,
  PreffixWrapper,
  ValueWrapper,
  CopyIcon,
  ColorPickerInput,
  TagDot,
  SelectInput,
};
