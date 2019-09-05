import variables from '../../../style/variables';

export type ThemeProps = {
  variables: { [key: string]: string };
  palette: { [key: string]: string };
  variable: (name: string) => string | null;
};

export const theme: ThemeProps = {
  variables: variables,
  palette: variables,
  variable: function(name: string): string | null {
    return name ? this.variables[name.slice(1)] : null;
  },
};
