import React from 'react';
import { theme } from '@synerise/ds-core';

export const fixedWrapper200 = (Story, storyContext) => (
    <div style={{width: '200px'}}>{Story()}</div>
);

export const fixedWrapper400 = (Story, storyContext) => (
    <div style={{width: '400px'}}>{Story()}</div>
);

export const fixedWrapper588 = (Story, storyContext) => (
    <div style={{width: '588px'}}>{Story()}</div>
);

export const centeredPaddedWrapper = (Story, storyContext) => {
    const height = storyContext.viewMode === 'story' ? '100vh' : '100px'
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height}}>{Story()}</div>
    )
};

export const buttonDecorator = (Story, storyContext) => {
    const lightTypes = ['tertiary-white', 'ghost-white'];
    const backgroundColor = lightTypes.includes(storyContext.args.type) ? theme.palette['grey-600'] : 'transparent';
    const height = storyContext.viewMode === 'story' ? '100vh' : '100px'
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height, backgroundColor: backgroundColor}}>{Story()}</div>
    )
};