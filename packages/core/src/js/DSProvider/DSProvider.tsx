import * as React from 'react';

import { LocaleProvider } from './LocaleProvider';
import { ThemeProvider } from './ThemeProvider';

import { LocaleProviderProps } from './LocaleProvider/LocaleProvider';
import { ThemeProviderProps } from './ThemeProvider/ThemeProvider';

export interface DSProviderProps extends LocaleProviderProps, ThemeProviderProps {}

export default class DSProvider extends React.Component<DSProviderProps> {
  render() {
    return (
      <LocaleProvider locale={this.props.locale} messages={this.props.messages} timeZone={this.props.timeZone}>
        <ThemeProvider theme={this.props.theme}>{this.props.children}</ThemeProvider>
      </LocaleProvider>
    );
  }
}
