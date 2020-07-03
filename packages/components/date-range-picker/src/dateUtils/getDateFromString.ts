const getDateFromString = (date: Date | string): Date => (date instanceof Date ? date : new Date(date));
export default getDateFromString;
