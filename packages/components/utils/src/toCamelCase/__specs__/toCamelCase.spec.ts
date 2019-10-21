import toCamelCase from '../toCamelCase';

describe('toCamelCase', () => {
  it('should function return camel case string converted from kebab case', () => {
    expect(toCamelCase('kebab-case-string')).toBe('kebabCaseString');
  });
  it('should function return camel case string converted from snake case', () => {
    expect(toCamelCase('snake_case_string')).toBe('snakeCaseString');
  });
  it('should function return camel case string converted from mixed case', () => {
    expect(toCamelCase('mixed_case-string')).toBe('mixedCaseString');
  });
});
