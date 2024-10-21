import theme from '../theme';

describe('ThemeProvier', () => {
  it('should match snapshot', () => {
    expect(theme).toMatchSnapshot();
  });
});
