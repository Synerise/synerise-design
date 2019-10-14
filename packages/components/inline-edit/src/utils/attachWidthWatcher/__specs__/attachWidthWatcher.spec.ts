import { attachWidthWatcher } from '../../../utils';

describe('attachWidthWatcher', () => {
  it('should watcher created', () => {
    const div = document.createElement("div");
    div.innerHTML = 'test';
    div.setAttribute('style','position: absolute');
    const testFunction = jest.fn();
    expect(attachWidthWatcher(div, testFunction)).toMatchObject([1024, 768]);
  });
});
