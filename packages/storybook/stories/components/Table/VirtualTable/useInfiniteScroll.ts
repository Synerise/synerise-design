import { useState } from 'react';
import { faker } from '@faker-js/faker';

const randomRangeInt = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);
const getDataPortion = (items: number = 15) =>
  new Array(items).fill({}).map(() => ({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    color: faker.commerce.productMaterial(),
  }));

  type RowType = ReturnType<typeof getDataPortion>[number];

const getDataPortionAsync = (items: number = 15, isError = false) =>
  new Promise<RowType[]>((resolve, reject) => {
    setTimeout(() => {
      if (isError) {
        reject('Cannot get data');
      }
      resolve(getDataPortion(items));
    }, randomRangeInt(50, 1000));
  });


export const useInfiniteScroll = () => {
  const [dataSource, setDataSource] = useState(getDataPortion(25));
  const [prevPage, setPrevPage] = useState({ isLoading: false, hasError: false, hasMore: true });
  const [nextPage, setNextPage] = useState({ isLoading: false, hasError: false, hasMore: true });

  const fakeFetchNextPageData = async () => {
    const itemsToGet = 25;
    const itemsLimitish = 100;

    setNextPage({
      ...nextPage,
      isLoading: true,
      hasError: false,
    });

    try {
      const newItems = await getDataPortionAsync(itemsToGet, randomRangeInt(1, 5) > 3);
      const newDataSource = [...dataSource, ...newItems];

      setDataSource(newDataSource);
      setNextPage({
        ...nextPage,
        isLoading: false,
        hasMore: newDataSource.length < itemsLimitish,
      });
    } catch (error) {
      setNextPage({
        ...nextPage,
        isLoading: false,
        hasError: true,
      });
    }
  };
  const fakeFetchPrevPageData = async () => {
    const itemsToGet = 25;
    const itemsLimitish = 100;

    setPrevPage({
      ...prevPage,
      isLoading: true,
      hasError: false,
    });

    try {
      const newItems = await getDataPortionAsync(itemsToGet, randomRangeInt(1, 5) > 3);
      const newDataSource = [...newItems, ...dataSource];

      setDataSource(newDataSource);
      setPrevPage({
        ...prevPage,
        isLoading: false,
        hasMore: newDataSource.length < itemsLimitish,
      });
    } catch (error) {
      setPrevPage({
        ...prevPage,
        isLoading: false,
        hasError: true,
      });
    }
  };
  return {
    prevPage,
    nextPage,
    fakeFetchNextPageData,
    fakeFetchPrevPageData,
    dataSource
  };
};
