import { generateUuid } from '../generateUuid';

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe('generateUuid', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('delegates to crypto.randomUUID when it is available', () => {
    const randomUUID = vi
      .spyOn(crypto, 'randomUUID')
      .mockReturnValue('11111111-1111-4111-8111-111111111111');

    expect(generateUuid()).toBe('11111111-1111-4111-8111-111111111111');
    expect(randomUUID).toHaveBeenCalledTimes(1);
  });

  it('builds a v4 UUID from crypto.getRandomValues outside a secure context', () => {
    // Insecure contexts (plain http) expose getRandomValues but not randomUUID.
    const realGetRandomValues = crypto.getRandomValues.bind(crypto);
    const getRandomValues = vi.fn(<T extends ArrayBufferView>(bytes: T) =>
      realGetRandomValues(bytes),
    );
    vi.stubGlobal('crypto', { getRandomValues });

    const ids = Array.from({ length: 500 }, generateUuid);

    expect(getRandomValues).toHaveBeenCalledTimes(500);
    ids.forEach((id) => expect(id).toMatch(UUID_V4));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('sets the version and variant bits whatever the random bytes are', () => {
    vi.stubGlobal('crypto', {
      getRandomValues: <T extends ArrayBufferView>(bytes: T) => {
        new Uint8Array(bytes.buffer).fill(0xff);
        return bytes;
      },
    });

    expect(generateUuid()).toBe('ffffffff-ffff-4fff-bfff-ffffffffffff');
  });

  it('falls back to Math.random when there is no crypto at all', () => {
    vi.stubGlobal('crypto', undefined);
    const random = vi.spyOn(Math, 'random');

    const id = generateUuid();

    expect(id).toMatch(UUID_V4);
    expect(random).toHaveBeenCalledTimes(16);
  });
});
