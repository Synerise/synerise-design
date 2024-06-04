export const sleep = (duration = 300) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => resolve(true), duration);
  });
};
