import * as React from 'react';
import { Flex, Box } from '@rebass/grid';
import Tooltip from '@synerise/ds-tooltip';
import { ItemContainer, ItemCount, ItemTitle } from './Item.styles';
import type { Props } from './Item.types';

const Item: React.FC<Props> =({ title, value }) => {
    return (
      <ItemContainer>
        <Flex flexWrap="wrap" alignItems="center" justifyContent="space-between">
          <Box>
            <Tooltip title={title}>
              <ItemTitle>{title}</ItemTitle>
            </Tooltip>
          </Box>
          <Box>{value !== undefined && <ItemCount>{`${value}`}</ItemCount>}</Box>
        </Flex>
      </ItemContainer>
    );
}

export default Item;
