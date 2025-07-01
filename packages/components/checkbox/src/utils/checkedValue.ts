export function checkedValue(
  checked: boolean,
  indeterminate: boolean,
): boolean | undefined {
  return indeterminate ? undefined : checked;
}
