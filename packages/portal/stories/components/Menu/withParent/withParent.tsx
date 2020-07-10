import { simpleText } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps, getSuffixElement } from '../index.stories';

const withParent  = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(simpleText),
    suffixel: getSuffixElement(),
    parent: true,
    selectable: false,
    ...defaultProps,
  } as object;
  return decorator(props);
}
export default withParent;