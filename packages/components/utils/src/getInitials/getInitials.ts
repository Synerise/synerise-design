const getInitials = (firstname = '', lastname = ''): string => {
  const getFirstLetter = (text: string): string => {
    return typeof text === 'string' && text.length > 0 ? text[0] : '';
  };
  return `${getFirstLetter(firstname)}${getFirstLetter(lastname)}`.toUpperCase();
};

export default getInitials;
