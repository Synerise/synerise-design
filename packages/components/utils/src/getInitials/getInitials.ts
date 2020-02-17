const getInitials = (firstname = '', lastname = ''): string => {
  const fName = typeof firstname === 'string' ? firstname : '';
  const lName = typeof lastname === 'string' ? lastname : '';

  return `${fName[0] || ''}${lName[0] || ''}`.toUpperCase();
};

export default getInitials;
