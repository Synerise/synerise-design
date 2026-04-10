import { type ScrollDirection } from '../Table.types';

export const getIsRevealed = ({
  scrollDirection,
  hasData,
}: {
  hasData: boolean;
  scrollDirection: ScrollDirection;
}): boolean => {
  return hasData && scrollDirection === 'backward';
};
