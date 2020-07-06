import * as moment from 'moment';

export const formatTime = (seconds: number, format = 'HH:mm:ss') => {
  return moment.utc(seconds * 1000).format(format);
};

