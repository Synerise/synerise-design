import {
  ColorItem,
  ColorPalette,
  DocsContext,
} from '@storybook/addon-docs/blocks';
import React, { useContext, useEffect, useState } from 'react';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';

import {
  type DsTheme,
  getKeyColors,
  getPaletteRamp,
  getSemanticGroups,
} from './Colors.data';

type GlobalsPayload = { globals?: Record<string, unknown> };

const toTheme = (payload?: GlobalsPayload): DsTheme =>
  payload?.globals?.dsTheme === 'dark' ? 'dark' : 'light';

// MDX docs pages render outside the story decorators, so the Theme toolbar global
// is read from the preview channel instead of storyContext.globals.
const useDsTheme = () => {
  const { channel } = useContext(DocsContext);
  const [theme, setTheme] = useState<DsTheme>(() => {
    const [payload] =
      channel.last(GLOBALS_UPDATED) ?? channel.last(SET_GLOBALS) ?? [];
    return toTheme(payload);
  });

  useEffect(() => {
    const onGlobalsUpdated = (payload: GlobalsPayload) =>
      setTheme(toTheme(payload));
    channel.on(GLOBALS_UPDATED, onGlobalsUpdated);
    return () => channel.off(GLOBALS_UPDATED, onGlobalsUpdated);
  }, [channel]);

  return theme;
};

export const ActiveTheme = () => {
  const theme = useDsTheme();
  return (
    <p>
      Showing the <strong>{theme}</strong> theme. Switch it with the Theme
      toolbar button.
    </p>
  );
};

export const KeyColors = () => {
  const theme = useDsTheme();
  return (
    <ColorPalette>
      <ColorItem
        title="Key colors"
        subtitle="--ds-color-background-*-solid"
        colors={getKeyColors(theme)}
      />
    </ColorPalette>
  );
};

export const PaletteRamps = ({ hues }: { hues: string[] }) => {
  const theme = useDsTheme();
  return (
    <ColorPalette>
      {hues.map((hue) => {
        const { title, prefix, colors } = getPaletteRamp(theme, hue);
        return (
          <ColorItem
            key={hue}
            title={title}
            subtitle={prefix}
            colors={colors}
          />
        );
      })}
    </ColorPalette>
  );
};

export const SemanticColors = ({ category }: { category: string }) => {
  const theme = useDsTheme();
  return (
    <ColorPalette>
      {getSemanticGroups(theme, category).map(({ title, prefix, colors }) => (
        <ColorItem
          key={title}
          title={title}
          subtitle={prefix}
          colors={colors}
        />
      ))}
    </ColorPalette>
  );
};
