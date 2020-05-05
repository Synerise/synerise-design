import escapeRegex from '../regex';

describe('escapeRegex', () => {
  it('should escape brackets', () => {
    expect(escapeRegex('some(',)).toBe('some\\(');
  });
  it('should escape curly braces', () => {
    expect(escapeRegex('some{',)).toBe('some\\{');
  });
  it('should escape double curly braces', () => {
    expect(escapeRegex('some{}',)).toBe('some\\{\\}');
  });
  it('should escape slash', () => {
    expect(escapeRegex('some/',)).toBe('some\\/');
  });
  it('should escape dot', () => {
    expect(escapeRegex('some.',)).toBe('some\\.');
  });
});
