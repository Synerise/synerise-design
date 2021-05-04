import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { Props as ButtonProps } from '@synerise/ds-button/dist/Button.types';
import { ArrowUpCircleM } from '@synerise/ds-icon/dist/icons';
import * as S from './BackToTopButton.styles';
import { TableLocaleContext } from '../utils/locale';

export const BackToTopButton = (props: ButtonProps): React.ReactElement => (
  <TableLocaleContext.Consumer>
    {(tableLocale): React.ReactElement => (
      <S.OffsetButton
        {...props}
        type="custom-color"
        mode="icon-label"
        color="grey"
        icon={<Icon component={<ArrowUpCircleM />} />}
      >
        {tableLocale.infiniteScrollBackToTop}
      </S.OffsetButton>
    )}
  </TableLocaleContext.Consumer>
);

export default BackToTopButton;
