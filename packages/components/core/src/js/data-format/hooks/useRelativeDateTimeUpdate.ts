import { type Dayjs } from 'dayjs';
import { type Moment } from 'moment';
import { useEffect, useState } from 'react';

const getIntervalForTimeDifference = (timeDiffMs: number): number | null => {
  // https://day.js.org/docs/en/display/from-now#list-of-breakdown-range
  const UNDER_45_MINUTES = 45 * 60 * 1000;
  const UNDER_22_HOURS = 22 * 60 * 60 * 1000;

  if (timeDiffMs < UNDER_45_MINUTES) {
    return 60 * 1000; // 60 seconds
  }
  if (timeDiffMs < UNDER_22_HOURS) {
    return 60 * 60 * 1000; // 60 minutes
  }
  return null; // no interval
};

export const useRelativeDateTimeUpdate = (value: Date | Moment | Dayjs) => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    if (!(value instanceof Date)) {
      return;
    }
    const timeDiffMs = Math.abs(value.getTime() - Date.now());
    const interval = getIntervalForTimeDifference(timeDiffMs);
    if (interval === null) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setUpdateTrigger((prev) => prev + 1);
    }, interval);

    return () => clearTimeout(timeoutId);
  }, [value, updateTrigger]);

  return updateTrigger;
};
