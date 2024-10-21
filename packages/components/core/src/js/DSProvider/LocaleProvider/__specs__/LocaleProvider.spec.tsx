import React from 'react';
import { render } from '@testing-library/react';
import { FormattedMessage, injectIntl } from 'react-intl';
import LocaleProvider from '../LocaleProvider';

describe('LocaleProvider', () => {
  const ExampleComponenent = () => (
    <>
      <FormattedMessage id="FOO.BAR.ITEM" />
      <FormattedMessage id="TEST" />
    </>
  );
  const ExampleComponentIntl = injectIntl(ExampleComponenent);
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

  it('should flat keys', async function() {
    const C = render(
      <LocaleProvider locale="en-GB" messages={messages}>
        <ExampleComponentIntl />
      </LocaleProvider>
    );
    
    expect(await C.findByText('Translated Test')).toBeInTheDocument();
    expect(await C.findByText('VALUE')).toBeInTheDocument();
  });

  it('should render key name if translation is missing', function() {
    const mockedError = jest.fn();
    
    const C = render(
      <LocaleProvider locale="es" messages={messages} onError={mockedError}>
        <ExampleComponentIntl />
      </LocaleProvider>
    );

    expect(C.getByText('FOO.BAR.ITEM')).toBeInTheDocument();
    expect(mockedError).toHaveBeenCalled();
  });

  it('should render fallback translations', function() {
    
    const messagesPl = {
      pl: {
        EXAMPLE: 'Example',
        FOO: {
          BAR: {
            ITEM: 'PL_VALUE',
          },
        },
      },
    };

    const messagesDefault = {
      TEST: 'Fallback_1',
      FOO: {
        BAR: {
          ITEM: 'Fallback_2',
        },
      },
    };

    const C = render(
      <LocaleProvider locale="pl" messages={messagesPl} defaultMessages={messagesDefault}>
        <ExampleComponentIntl />
      </LocaleProvider>
    );

    expect(C.getByText('PL_VALUE')).toBeInTheDocument();
    expect(C.getByText('Fallback_1')).toBeInTheDocument();
  });
});
