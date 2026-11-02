const FOLDER_PATH_SEPARATOR = ' / ';
const MAX_UNCOLLAPSED_STEPS = 4;

export const formatFolderPath = (steps: string[]) => {
  const fullPath = steps.join(FOLDER_PATH_SEPARATOR);
  const label =
    steps.length <= MAX_UNCOLLAPSED_STEPS
      ? fullPath
      : [steps[0], '…', ...steps.slice(-2)].join(FOLDER_PATH_SEPARATOR);
  return { label, fullPath };
};
