import Menu from '@synerise/ds-menu';
import { array, text } from '@storybook/addon-knobs';
import * as React from 'react';
import { getDefaultProps } from '../index.stories';

const withBreadcrumb = () => {
  const defaultProps = getDefaultProps();
  return (
    <div style={{ background: 'rgba(0,0,0,0)', width: '200px', borderRadius: '3px', overflow: 'hidden' }}>
      <Menu>
        <Menu.Breadcrumb
          onPathClick={item => {
            console.log('Clicked', item);
          }}
          description={text('Set description', 'Description')}
          path={array('Set path', ['Home', 'Electronics', 'Smartphones'])}
          highlight={text('Set text to be highlighted', 'Desc')}
          compact
          gradientOverlap
          highlightActivePath
          {...defaultProps}
        />
      </Menu>
    </div>
  );
};
export default withBreadcrumb;
