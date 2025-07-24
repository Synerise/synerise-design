import { type Category, type Path } from './Cascader.types';

export const searchCategoryWithId = (
  category: Category,
  id: string | number,
): Category | undefined => {
  if (id === undefined) {
    return undefined;
  }
  if (category.id === id) {
    return category;
  }
  let result, property;
  const keys = Object.keys(category);
  for (let i = 0; i < keys.length; i += 1) {
    property = keys[i];
    if (
      Object.prototype.hasOwnProperty.call(category, property) &&
      // @ts-expect-error rootCategory is in fact more than what Category type defines
      // apart from id, name and path it can have nested categories with any key
      // STOR-1904
      typeof category[property] === 'object'
    ) {
      // @ts-expect-error rootCategory is in fact more than what Category type defines
      // apart from id, name and path it can have nested categories with any key
      // STOR-1904
      result = searchCategoryWithId(category[property], id);
      if (result) {
        return result;
      }
    }
  }
  return result;
};

export const getAllPaths = (
  category: Category,
  resultsArray?: Path[],
): Path[] | undefined => {
  let results: Path[] | undefined = resultsArray || [];
  if (category.path && category.path.length > 0) {
    results.push({ path: category.path, id: category.id });
  }
  let property;
  const keys = Object.keys(category);
  for (let i = 0; i < keys.length; i += 1) {
    property = keys[i];
    if (
      Object.prototype.hasOwnProperty.call(category, property) &&
      // @ts-expect-error rootCategory is in fact more than what Category type defines
      // apart from id, name and path it can have nested categories with any key
      // STOR-1904
      typeof category[property] === 'object'
    ) {
      // @ts-expect-error rootCategory is in fact more than what Category type defines
      // apart from id, name and path it can have nested categories with any key
      // STOR-1904
      results = getAllPaths(category[property], results);
    }
  }
  return results && results.length > 0 ? results : undefined;
};

export const filterPaths = (paths: Path[], searchQuery: string): Path[] => {
  const pathsToBeFiltered = [...paths];
  const filtered = pathsToBeFiltered.filter((p) => {
    const productPath = p.path;
    const lastElementOfPath = productPath[productPath.length - 1];
    return (
      productPath &&
      lastElementOfPath &&
      lastElementOfPath.toLowerCase().includes(searchQuery)
    );
  });
  return filtered;
};
export const hasNestedCategories = (category: Category): boolean => {
  let property;
  const keys = Object.keys(category);
  for (let i = 0; i < keys.length; i += 1) {
    property = keys[i];
    if (
      Object.prototype.hasOwnProperty.call(category, property) &&
      // @ts-expect-error rootCategory is in fact more than what Category type defines
      // apart from id, name and path it can have nested categories with any key
      typeof category[property] === 'object' &&
      // @ts-expect-error rootCategory is in fact more than what Category type defines
      // apart from id, name and path it can have nested categories with any key
      Object.prototype.toString.call(category[property]) === '[object Object]'
    ) {
      return true;
    }
  }
  return false;
};
