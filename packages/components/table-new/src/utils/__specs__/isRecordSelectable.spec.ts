import { isRecordSelectable } from '../isRecordSelectable';

describe('isRecordSelectable', () => {
  const record = { id: '1', name: 'test' };

  it('should return true when no checkFn provided', () => {
    expect(isRecordSelectable(record)).toBe(true);
  });

  it('should return true for a normal selectable record', () => {
    const checkFn = () => ({});
    expect(isRecordSelectable(record, checkFn)).toBe(true);
  });

  it('should return false for unavailable record', () => {
    const checkFn = () => ({ unavailable: true });
    expect(isRecordSelectable(record, checkFn)).toBe(false);
  });

  it('should return false for disabled record', () => {
    const checkFn = () => ({ disabled: true });
    expect(isRecordSelectable(record, checkFn)).toBe(false);
  });

  it('should return false when both unavailable and disabled', () => {
    const checkFn = () => ({ unavailable: true, disabled: true });
    expect(isRecordSelectable(record, checkFn)).toBe(false);
  });
});
