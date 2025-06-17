import { ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { within, waitFor, expect, fn, userEvent } from 'storybook/test';
import type { CascaderProps } from '@synerise/ds-cascader';

import CascaderMeta from './Cascader.stories';
import * as mock from './data/mock.json';
import { isKeyCategory, limitCategories } from './data/utils';
import { sleep } from '../../utils';

const root = mock.default;

type CascaderStoryProps = CascaderProps & { children: ReactNode; categoryLimit: number };

export default {
  ...CascaderMeta,
  title: 'Components/Cascader/Tests',
  tags: ['visualtests'],
  args: {
    ...CascaderMeta.args,
    onCategorySelect: fn(),
    categorySuffix: 'select'
  },
} as Meta<CascaderStoryProps>;

type Story = StoryObj<CascaderStoryProps>;

export const SearchResults: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText(args.searchInputPlaceholder || 'Search')
    await userEvent.click(searchInput)
    await userEvent.type(searchInput, 'Case');
  },
};

const filterCategoryData = (category) => {
  const categoryEntries = Object.entries(category).filter(([key]) => isKeyCategory(category, key));
  return Object.fromEntries(categoryEntries)
}

export const ShowHeaderBreadcrumb: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const selectFromCategory = async (level) => {

      const nextLevelNames = Object.keys(level);
      const nextLevelLabel = nextLevelNames[0];
      const nextLevel = filterCategoryData(level[nextLevelLabel]);
      const nextLevelEntries = Object.entries(nextLevel);

      await userEvent.click(canvas.getByText(nextLevelLabel));
      await waitFor(() => {
        expect(canvas.getByText(nextLevelLabel)).toBeInTheDocument();
        nextLevelEntries.forEach(([name]) => {
          expect(canvas.getByText(name)).toBeInTheDocument();
        })
        expect(canvas.getAllByText(args.categorySuffix as string).length).toEqual(nextLevelEntries.length);
      });

      return nextLevel;
    }
    await sleep(100);
    const rootLevel = limitCategories(root, args.categoryLimit);
    const level1 = await selectFromCategory(rootLevel);
    const level2 = await selectFromCategory(level1);
    await selectFromCategory(level2);

  }
};


export const ListCategory: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const rootCategory = limitCategories(root, args.categoryLimit);

    const categoryNames = Object.keys(rootCategory);
    const categoryData = rootCategory[categoryNames[2]];

    const subCategoryData = Object.entries(categoryData).filter(([key]) => isKeyCategory(categoryData, key));

    await sleep(100);
    await userEvent.click(canvas.getByText(categoryNames[2]));

    await waitFor(() => {
      expect(canvas.getByText(categoryNames[2])).toBeInTheDocument();
      subCategoryData.forEach(([name]) => {
        expect(canvas.getByText(name)).toBeInTheDocument();
      })
      expect(canvas.getAllByText(args.categorySuffix as string).length).toEqual(subCategoryData.length);
    });

    const [_name1, selectedSubCategory1] = subCategoryData[3];
    const [_name2, selectedSubCategory2] = subCategoryData[1];

    await userEvent.click(canvas.getAllByText(args.categorySuffix as string)[3]);
    expect(args.onCategorySelect).toHaveBeenCalled();
    expect(args.onCategorySelect).toHaveBeenCalledWith(selectedSubCategory1, true);

    await userEvent.click(canvas.getAllByText(args.categorySuffix as string)[1]);
    expect(args.onCategorySelect).toHaveBeenCalled();
    expect(args.onCategorySelect).toHaveBeenCalledWith(selectedSubCategory2, true);
    expect(args.onCategorySelect).toHaveBeenCalledTimes(2);
  },
};
