import * as React from 'react';

export type FilterElement = {
  text: string;
  filter?: string;
  icon?: React.ReactNode;
};

export type SearchProps = {
  placeholder: string;
  parametersTitle?: string;
  parametersTooltip?: string;
  recentTitle?: string;
  recentTooltip?: string;
  suggestionsTitle?: string;
  suggestionsTooltip?: string;
  clearTooltip: string | React.ReactNode;
  parameters?: FilterElement[];
  recent?: FilterElement[];
  suggestions: FilterElement[];
  onValueChange: (value: string) => void;
  value: string;
  parameterValue: string;
  onParameterValueChange: (parameterValue: string) => void;
  divider?: React.ReactNode;
  width?: number;
};
