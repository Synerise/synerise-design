import { waitFor as _waitFor } from "@storybook/test";

export const waitFor = <T>(
  callback: () => T | Promise<T>,
  options?: Parameters<typeof _waitFor>[1]
): Promise<T> => {
  return _waitFor(callback, {
    ...options,
    timeout: 500,
  });
};

export const sleep = (duration = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
}