import * as React from 'react';
import { render } from '@testing-library/react';
import { FormattedMessage, injectIntl } from 'react-intl';
import LocaleProvider from '../LocaleProvider';

describe('LocaleProvider', () => {
  const ExampleComponenent: React.FC<any> = () => (
    <>
      <FormattedMessage id="FOO.BAR.ITEM" />
      <FormattedMessage id="TEST" />
    </>
  );
  const ExampleComponenentIntl = injectIntl(ExampleComponenent);
  const messages = {
    en: {
      TEST: 'Translated Test',
      FOO: {
        BAR: {
          ITEM: 'VALUE',
        },
      },
    },
  };

  it('should flat keys', function() {
    // ARRANGE
    const C = render(
      <LocaleProvider locale="en-GB" messages={messages}>
        <ExampleComponenentIntl />
      </LocaleProvider>
    );
    // ASSERT
    // render non-nested key
    expect(C.findByText('Translated Test')).toBeTruthy();
    // render nested key
    expect(C.findByText('VALUE')).toBeTruthy();
  });

  it('should render key name if translation is missing', function() {
    const mockedError = jest.fn();
    console.error = mockedError;
    // ARRANGE
    const C = render(
      <LocaleProvider locale="es" messages={messages}>
        <ExampleComponenentIntl />
      </LocaleProvider>
    );

    // ASSERT
    expect(C.getByText('FOO.BAR.ITEM')).toBeTruthy();
    expect(mockedError).toHaveBeenCalledWith(
      '[React Intl] Missing locale data for locale: "es". Using default locale: "en" as fallback.'
    );
  });
});
