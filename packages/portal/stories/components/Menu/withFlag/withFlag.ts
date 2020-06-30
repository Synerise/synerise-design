import { withFlag as data } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';

const withFlag = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(data),
    ...defaultProps,
  } as object;
  return decorator(props);
};
export default withFlag;
