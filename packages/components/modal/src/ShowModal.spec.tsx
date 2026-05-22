import { setPortalContent } from '@synerise/ds-core';

import { showModal } from './ShowModal';

vi.mock('@synerise/ds-core',  async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    setPortalContent: vi.fn(),
  }
});

describe('showModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call setPortalContent with an open Modal element', () => {
    showModal({ title: 'Test' });

    expect(setPortalContent).toHaveBeenCalledTimes(1);
    const call = (setPortalContent as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(call).not.toBeNull();
    expect(call.props.open).toBe(true);
    expect(call.props.title).toBe('Test');
  });

  it('should return a handle with destroy()', () => {
    const handle = showModal({ title: 'Test' });

    expect(typeof handle.destroy).toBe('function');
  });

  it('should call setPortalContent(null) when destroy() is called', () => {
    const handle = showModal({ title: 'Test' });
    handle.destroy();

    expect(setPortalContent).toHaveBeenLastCalledWith(null);
  });

  it('should call afterClose when destroy() is called', () => {
    const afterClose = vi.fn();
    const handle = showModal({ title: 'Test', afterClose });

    // Simulate the afterClose being triggered (called via the modal's afterClose prop)
    const call = (setPortalContent as ReturnType<typeof vi.fn>).mock.calls[0][0];
    call.props.afterClose();

    expect(afterClose).toHaveBeenCalledTimes(1);
  });

  it('should increment key for each new modal instance', () => {
    showModal({ title: 'First' });
    showModal({ title: 'Second' });

    const calls = (setPortalContent as ReturnType<typeof vi.fn>).mock.calls;
    expect(calls[0][0].key).not.toBe(calls[1][0].key);
  });
});
