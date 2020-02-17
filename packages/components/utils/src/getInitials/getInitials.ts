const getInitials = (firstname = '', lastname = ''): string => {
  const fName = typeof firstname === 'string' ? firstname : '';
  const lName = typeof lastname === 'string' ? lastname : '';

  return `${fName}${lName}`.toUpperCase();
};

export default getInitials;
