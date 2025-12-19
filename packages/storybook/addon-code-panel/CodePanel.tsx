import React, { useCallback } from 'react';
import { useStorybookApi } from 'storybook/manager-api';

type CodePanelProps = {
  isActive: boolean;
};

export const CodePanel = ({ isActive }: CodePanelProps) => {
  const api = useStorybookApi();

  const currentStory = api?.getCurrentStoryData();

  if (!isActive) {
    return null;
  }

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>
        Component Code
      </h2>

      {currentStory && (
        <div>
          {currentStory.parameters?.docs?.source?.code && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#fafafa',
                borderRadius: '4px',
                fontSize: '12px',
                border: '1px solid #e0e0e0',
                overflow: 'auto',
              }}
            >
              <code
                style={{
                  display: 'block',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'monospace',
                  color: '#333',
                  lineHeight: '1.4',
                }}
              >
                {currentStory.parameters.docs.source.code}
              </code>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
