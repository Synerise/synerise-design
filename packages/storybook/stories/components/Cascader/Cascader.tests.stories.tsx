import { ReactNode } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';


import { Meta, StoryObj } from '@storybook/react-vite';
import type { CascaderProps, Category } from '@synerise/ds-cascader';

import { sleep } from '../../utils';
import CascaderMeta from './Cascader.stories';
import * as mock from './data/mock.json';
import { limitCategories } from './data/utils';

const root = mock.default;

type CascaderStoryProps = CascaderProps & {
  children: ReactNode;
  categoryLimit: number;
};

export default {
  ...CascaderMeta,
  title: 'Components/Cascader/Tests',
  tags: ['visualtests'],
  args: {
    ...CascaderMeta.args,
    onCategorySelect: fn(),
    categorySuffix: 'select',
  },
} as Meta<CascaderStoryProps>;

type Story = StoryObj<CascaderStoryProps>;

export const SearchResults: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText(
      args.searchInputPlaceholder || 'Search',
    );
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'Case');
  },
};

export const ShowHeaderBreadcrumb: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const selectFromCategory = async (category: Category) => {
      const firstChild = category.children![0];
      const childrenOfFirst = firstChild.children ?? [];

      await userEvent.click(canvas.getByText(firstChild.name));
      await waitFor(() => {
        expect(canvas.getByText(firstChild.name)).toBeInTheDocument();
        childrenOfFirst.forEach((child) => {
          expect(canvas.getByText(child.name)).toBeInTheDocument();
        });
        expect(
          canvas.getAllByText(args.categorySuffix as string).length,
        ).toEqual(childrenOfFirst.length);
      });

      return firstChild;
    };
    await sleep(100);
    const rootLevel = limitCategories(root, args.categoryLimit);
    const level1 = await selectFromCategory(rootLevel);
    const level2 = await selectFromCategory(level1);
    await selectFromCategory(level2);
  },
};

export const ListCategory: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const rootCategory = limitCategories(root, args.categoryLimit);

    const targetChild = rootCategory.children![2];
    const subCategories = targetChild.children ?? [];

    await sleep(100);
    await userEvent.click(canvas.getByText(targetChild.name));

    await waitFor(() => {
      expect(canvas.getByText(targetChild.name)).toBeInTheDocument();
      subCategories.forEach((child) => {
        expect(canvas.getByText(child.name)).toBeInTheDocument();
      });
      expect(canvas.getAllByText(args.categorySuffix as string).length).toEqual(
        subCategories.length,
      );
    });

    const selectedSubCategory1 = subCategories[3];
    const selectedSubCategory2 = subCategories[1];

    await userEvent.click(
      canvas.getAllByText(args.categorySuffix as string)[3],
    );
    expect(args.onCategorySelect).toHaveBeenCalled();
    expect(args.onCategorySelect).toHaveBeenCalledWith(
      selectedSubCategory1,
      true,
    );

    await userEvent.click(
      canvas.getAllByText(args.categorySuffix as string)[1],
    );
    expect(args.onCategorySelect).toHaveBeenCalled();
    expect(args.onCategorySelect).toHaveBeenCalledWith(
      selectedSubCategory2,
      true,
    );
    expect(args.onCategorySelect).toHaveBeenCalledTimes(2);
  },
};
