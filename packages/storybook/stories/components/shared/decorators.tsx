import React from 'react';


export const fixedWrapper200 = (Story, storyContext) => (
    <div style={{width: '200px'}}>{Story()}</div>
);

export const fixedWrapper400 = (Story, storyContext) => (
    <div style={{width: '400px'}}>{Story()}</div>
);

export const fixedWrapper588 = (Story, storyContext) => (
    <div style={{width: '588px'}}>{Story()}</div>
);