import React from 'react';

import Icon, { AngleDownS, AngleUpS } from '@synerise/ds-icon';

import * as ItemStyles from '../Item/Item.styles';
import * as S from './NavigableItems.styles';

type NavigableItemsProps = {
  onHideMenu: () => void;
  children: React.ReactNodeArray;
};

const itemHeight = 64;
const animationTime = 100;

const NavigableItems: React.FC<NavigableItemsProps> = ({
  children,
  onHideMenu,
}) => {
  const ref = React.useRef<HTMLUListElement>(null);
  const [itemsCapacity, setItemsCapacity] = React.useState(Infinity);
  const [currentIndex, setIndex] = React.useState(0);
  const isNavigateTopVisible = currentIndex > 0;
  const isNavigateBottomVisible =
    currentIndex + itemsCapacity <= children.length;
  const [animationInProgress, setAnimationInProgress] = React.useState('');
  const [lastHeight, setLastHeight] = React.useState(0);

  const countCapacity = React.useCallback(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      if (height > 0) {
        setLastHeight(height);
      }
      const itemsHeight = children.length * itemHeight;
      setIndex(0);

      if (itemsHeight > height) {
        setItemsCapacity(Math.floor((height || lastHeight) / itemHeight));
      } else {
        setItemsCapacity(Infinity);
      }
    }
  }, [children.length, ref, lastHeight, setLastHeight]);

  React.useEffect(() => {
    window.addEventListener('resize', countCapacity);

    return (): void => window.removeEventListener('resize', countCapacity);
  }, [countCapacity]);

  React.useEffect(() => {
    countCapacity();
  }, [countCapacity]);

  const handelNavigateBottom = (): void => {
    setAnimationInProgress('bottom');

    setTimeout(() => {
      setAnimationInProgress('');
      setIndex(currentIndex ? currentIndex + 1 : currentIndex + 2);
      onHideMenu();
    }, animationTime);
  };

  const handleNavigateTop = (): void => {
    setAnimationInProgress('top');

    setTimeout(() => {
      setAnimationInProgress('');
      setIndex(currentIndex === 2 ? 0 : currentIndex - 1);
      onHideMenu();
    }, animationTime);
  };

  if (itemsCapacity < children.length) {
    return (
      <S.Wrapper ref={ref} className={`animation--${animationInProgress}`}>
        {isNavigateTopVisible && (
          <ItemStyles.ItemWrapper
            onClick={handleNavigateTop}
            className="nav-button nav-button--top"
          >
            <ItemStyles.ItemLink>
              <Icon component={<AngleUpS />} />
            </ItemStyles.ItemLink>
          </ItemStyles.ItemWrapper>
        )}
        {React.Children.toArray(children).splice(
          currentIndex,
          itemsCapacity -
            (isNavigateBottomVisible && isNavigateTopVisible ? 2 : 1),
        )}
        {isNavigateBottomVisible && (
          <ItemStyles.ItemWrapper
            onClick={handelNavigateBottom}
            className="nav-button nav-button--bottom"
          >
            <ItemStyles.ItemLink>
              <Icon component={<AngleDownS />} />
            </ItemStyles.ItemLink>
          </ItemStyles.ItemWrapper>
        )}
      </S.Wrapper>
    );
  }

  return <S.Wrapper ref={ref}>{children}</S.Wrapper>;
};

export default NavigableItems;
