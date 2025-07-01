export function nextCheckedValues(
  checked: boolean | undefined,
  indeterminate: boolean,
): [boolean, boolean] {
  if (checked === false) {
    return [true, false];
  }
  if (checked === true && !indeterminate) {
    return [true, true];
  }
  return [false, false];
}
