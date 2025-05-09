import React, { useState } from 'react';
import useInterval from "@use-it/interval";
import { controlFromOptionsArray } from '../../utils';

export const iconSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L'
};

export const fontSizes = {
  Small: 'small',
  Medium: 'medium',
};

export const COLOR_OPTIONS = {
  ...controlFromOptionsArray('select', ['', 'grey', 'red', 'green', 'yellow', 'blue', 'pink', 'mars', 'orange', 'fern', 'cyan', 'purple', 'violet']),
};

export const Counter = ({ delay = 100 }) => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount((currentCount) => {
      const maxCount = 100
      if (currentCount === maxCount) { return 0 }
      return currentCount + 1
    })
  }, delay);

  return <span className='chromatic-ignore'>{count}%</span>;
};

export const formatter = () => {
  return <Counter />
}