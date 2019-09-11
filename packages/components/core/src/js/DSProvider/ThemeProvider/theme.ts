import vars from './variables';

export type ThemeProps = {
  variables: { [key: string]: string };
  palette: { [key: string]: string };
  variable: (name: string) => string | null;
};

const theme: ThemeProps = {
  variables: vars.variables,
  palette: vars.colors,
  variable: function variable(name: string): string | null {
    return name ? this.variables[name.slice(1)] : null;
  },
};

export default theme;
