import { simpleText } from '../dataset';
import { number } from '@storybook/addon-knobs';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';

const withIndent = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(simpleText),
    indentLevel: number('Set indent level', 0, { min: 0, max: 10 }),
    ...defaultProps,
  } as object;
  return decorator(props);
}
export default withIndent;