import React from 'react';
import { theme } from '@synerise/ds-core';

export const fixedWrapper200 = (Story, storyContext) => <div style={{ width: '200px' }}>{Story()}</div>;

export const fixedWrapper300 = (Story, storyContext) => <div style={{ width: '300px' }}>{Story()}</div>;

export const fixedWrapper400 = (Story, storyContext) => <div style={{ width: '400px' }}>{Story()}</div>;

export const fixedWrapper588 = (Story, storyContext) => <div style={{ width: '588px' }}>{Story()}</div>;

export const flexColumnWrapper = (Story, storyContext) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{Story()}</div>
);
export const footerWrapper = (Story, storyContext) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: '0 16px',
      background: '#fff'
    }}
  >
    {Story()}
  </div>
);

export const centeredPaddedWrapper = (Story, storyContext) => {
  const height = storyContext.viewMode === 'story' ? '100vh' : '100px';
  const width = storyContext.viewMode === 'story' ? '100vw' : '100%';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width, height }}>{Story()}</div>
  );
};

export const cardSelectWrapper = (Story, storyContext) => {
  const height = storyContext.viewMode === 'story' ? '100vh' : '200px';
  const width = storyContext.viewMode === 'story' ? '100vw' : '100%';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width, height }}>{Story()}</div>
  );
};

export const buttonDecorator = (Story, storyContext) => {
  const lightTypes = ['tertiary-white', 'ghost-white'];
  const backgroundColor = lightTypes.includes(storyContext.args.type) ? theme.palette['grey-600'] : 'transparent';
  const height = storyContext.viewMode === 'story' ? '100vh' : '100px';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height,
        backgroundColor: backgroundColor,
      }}
    >
      {Story()}
    </div>
  );
};

export const cardTabsDecorator = (Story, storyContext) => {
  const backgroundColor = Boolean(storyContext.args.greyBackground) ? theme.palette['grey-300'] : 'transparent';
  const height = storyContext.viewMode === 'story' ? '100vh' : '250px';
  const width = storyContext.viewMode === 'story' ? '100vw' : '100%';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
        width,
        height,
      }}
    >
      {Story()}
    </div>
  );
};
