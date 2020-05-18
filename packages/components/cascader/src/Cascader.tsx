import * as React from 'react';
import { CascaderProps } from 'Cascader.types';
import * as S from './Cascader.styles';

class Cascader extends React.PureComponent<CascaderProps> {
  static InputWrapper = S.InputWrapper;
  static Dropdown = S.InputWrapper;

  render(): React.ReactNode {
    return <div>Cascader</div>;
  }
}

export default Cascader;
