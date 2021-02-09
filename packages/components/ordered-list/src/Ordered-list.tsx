import * as React from 'react';
import { select } from '@storybook/addon-knobs';
import * as S from './Ordered-list.styles';
import { OrderedListProps } from './Ordered-list.types';
import Check3M from '@synerise/ds-icon/dist/icons/Check3M';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Close3S from '@synerise/ds-icon/dist/icons/Close3S';
import CheckS from '@synerise/ds-icon/dist/icons/CheckS';

const OrderedList: React.FC<OrderedListProps> = ({ list, options,content }) => {
  const number = [{ label: '1. ' }, { label: '2. ' }, { label: '3. ' }, { label: '4. ' }];
  const withZeros = [{ label: '01. ' }, { label: '02. ' }, { label: '03. ' }, { label: '04. ' }];
  const withLetters = [{ label: 'a. ' }, { label: 'b. ' }, { label: 'c. ' }, { label: 'd. ' }];
  const withRomanian = [{ label: 'I. ' }, { label: 'II. ' }, { label: 'III. ' }, { label: 'IV. ' }];

  const preffixelType = {
    number: number,
    zeros: withZeros,
    letters: withLetters,
    romanian: withRomanian,
  };

  const dataSource2 = [
    { label: '5. Type something' },
    { label: '6. Type something' },
    { label: '7. Type something' },
    { label: '8. Type something' },
    { label: '9. Type something' },
  ];
  const dataSource3 = [
    { label: '1. Type something' },
    { label: '2. Type something' },
    { label: '3. Type something' },
    { label: '4. Type something' },
  ];
  const dataSource4 = [{ label: 'a. Type something' }, { label: 'b. Type something' }];
  const emoji = [
    {
      icon: (
        <Icon size={18} style={{ marginBottom: '2px' }} color={theme.palette['green-600']} component={<Check3M />} />
      ),
    },
    {
      icon: (
        <Icon size={18} style={{ marginBottom: '2px' }} color={theme.palette['green-600']} component={<Check3M />} />
      ),
    },
  ];
  const icons = [
    {
      icon: <Icon size={20} style={{ marginBottom: '2px' }} color={theme.palette['red-600']} component={<Close3S />} />,
    },
    {
      icon: <Icon size={20} style={{ marginBottom: '2px' }} color={theme.palette['red-600']} component={<Close3S />} />,
    },
  ];
  const check = [
    {
      icon: <Icon size={20} style={{ marginBottom: '2px' }} component={<CheckS />} />,
    },
    {
      icon: <Icon size={20} style={{ marginBottom: '2px' }} component={<CheckS />} />,
    },
  ];
  const Text = 'Type something';
  const selectPreffixType = select('Set Preffix', preffixelType, preffixelType.number);
  return (
    <S.OrderedList>
      <S.OrderedListWrapper>
        {number.map(item => (
          <S.OrderedListItem>
            {item.label}
            {Text}
          </S.OrderedListItem>
        ))}
      </S.OrderedListWrapper>
      {list && (
        <S.OrderedListWrapper>
          {icons.map(item => (
            <S.LowerWrapper>
              {item.icon}
              {Text}
            </S.LowerWrapper>
          ))}
          {options && (
            <S.OrderedListWrapper>
              {check.map(item => (
                <S.OptionWrapper>
                  {item.icon}
                  {Text}
                </S.OptionWrapper>
              ))}
            </S.OrderedListWrapper>
          )}
        </S.OrderedListWrapper>
      )}
      <S.OrderedListWrapper>
        {dataSource2.map(item => (
          <S.OrderedListItem>{item.label}</S.OrderedListItem>
        ))}
      </S.OrderedListWrapper>
    </S.OrderedList>
  );
};
type OrderedListItem = { label: string; index: number; subMenu?: OrderedListItem[] }
type ListProps = {
  data: OrderedListItem[];
}
export const Menu = ({data}: ListProps) => {
  return (
    <S.OrderedList>
      <ul>
        {data.map(item => {
          return (<li>
            {item.label}
            {item.subMenu && <Menu data={item.subMenu} />}
          </li>);
        })}
      </ul>
    </S.OrderedList>
  );
}
export default Menu
