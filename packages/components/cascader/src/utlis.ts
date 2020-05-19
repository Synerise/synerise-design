
export const searchCategoryWithId = (
  category: object & { id: string | number },
  id: string | number
): object | undefined => {
  if (category.id === id) {
    return category;
  }
  let result, property;
  const keys = Object.keys(category);
  for (let i = 0; i < keys.length; i += 1) {
    property = keys[i];
    if (Object.prototype.hasOwnProperty.call(category, property) && typeof category[property] === 'object') {
      result = searchCategoryWithId(category[property], id);
      if (result) {
        return result;
      }
    }
  }
  return result;
};

export const searchCategoryWithText = (category: object & { path: string[] }, text: string): object | undefined => {
  if (category.path && category.path.some(p => p.toLowerCase().includes(text.toLowerCase()))) {
    return category;
  }
  let result, property;
  const keys = Object.keys(category);
  for (let i = 0; i < keys.length; i += 1) {
    property = keys[i];
    if (Object.prototype.hasOwnProperty.call(category, property) && typeof category[property] === 'object') {
      result = searchCategoryWithText(category[property], text);
      if (result) {
        return result;
      }
    }
  }
  return result;
};

export const getAllPaths = (category: { path: string[] }, resultsArray?: string[][]): string[][] | undefined => {
  let results: string[][] | undefined = resultsArray || [];
  if (category.path && category.path.length > 0) {
    results.push(category.path);
  }
  let property;
  const keys = Object.keys(category);
  for (let i = 0; i < keys.length; i += 1) {
    property = keys[i];
    if (Object.prototype.hasOwnProperty.call(category, property) && typeof category[property] === 'object') {
      results = getAllPaths(category[property],results);
    }
  }
  return (results && results.length > 0) ? results : undefined;
};
export const filterPaths = (paths: string[][], searchQuery: string): string[][] => {
 return paths.filter(path=>path.some(p=>p.toLowerCase().includes(searchQuery.toLowerCase()) && path.indexOf(p)===(path.length-1)
 ))
};
