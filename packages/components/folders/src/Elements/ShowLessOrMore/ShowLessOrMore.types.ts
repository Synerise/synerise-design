export type Props = {
  onShowMore: (more: number) => void;
  onShowLess: (less: number) => void;
  totalItemsCount: number;
  visibleItemsCount: number;
  step: number;
  texts: {
    showLessLabel?: string | React.ReactNode;
    showMoreLabel?: string | React.ReactNode;
    less?: string | React.ReactNode;
    more?: string | React.ReactNode;
  };
};
