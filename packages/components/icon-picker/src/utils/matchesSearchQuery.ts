export const matchesSearchQuery = (text: string, searchQuery: string) => {
  return text.toLowerCase().includes(searchQuery.toLowerCase());
};
