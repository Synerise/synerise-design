import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import { v4 as uuid } from 'uuid';
import { InputProps } from 'antd/lib/input';
import './style/index.less';
import * as S from './Input.styles';

interface Props extends InputProps {
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  counterLimit?: number;
}

interface State {
  value: string;
  charCount: number;
}

const enhancedInput = <P extends object>(WrappedComponent: React.ComponentType<P>): React.ComponentType<P & Props> =>
  class EnhancedInput extends React.Component<P & Props, State> {
    state = {
      value: '',
      charCount: 0,
    };

    componentDidMount(): void {
      const { value } = this.props;

      value &&
        this.setState({
          value: value.toString(),
          charCount: value.toString().length,
        });
    }

    static getDerivedStateFromProps(nextProps): State {
      if (!nextProps.value) return undefined; // if input is uncontrolled

      return {
        value: nextProps.value || '',
        charCount: nextProps.value ? nextProps.value.toString().length : 0,
      };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { counterLimit, onChange } = this.props;
      const { value } = e.currentTarget;

      if (value.length > counterLimit) return;

      this.setState({
        value,
        charCount: value.length,
      });
      onChange && onChange(e);
    };

    render(): React.ReactNode {
      const { errorText, label, description, counterLimit, ...antdInputProps } = this.props;
      const { value, charCount } = this.state;
      const showError = Boolean(errorText);
      const id = uuid();

      return (
        <>
          {(label || counterLimit) && (
            <S.ContentAbove>
              <S.Label htmlFor={id}>{label}</S.Label>
              <S.Counter data-testid="counter">
                {charCount}/{counterLimit}
              </S.Counter>
            </S.ContentAbove>
          )}
          <WrappedComponent
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(antdInputProps as P)}
            error={showError}
            onChange={this.handleChange}
            value={value}
            id={id}
          />
          {(showError || description) && (
            <S.ContentBelow>
              {showError && <S.ErrorText>{errorText}</S.ErrorText>}
              {description && <S.Description>{description}</S.Description>}
            </S.ContentBelow>
          )}
        </>
      );
    }
  };

export const TextArea = enhancedInput(S.AntdTextArea);
export const Input = enhancedInput(S.AntdInput);
