import * as React from 'react';
import { FullScreenM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Autocomplete from '@synerise/ds-autocomplete';
import { InputProps } from '../../Factors.types';
import * as S from './Text.styles';
import TextModal from './TextModal';

const TextInput: React.FC<InputProps> = ({ value, onChange, texts, textType, autocompleteText, factorType }) => {
  const [openExpanseEditor, setOpenExpanseEditor] = React.useState(false);

  const SuffixIcon = React.useMemo(() => {
    return factorType === 'text' && textType === 'expansible' ? (
      <S.IconWrapper onClick={(): void => setOpenExpanseEditor(true)}>
        <Icon component={<FullScreenM />} color={theme.palette['grey-600']} />
      </S.IconWrapper>
    ) : null;
  }, [textType, factorType]);

  const handleChange = React.useCallback(
    event => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const handleApply = React.useCallback(
    val => {
      setOpenExpanseEditor(false);
      onChange(val);
    },
    [onChange]
  );

  const autocompleteOptions = React.useMemo(() => {
    return (
      autocompleteText &&
      autocompleteText.options.filter(option => option.toLowerCase().includes((value as string).toLowerCase()))
    );
  }, [value, autocompleteText]);

  return (
    <>
      {factorType === 'text' && textType === 'autocomplete' && autocompleteText ? (
        <Autocomplete placeholder={texts.valuePlaceholder} value={value as string} onChange={onChange}>
          {autocompleteOptions?.map(option => (
            <Autocomplete.Option key={option} value={option}>
              {option}
            </Autocomplete.Option>
          ))}
        </Autocomplete>
      ) : (
        <S.Input
          placeholder={texts.valuePlaceholder}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          suffix={SuffixIcon}
          value={value as string}
          onChange={handleChange}
        />
      )}
      <TextModal
        visible={openExpanseEditor}
        onCancel={(): void => setOpenExpanseEditor(false)}
        value={value as string}
        onApply={handleApply}
        texts={texts}
      />
    </>
  );
};

export default TextInput;
