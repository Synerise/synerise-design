import React from 'react';
import type { Decorator } from '@storybook/react';
import Card from '@synerise/ds-card';
import { theme } from '@synerise/ds-core';

export const fixedWrapper200: Decorator = Story => <div style={{ width: '200px' }}>{Story()}</div>;

export const fixedWrapper300: Decorator = Story => <div style={{ width: '300px' }}>{Story()}</div>;

export const fixedWrapper400: Decorator = Story => <div style={{ width: '400px' }}>{Story()}</div>;

export const fixedWrapper588: Decorator = Story => <div style={{ width: '588px' }}>{Story()}</div>;

export const fixedWrapper800: Decorator = Story => <div style={{ width: '800px' }}>{Story()}</div>;

export const fixedWrapper1000: Decorator = Story => <div style={{ width: '1000px' }}>{Story()}</div>;

export const fixedWrapper1200: Decorator = Story => <div style={{ width: '1200px' }}>{Story()}</div>;

export const fixedHeightWrapper: Decorator = Story => <div style={{ position: 'relative', width: '588px', height: '600px' }}>{Story()}</div>;

export const flexColumnWrapper: Decorator = Story => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{Story()}</div>
);
export const footerWrapper: Decorator = Story => (
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
      background: '#fff',
    }}
  >
    {Story()}
  </div>
);

export const headerWrapper: Decorator = Story => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',

      alignItems: 'stretch',
      padding: '0 16px',
      background: '#fff',
    }}
  >
    {Story()}
  </div>
);

export const centeredPaddedWrapper: Decorator = (Story, storyContext) => {
  const height = storyContext.viewMode === 'story' ? '100vh' : '100px';
  const width = storyContext.viewMode === 'story' ? '100vw' : '100%';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width, height }}>{Story()}</div>
  );
};


export const overflowTestWrapper: Decorator = (Story, storyContext) => {
  const height = storyContext.viewMode === 'story' ? '100vh' : '100px';
  const width = storyContext.viewMode === 'story' ? '100vw' : '100%';
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', width, height }}>{Story()}</div>
  );
};

export const cardSelectWrapper: Decorator = (Story, storyContext) => {
  const height = storyContext.viewMode === 'story' ? '100vh' : '200px';
  const width = storyContext.viewMode === 'story' ? '100vw' : '100%';
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width, height }}>{Story()}</div>
  );
};

export const variableHeightDecorator: Decorator = (Story, storyContext) => {
  const wrapperHeight = storyContext.args.variableHeight as string || '800px';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: wrapperHeight,
      }}
    >
      {Story()}
    </div>
  );
};

export const buttonDecorator: Decorator = (Story, storyContext) => {
  const lightTypes = ['tertiary-white', 'ghost-white'];
  const backgroundColor = lightTypes.includes(storyContext.args.type as string)
    ? theme.palette['grey-600']
    : 'transparent';
  const height = storyContext.viewMode === 'story' ? '100vh' : '100px';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
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

export const greyBackgroundDecorator: Decorator = (Story, storyContext) => {
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

export const cardDecorator: Decorator = (Story, storyContext) => {
  const decoratorProps = storyContext?.args?.decoratorProps || {};
  return <Card {...decoratorProps}>{Story()}</Card>;
};

export const gappedColumnDecorator: Decorator = Story => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
      }}
    >
      {Story()}
    </div>
  );
};

export const sideBySide: Decorator = Story => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
      }}
    >
      {Story()}
    </div>
  );
};
