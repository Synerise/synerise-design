import moment from 'moment';

const randomDate = () => {
  return moment(new Date(+new Date() - Math.floor(Math.random() * 10000000000))).format();
};

export default randomDate;
