// @ts-nocheck
import React from 'react';

import figma from '@figma/code-connect';

import Toolbar from './Toolbar';
import {
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarLabel,
} from './components';

const TOOLBAR_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2484-39328&m=dev';

figma.connect(Toolbar, TOOLBAR_URL, {
  variant: { Actions: 'Left' },
  example: () => (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton mode="single-icon" />
        <ToolbarButton mode="single-icon" />
        <ToolbarDivider />
        <ToolbarButton mode="single-icon" />
      </ToolbarGroup>
    </Toolbar>
  ),
});

figma.connect(Toolbar, TOOLBAR_URL, {
  variant: { Actions: 'Right' },
  example: () => (
    <Toolbar>
      <ToolbarGroup isCompact>
        <ToolbarButton mode="single-icon" />
        <ToolbarLabel>100%</ToolbarLabel>
        <ToolbarButton mode="single-icon" />
      </ToolbarGroup>
    </Toolbar>
  ),
});

figma.connect(Toolbar, TOOLBAR_URL, {
  variant: { Actions: 'Left and Right' },
  example: () => (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton mode="single-icon" />
        <ToolbarButton mode="single-icon" />
        <ToolbarDivider />
        <ToolbarButton mode="single-icon" />
      </ToolbarGroup>
      <ToolbarGroup isCompact>
        <ToolbarButton mode="single-icon" />
        <ToolbarLabel>100%</ToolbarLabel>
        <ToolbarButton mode="single-icon" />
      </ToolbarGroup>
    </Toolbar>
  ),
});
