import React from 'react';
import { MenuProps } from 'antd/lib/menu';

import Icon, { CheckS, ShowM, ShowCheckM, HideM } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { NOOP } from '@synerise/ds-utils';

import { TagVisibility } from '../../../TagsList.types';
import { VisibilityProps } from '../Actions.types';

import * as S from '../Actions.styles';

export const CheckIcon: React.FC = () => <Icon color={theme.palette['green-600']} component={<CheckS />} />;

const visibilityIcons = {
  [TagVisibility.Show]: ShowM,
  [TagVisibility.ShowIfUsed]: ShowCheckM,
  [TagVisibility.Hide]: HideM,
};

const Visibility: React.FC<VisibilityProps> = ({ texts, onVisibilityChange = NOOP, item }) => {
  const visibilities = {
    [TagVisibility.Show]: texts?.visibilityShow,
    [TagVisibility.Hide]: texts?.visibilityHide,
    [TagVisibility.ShowIfUsed]: texts?.visibilityShowIfUsed,
  };

  const [stateVisibility, setVisibility] = React.useState(item.visibility);

  return (
    <>
      {Object.keys(visibilities).map((key: string) => {
        const text = visibilities[key];
        const dropdownMenuItemClick: MenuProps['onClick'] = (event): void => {
          event.domEvent.stopPropagation();
          const vis = key as TagVisibility;
          setVisibility(vis);
          onVisibilityChange(vis, item);
        };
        const IconComponent = visibilityIcons[key];

        return (
          <S.DropdownMenuItem
            key={key}
            prefixel={<Icon component={<IconComponent />} />}
            suffixel={stateVisibility === key && CheckIcon}
            onClick={dropdownMenuItemClick}
          >
            {text}
          </S.DropdownMenuItem>
        );
      })}
    </>
  );
};

export default React.memo(Visibility);
