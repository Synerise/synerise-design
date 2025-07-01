const getDateFromString = (dateOrString: Date | string | undefined): Date =>
  dateOrString instanceof Date
    ? dateOrString
    : new Date(dateOrString as string);
export default getDateFromString;
