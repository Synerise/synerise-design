import { avatarMedium } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';

const withMediumAvatar = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(avatarMedium),
    ...defaultProps,
  } as object;
  return decorator(props);
}
export default withMediumAvatar;