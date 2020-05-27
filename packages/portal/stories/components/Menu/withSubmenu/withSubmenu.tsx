import { select } from '@storybook/addon-knobs';
import { iconPrefixType, renderPrefixIcon, submenu } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';

const withSubmenu = () => {
  const defaultProps = getDefaultProps();
  const prefixKnob = select('Set prefix type', iconPrefixType, iconPrefixType.singleIcon);

  const props = {
    dataSource: [
      { text: 'Option 1' },
      { text: 'Option 2' },
      { text: 'Option 3', subMenu: [{ text: 'Child 1' }] },
      { text: 'Option 4', subMenu: [{ text: 'Child 1' }] },
    ],
    prefixel: renderPrefixIcon(prefixKnob),
    ...defaultProps,
  } as object;
  return decorator(props);
}
export default withSubmenu;