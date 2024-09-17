import moment from 'moment';

export const randomDate = () => {
  return moment(new Date(+new Date() - Math.floor(Math.random() * 10000000000))).format();
};
