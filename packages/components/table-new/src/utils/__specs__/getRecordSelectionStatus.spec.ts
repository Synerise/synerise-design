import { getRecordSelectionStatus } from '../getRecordSelectionStatus';

describe('getRecordSelectionStatus', () => {
  const record = { id: '1', name: 'test' };

  it('should return undefined for both when no checkFn provided', () => {
    const result = getRecordSelectionStatus(undefined, record);
    expect(result).toEqual({ unavailable: undefined, disabled: undefined });
  });

  it('should return unavailable when checkFn returns unavailable', () => {
    const checkFn = () => ({ unavailable: true });
    const result = getRecordSelectionStatus(checkFn, record);
    expect(result.unavailable).toBe(true);
    expect(result.disabled).toBeUndefined();
  });

  it('should return disabled when checkFn returns disabled', () => {
    const checkFn = () => ({ disabled: true });
    const result = getRecordSelectionStatus(checkFn, record);
    expect(result.disabled).toBe(true);
    expect(result.unavailable).toBeUndefined();
  });

  it('should pass record to checkFn', () => {
    const checkFn = vi.fn(() => ({}));
    getRecordSelectionStatus(checkFn, record);
    expect(checkFn).toHaveBeenCalledWith(record);
  });
});
