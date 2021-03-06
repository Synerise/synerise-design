import { select } from '@storybook/addon-knobs';
import { prefixType, renderPrefixIcon, textWithIcon } from '../dataset';
import {
  attachKnobsToDataSource,
  decorator,
  getDefaultProps,
  getSuffixElement,
  getSuffixTrigger,
} from '../index.stories';

const withIconAndLabel = () => {
  const defaultProps = getDefaultProps();
  const prefixKnob = select('Set prefix type', prefixType, prefixType.singleIcon);
  const props = {
    dataSource: attachKnobsToDataSource(textWithIcon),
    prefixel: renderPrefixIcon(prefixKnob),
    suffixel: getSuffixElement(),
    suffixVisibilityTrigger: getSuffixTrigger(),
    selectable: false,
    ...defaultProps,
  } as object;
  return decorator(props);
};
export default withIconAndLabel;
