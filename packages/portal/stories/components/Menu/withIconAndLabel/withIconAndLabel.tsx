import { select } from '@storybook/addon-knobs';
import { iconPrefixType, renderPrefixIcon, textWithIcon } from '../dataset';
import {
  attachKnobsToDataSource,
  decorator,
  getDefaultProps,
  getSuffixElement,
  getSuffixTrigger,
} from '../index.stories';

const withIconAndLabel = () => {
  const defaultProps = getDefaultProps();
  const prefixKnob = select('Set prefix type', iconPrefixType, iconPrefixType.singleIcon);
  const props = {
    dataSource: attachKnobsToDataSource(textWithIcon),
    prefixel: renderPrefixIcon(prefixKnob),
    suffixel: getSuffixElement(),
    suffixVisibilityTrigger: getSuffixTrigger(),
    ...defaultProps,
  } as object;
  return decorator(props);
};
export default withIconAndLabel;
