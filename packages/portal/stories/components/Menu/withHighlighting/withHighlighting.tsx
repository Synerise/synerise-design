import { simpleText } from '../dataset';
import { text } from '@storybook/addon-knobs';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';

const withHighlighting = () => {
  const defaultProps = getDefaultProps();
  const props = {
    dataSource: attachKnobsToDataSource(simpleText),
    highlight: text('Set text to be highlighted', 'Opt'),
    ...defaultProps,
  } as object;
  return decorator(props);
}
export default withHighlighting;