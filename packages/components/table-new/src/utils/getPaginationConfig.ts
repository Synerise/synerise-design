import { DEFAULT_PAGINATION_CONFIG } from '../Table.const';
import { type TablePaginationConfig } from '../Table.types';

export const getPaginationConfig = (
  pagination?: TablePaginationConfig | boolean,
) => {
  if (!pagination) {
    return {
      initialState: {},
    };
  }
  return pagination === true
    ? DEFAULT_PAGINATION_CONFIG
    : {
        initialState: {
          pagination: {
            pageSize: pagination.pageSize,
          },
        },
        ...pagination,
      };
};
