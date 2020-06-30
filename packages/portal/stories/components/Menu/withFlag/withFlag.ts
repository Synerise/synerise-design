import { avatarSmall } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';

const withSmallAvatar = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(avatarSmall),
    ...defaultProps,
  } as object;
  return decorator(props);
};
export default withSmallAvatar;
