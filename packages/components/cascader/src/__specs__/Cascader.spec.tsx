const mock = {
  id: 0,
  name: 'Home',
  path: ['Home'],
  phone: {
    path: ['Phone'],
    id: 1,
    name: 'Phone',
    Cables: {
      path: ['Phone', 'Cables'],
      name: 'Cables',
      id: 11,
    },
  },
};
describe('Cascader', () => {
  it('should pass the test which will be written later', async () => {
    // ARRANGE
    // const { getByText } = renderWithProvider(<Cascader rootCategory={mock as Category}/>);
    expect(mock).toBeTruthy();
    // ASSERT
    // expect(getByText('Nasted')).toBeTruthy();
  });
});
