import { DEFAULT_PAGINATION_CONFIG } from '../../Table.const';
import { getPaginationConfig } from '../getPaginationConfig';

describe('getPaginationConfig', () => {
  it('should return empty initialState when pagination is undefined', () => {
    expect(getPaginationConfig()).toEqual({ initialState: {} });
  });

  it('should return empty initialState when pagination is false', () => {
    expect(getPaginationConfig(false)).toEqual({ initialState: {} });
  });

  it('should return default config when pagination is true', () => {
    expect(getPaginationConfig(true)).toEqual(DEFAULT_PAGINATION_CONFIG);
  });

  it('should return custom config with pageSize', () => {
    const result = getPaginationConfig({ pageSize: 25 });
    expect(result).toEqual({
      initialState: { pagination: { pageSize: 25 } },
      pageSize: 25,
    });
  });

  it('should spread custom pagination properties', () => {
    const config = { pageSize: 50, showTotal: true };
    const result = getPaginationConfig(config as any);
    expect(result.initialState).toEqual({ pagination: { pageSize: 50 } });
    expect((result as any).showTotal).toBe(true);
  });
});
