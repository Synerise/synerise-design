import * as React from 'react';
import { mount } from 'enzyme';
import DSProvider from '../DSProvider';
import { FormattedMessage } from 'react-intl';
import { LocaleProviderProps } from '../LocaleProvider/LocaleProvider';

describe('DSProvider', function() {
  const messages = {
    en: {
      CLICK: 'Click this',
    },
  };
  const C = mount(
    <DSProvider locale="en" messages={messages}>
      <div>
        <FormattedMessage id="CLICK" />
      </div>
    </DSProvider>
  );
  it('should render', function() {
    const props = C.find('IntlProvider').props() as LocaleProviderProps;
    expect(props.locale).toBe('en');
  });
  it('should render translated text', function() {
    expect(C.text()).toBe('Click this');
  });
  it.todo('index module exports theme as named export');
  it.todo('index module exports theme as the default export');
  it.todo('theme is not reexported as it was exported with `export const default = theme`, but `export default theme`');
});
