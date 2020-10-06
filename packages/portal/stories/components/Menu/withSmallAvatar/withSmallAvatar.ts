import { avatarSmall } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';

const withSmallAvatar = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(avatarSmall),
    selectable: false,
    size: 'large',
    ...defaultProps,
  } as object;
  return decorator(props);
};
export default withSmallAvatar;
