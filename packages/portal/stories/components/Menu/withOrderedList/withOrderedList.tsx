import { ordered } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';
import { boolean } from '@storybook/addon-knobs';

const withOrderedList = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(ordered),
    ordered: boolean('Set ordered',true),
    ...defaultProps,
  } as object;
  return decorator(props);
}
export default withOrderedList;