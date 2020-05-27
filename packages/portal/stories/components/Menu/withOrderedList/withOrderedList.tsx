import { ordered } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';

const withOrderedList = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(ordered),
    ordered: true,
    ...defaultProps,
  } as object;
  return decorator(props);
}
export default withOrderedList;