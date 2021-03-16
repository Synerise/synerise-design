import { avatar } from '../dataset';
import {
  attachKnobsToDataSource,
  decorator,
  getDefaultProps,
  getSuffixElement,
  getSuffixTrigger,
} from '../index.stories';

const withObjectAvatar = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(avatar),
    suffixel: getSuffixElement(),
    suffixVisibilityTrigger: getSuffixTrigger(),
    selectable: false,

    ...defaultProps,
  } as object;
  return decorator(props);
};
export default withObjectAvatar;
