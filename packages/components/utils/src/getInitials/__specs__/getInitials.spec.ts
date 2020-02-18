import getInitials from '../getInitials';

describe('toCamelCase', () => {
  it('should return uppercased initials of fullname', () => {
    expect(getInitials('jan', 'nowak')).toBe('JN');
  });
  it('should return uppercased first letter of firstname', () => {
    expect(getInitials('jan', '')).toBe('J');
  });
  it('should return uppercased first letter of lastname', () => {
    expect(getInitials('', 'N')).toBe('N');
    expect(getInitials('', '')).toBe('');
  });
  it('should return empty string', () => {
    expect(getInitials('', '')).toBe('');
    expect(getInitials()).toBe('');
  });
});
