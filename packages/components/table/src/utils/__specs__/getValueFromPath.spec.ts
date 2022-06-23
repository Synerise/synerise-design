import { getValueFromPath } from '../getValueFromPath';

const data = {
  id: 1,
  name: 'John',
  address: {
    street: '5th avenue',
    number: 123,
  },
};

describe('Get value from path', () => {
  it('should return id', () => {
    const value = getValueFromPath(data, 'id');
    expect(value).toBe(1);
  });
  it('should return name', () => {
    const value = getValueFromPath(data, 'name');
    expect(value).toBe('John');
  });
  it('should return street name', () => {
    const value = getValueFromPath(data, ['address', 'street']);
    expect(value).toBe('5th avenue');
  });
  it('should return street number', () => {
    const value = getValueFromPath(data, ['address', 'number']);
    expect(value).toBe(123);
  });
  it('should return default value', () => {
    const value = getValueFromPath(data, ['address', 'street', 'nonExistingProperty']);
    expect(value).toBe('');
  });
});
