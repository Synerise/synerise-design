import { getPopupContainer } from './getPopupContainer';

describe('getPopupContainer utility', () => {
  it('searches for closest parent with data-popup-container attribute', () => {
    document.body.innerHTML = `
      <div id="A">
        <div id="B" data-popup-container>
          <div id="C">
            <div id="popup"></div>
          </div>
        </div>
      </div>
    `;

    expect(getPopupContainer(document.getElementById('popup')).id).toBe('B');
  });

  it('returns document body when no parent is designated as a popup container', () => {
    document.body.innerHTML = `
      <div id="A">
        <div id="B">
          <div id="C">
            <div id="popup"></div>
          </div>
        </div>
      </div>
    `;

    expect(getPopupContainer(document.getElementById('popup'))).toBe(document.body);
  });
});
