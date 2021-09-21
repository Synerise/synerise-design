import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  ListChartContainer,
  ListChartTitle,
  ListChartActions,
  ListChartContent,
  ToggleMoreInfo,
  ToggleMoreBtn,
  ToggleMore,
} from './ListChart.styles';

import { Props } from './ListChart.types';
import Item from './Item/Item';

const ListChart: React.FC<Props> & { Item: React.ReactNode } = ({
  className,
  title,
  actions,
  maxToShow,
  count,
  children,
}) => {
  const [areAllShown, setAreAllShown] = React.useState(false);

  return (
    <ListChartContainer className={className}>
      {title && (
        <ListChartTitle>
          {title}
          {actions && <ListChartActions>{actions}</ListChartActions>}
        </ListChartTitle>
      )}
      <ListChartContent>
        {React.Children.map(children, (item, i) => {
          if (!maxToShow || areAllShown || i + 1 <= maxToShow) {
            return item;
          }
          return false;
        })}

        {!areAllShown && !!maxToShow && !!count && count > maxToShow && (
          <ToggleMore>
            <ToggleMoreInfo>
              <FormattedMessage id="SNRS.LIST.N-MORE" values={{ n: count - maxToShow }} />
            </ToggleMoreInfo>
            <ToggleMoreBtn onClick={(): void => setAreAllShown(true)}>
              <FormattedMessage id="SNRS.LIST.SHOW-ALL" />
            </ToggleMoreBtn>
          </ToggleMore>
        )}

        {areAllShown && !!count && !!maxToShow && (
          <ToggleMore>
            <ToggleMoreInfo>
              <FormattedMessage id="SNRS.LIST.N-LESS" values={{ n: count - maxToShow }} />
            </ToggleMoreInfo>
            <ToggleMoreBtn onClick={(): void => setAreAllShown(false)}>
              <FormattedMessage id="SNRS.LIST.SHOW-LESS" />
            </ToggleMoreBtn>
          </ToggleMore>
        )}
      </ListChartContent>
    </ListChartContainer>
  );
};

ListChart.Item = Item;

export default ListChart;
