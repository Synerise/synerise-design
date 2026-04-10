import React, { type ReactNode } from 'react';

export const chromaticCellRender = (record: ReactNode) => (
  <div className="chromatic-ignore">{record}</div>
);
