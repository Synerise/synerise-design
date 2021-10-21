import * as React from 'react';
import SubtleForm from '@synerise/ds-subtle-form';
import { BorderLessInput, InputWrapper } from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';
import Icon, { StarFillM, StarM } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const decorator = storyFn => <div style={{ width: '314px', padding: '16px', background: '#fff' }}>{storyFn()}</div>;
export const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
export const getErrorText = (error: boolean, errorText: string): string => {
  if (error) {
    return errorText;
  } else {
    return '';
  }
};

const renderActiveElement = (value, onChange, starred, onStarClick, placeholder) => {
  return (
    <InputWrapper focus>
      <div onClick={onStarClick} style={{ margin: '2px 12px 2px 0' }}>
        {starred ? (
          <Icon component={<StarFillM />} color={theme.palette['yellow-600']} />
        ) : (
          <Icon component={<StarM />} color={theme.palette['grey-600']} />
        )}
      </div>
      <BorderLessInput value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} autoFocus />
    </InputWrapper>
  );
};
const renderInactiveElement = (value, starred, onStarClick, placeholder) => {
  return (
    <div style={{ display: 'flex', height: '16px' }}>
      <div onClick={onStarClick} style={{ margin: '-4px 6px 0 -1px' }}>
        {starred ? (
          <Icon component={<StarFillM />} color={theme.palette['yellow-600']} />
        ) : (
          <Icon component={<StarM />} color={theme.palette['grey-600']} />
        )}
      </div>
      {value?.length ? <div>{value}</div> : <div style={{ color: theme.palette['grey-500'] }}>{placeholder}</div>}
    </div>
  );
};
const stories = {
  starred: () => {
    const [value, setValue] = React.useState<string>();
    const [starred, setStarred] = React.useState<boolean>(false);
    const placeholder = 'Name';
    return (
      <div style={{ marginBottom: '16px', height: '57px' }}>
        <SubtleForm.Field
          activeElement={() => renderActiveElement(value, setValue, starred, () => setStarred(!starred), placeholder)}
          inactiveElement={() => renderInactiveElement(value, starred, () => setStarred(!starred), placeholder)}
          label={renderLabel('Starred')}
          labelTooltip={'Edit'}
        ></SubtleForm.Field>
      </div>
    );
  },
};

export default {
  name: 'Components/SubtleForm/Input',
  config: {},
  stories,
  decorator,
};
