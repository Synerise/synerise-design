import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { Props as ButtonProps } from '@synerise/ds-button/dist/Button.types';
import { ArrowUpCircleM } from '@synerise/ds-icon/dist/icons';
import { TableLocaleContext } from '../utils/locale';

export const BackToTopButton = (props: ButtonProps): React.ReactElement => (
  <TableLocaleContext.Consumer>
    {(tableLocale): React.ReactElement => (
      <Button
        {...props}
        style={{
          position: 'absolute',
          right: -16,
          bottom: -16,
        }}
        type="custom-color"
        mode="icon-label"
        color='grey'
        icon={<Icon component={<ArrowUpCircleM />} />}
      >
        {tableLocale.infiniteScrollBackToTop}
      </Button>
    )}
  </TableLocaleContext.Consumer>
);

export default BackToTopButton;