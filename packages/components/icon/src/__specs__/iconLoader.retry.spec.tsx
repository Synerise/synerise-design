import { afterEach, vi } from 'vitest';

// Isolated in its own file: each case resets the module registry to get a fresh loader cache, and
// mocks a chunk into failing. Both would leak into the other specs' expectations otherwise.
describe('iconLoader — a failed chunk fetch is retried, not cached', () => {
  afterEach(() => {
    vi.doUnmock('../icons/iconSets');
    vi.doUnmock('../icons/colorIcons');
    vi.resetModules();
  });

  it('retries the name -> set index', async () => {
    vi.resetModules();
    let attempts = 0;
    vi.doMock('../icons/iconSets', () => {
      attempts += 1;
      if (attempts === 1) {
        throw new Error('simulated chunk load failure');
      }
      return { iconSets: { ABtestColor: 'colorIcons' } };
    });

    const { loadIconComponent } = await import('../iconLoader');

    await expect(loadIconComponent('ABtestColor')).resolves.toBeNull();
    // Without evicting the rejected promise this stays null forever.
    await expect(loadIconComponent('ABtestColor')).resolves.toBeTypeOf(
      'function',
    );
    expect(attempts).toBe(2);
  });

  it('retries an icon set barrel', async () => {
    vi.resetModules();
    let attempts = 0;
    const actual = await vi.importActual<Record<string, unknown>>(
      '../icons/colorIcons',
    );
    vi.doMock('../icons/colorIcons', () => {
      attempts += 1;
      if (attempts === 1) {
        throw new Error('simulated chunk load failure');
      }
      return actual;
    });

    const { loadIconComponent } = await import('../iconLoader');

    await expect(loadIconComponent('ABtestColor')).resolves.toBeNull();
    await expect(loadIconComponent('ABtestColor')).resolves.toBeTypeOf(
      'function',
    );
    expect(attempts).toBe(2);
  });
});
