import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';
import { deleteState } from '../dataset';

const withDelete = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(deleteState),
    ...defaultProps,
  } as object;
  return decorator(props);
}
export default withDelete;