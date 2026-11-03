# Contributing

## Adding new icons

To add a new icon you need to add the source svg file to the relevant directory in ./src/svg

Make sure that the svg file is first cleaned up according to the instructions below

### SVG Sanitisation

To allow inheriting fill / stroke color from the parent component (IconContainer) all hardcoded color values in the svg need to be replaced with the currentColor keyword. This applies to all nodes inside the svg.

Depending on the svg contents you may need to replace the stroke or fill property values, sometimes there are inline styles associated with some nodes that specify the fill or stroke color.

In some rare cases we do not want a specific icon to change color depending on context or by provided color prop - such as company logos or other full-color icons. In these cases leave the svg as it was provided to you.

Read more: https://gomakethings.com/currentcolor-and-svgs/

### Canvas rect

Figma exports a `rect#canvas` as the first child of most icons, to fix the bounding box. `build/svgr.js` rewrites it to `fill="none"` with no opacity (`build/normaliseCanvasRect.js`), so a canvas that was exported with a visible paint (e.g. `fill:#fff;fill-opacity:0.1`) cannot tint an icon on a filled background. No need to clean it up in the source SVG.

## fill-rule debugging

Some svg objects have a fill-rule="evenodd" specified - svgr processing of those icons can sometimes result in shapes without transparent holes, where they were in the source svg.

In that case the source svg needs to be simplified (i.e. using the figma Fill Rule Editor plugin https://www.figma.com/community/plugin/771155994770327940/fill-rule-editor)

## Figma Code Connect

Icon mappings for Figma Code Connect are auto-generated from the Figma file. To regenerate after icons are added or renamed in Figma:

```bash
FIGMA_TOKEN=<your-token> pnpm build:figma
```

This fetches all icon components from the Synerise Design System Figma file and generates `src/Icon.figma.tsx` with a Code Connect mapping for each icon. After regenerating, publish to Figma from the repo root:

```bash
pnpm figma:publish --token <your-token>
```
