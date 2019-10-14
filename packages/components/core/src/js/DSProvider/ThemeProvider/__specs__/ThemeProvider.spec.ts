import theme from '../theme';

describe('ThemeProvier', () => {
  it('should match snapshot', () => {
    // ASSERT
    expect(theme).toMatchSnapshot();
  });
});
