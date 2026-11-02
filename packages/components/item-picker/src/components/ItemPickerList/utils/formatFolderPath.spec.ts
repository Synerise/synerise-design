import { formatFolderPath } from './formatFolderPath';

describe('formatFolderPath', () => {
  it('joins a short path with " / "', () => {
    expect(formatFolderPath(['All', 'Folder 1', 'Folder 1.1'])).toEqual({
      label: 'All / Folder 1 / Folder 1.1',
      fullPath: 'All / Folder 1 / Folder 1.1',
    });
  });

  it('collapses the middle of a long path, keeping the full one for the tooltip', () => {
    const steps = ['All', 'A', 'B', 'C', 'D'];
    expect(formatFolderPath(steps)).toEqual({
      label: 'All / … / C / D',
      fullPath: 'All / A / B / C / D',
    });
  });
});
