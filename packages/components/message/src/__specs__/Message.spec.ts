import message from '../index';

describe('Message', () => {
  afterEach(() => {
    message.destroy();
  });
  it('should render success message', () => {
    // ARRANGE
    const msg = 'it works!';

    // ACT
    message.success(msg);

    // ASSERT
    const messageContainer = document.querySelector('.ant-message');
    expect(messageContainer && messageContainer.textContent).toBe(msg);
    expect(document.querySelector('.anticon-check-circle')).toBeTruthy();
  });

  it('should render error message', () => {
    // ARRANGE
    const msg = 'it works!';

    // ACT
    message.error(msg);

    // ASSERT
    const messageContainer = document.querySelector('.ant-message');
    expect(messageContainer && messageContainer.textContent).toBe(msg);
    expect(document.querySelector('.anticon-close-circle')).toBeTruthy();
  });
});
