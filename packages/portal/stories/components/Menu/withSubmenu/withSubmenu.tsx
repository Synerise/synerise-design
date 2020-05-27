import { select } from '@storybook/addon-knobs';
import { iconPrefixType, renderPrefixIcon, submenu } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';

const withSubmenu = () => {
  const defaultProps = getDefaultProps();
  const prefixKnob = select('Set prefix type', iconPrefixType, iconPrefixType.singleIcon);

  const props = {
    dataSource: attachKnobsToDataSource(submenu),
    prefixel: renderPrefixIcon(prefixKnob),
    ...defaultProps,
  } as object;
  return decorator(props);
}
export default withSubmenu;