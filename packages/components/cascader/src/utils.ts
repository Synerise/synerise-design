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
  if (category.children) {
    for (const child of category.children) {
      const result = searchCategoryWithId(child, id);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
};

export const getAllPaths = (
  category: Category,
  resultsArray?: Path[],
): Path[] | undefined => {
  const results: Path[] = resultsArray || [];
  if (category.path && category.path.length > 0) {
    results.push({ path: category.path, id: category.id });
  }
  if (category.children) {
    for (const child of category.children) {
      getAllPaths(child, results);
    }
  }
  return results.length > 0 ? results : undefined;
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
  return (category.children?.length ?? 0) > 0;
};
