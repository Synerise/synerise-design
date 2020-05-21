import { Path } from 'Cascader.types';

export const searchCategoryWithId = (category: { id: string | number }, id: string | number): object | undefined => {
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

export const getAllPaths = (
  category: Path,
  resultsArray?: Path[]
): Path[] | undefined => {
  let results: Path[] | undefined = resultsArray || [];
  if (category.path && category.path.length > 0) {
    results.push({ path: category.path, id: category.id });
  }
  let property;
  const keys = Object.keys(category);
  for (let i = 0; i < keys.length; i += 1) {
    property = keys[i];
    if (Object.prototype.hasOwnProperty.call(category, property) && typeof category[property] === 'object') {
      results = getAllPaths(category[property], results);
    }
  }
  return results && results.length > 0 ? results : undefined;
};
export const filterPaths = (paths: Path[], searchQuery: string): Path[]=> {
  const pathsToBeFiltered = [...paths];
  console.log('Filtering data...',pathsToBeFiltered)
  console.log('Filtering with...',searchQuery)
  const filtered = pathsToBeFiltered.filter(p => {
    const productPath = p.path;
    const lastElementOfPath = productPath[productPath.length-1];
    return productPath && lastElementOfPath && lastElementOfPath.toLowerCase().includes(searchQuery);
  });
  console.log(filtered);
  return filtered;
};
