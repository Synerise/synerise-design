import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdDropdown, { DropDownProps as AntDropDownProps } from 'antd/lib/dropdown';
import SearchInput from './elements/SearchInput/SearchInput';
import BottomAction from './elements/BottomAction/BottomAction';
import BackAction from './elements/BackAction/BackAction';
import { Wrapper } from './Dropdown.styles';

export type DropdownProps = AntDropDownProps;

class Dropdown extends React.Component<DropdownProps> {
  static Wrapper: typeof Wrapper = Wrapper;
  static SearchInput: typeof SearchInput = SearchInput;
  static BottomAction: typeof BottomAction = BottomAction;
  static BackAction: typeof BackAction = BackAction;
  static Button: typeof AntdDropdown.Button = AntdDropdown.Button;

  render(): React.ReactNode {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <AntdDropdown {...this.props} />
    );
  }
}

export default Dropdown;
