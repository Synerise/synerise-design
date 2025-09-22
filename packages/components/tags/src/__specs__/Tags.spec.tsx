import React from 'react';
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProvider } from '@synerise/ds-core';

import Tags, { TagShape } from '../index';

describe('Tags', () => {
  const TAGS_TESTID = 'tags';
  const ADD_TAG_BUTTON = 'Add tag';
  const CREATE_TAG_BUTTON = 'Create tag';
  const DROPDOWN_TESTID = 'ds-tags-dropdown-overlay';
  const SEARCH_PLACEHOLDER = 'Search...';
  const MANAGE_LINK_LABEL = 'Manage Link Label';

  const onSelectedChange = jest.fn();
  const onCreate = jest.fn();

  const tagOne = {
    id: 0,
    name: 'Tag One',
  };

  const tagTwo = {
    id: 1,
    name: 'Tag Two',
  };

  const tagThree = {
    id: 2,
    name: 'Tag Three',
  };

  const tagFour = {
    id: 3,
    name: 'Tag Four',
  };

  it('should render without any props', () => {
    renderWithProvider(<Tags />);

    expect(screen.getByTestId(TAGS_TESTID)).toBeInTheDocument();
  });

  it('should render with selected tags', () => {
    const selected = [tagOne, tagTwo];

    renderWithProvider(
      <Tags tagShape={TagShape.DEFAULT_ROUND} selected={selected} />,
    );

    expect(screen.getByTestId('tag-0')).toBeInTheDocument();
    expect(screen.getByTestId('tag-1')).toBeInTheDocument();
  });

  it('should render with add tag button', () => {
    renderWithProvider(
      <Tags
        texts={{
          addButtonLabel: ADD_TAG_BUTTON,
        }}
        addable
      />,
    );

    expect(screen.getByText(ADD_TAG_BUTTON)).toBeInTheDocument();
  });

  it('should render with available tags in dropdown', () => {
    const data = [tagOne, tagTwo, tagThree];
    const selected = [tagOne];

    renderWithProvider(
      <Tags
        data={data}
        selected={selected}
        texts={{
          addButtonLabel: ADD_TAG_BUTTON,
        }}
        addable
      />,
    );

    userEvent.click(screen.getByText(ADD_TAG_BUTTON));

    const dropdown = screen.getByTestId(DROPDOWN_TESTID);
    expect(
      within(dropdown).queryByTestId(`tag-${tagOne.id}`)
    ).not.toBeInTheDocument(); // already selected tag
    expect(
      within(dropdown).getByTestId(`tag-${tagTwo.id}`),
    ).toBeInTheDocument(); // not selected tag
  });

  it('should render with create button', () => {
    const data = [tagOne, tagTwo, tagThree];
    const selected = [];

    renderWithProvider(
      <Tags
        data={data}
        selected={selected}
        onCreate={onCreate}
        texts={{
          createTagButtonLabel: CREATE_TAG_BUTTON,
          addButtonLabel: ADD_TAG_BUTTON,
          searchPlaceholder: SEARCH_PLACEHOLDER,
        }}
        addable
        creatable
      />,
    );

    userEvent.click(screen.getByText(ADD_TAG_BUTTON));
    userEvent.type(screen.getByPlaceholderText(SEARCH_PLACEHOLDER), tagOne.name.slice(0, -1));
    userEvent.click(screen.getByText(CREATE_TAG_BUTTON));

    const foundTag = screen.getByText(tagOne.name);

    expect(onCreate).toHaveBeenCalled();
    expect(foundTag).toBeInTheDocument();
  });

  it('should render with manage link as dropdownFooter', () => {
    const data = [tagOne, tagTwo, tagThree];
    const selected = [];

    renderWithProvider(
      <Tags
        data={data}
        selected={selected}
        texts={{
          addButtonLabel: ADD_TAG_BUTTON,
          manageLinkLabel: MANAGE_LINK_LABEL,
          searchPlaceholder: SEARCH_PLACEHOLDER,
        }}
        addable
        dropdownFooter={MANAGE_LINK_LABEL}
      />,
    );

    userEvent.click(screen.getByText(ADD_TAG_BUTTON));
    userEvent.type(screen.getByPlaceholderText(SEARCH_PLACEHOLDER), 'anything');

    expect(screen.getByText(MANAGE_LINK_LABEL)).toBeInTheDocument();
  });

  it('should fire onSelectedChange', () => {
    const data = [tagOne, tagTwo, tagThree];
    const selected = [];

    renderWithProvider(
      <Tags
        data={data}
        selected={selected}
        onSelectedChange={onSelectedChange}
        texts={{
          addButtonLabel: ADD_TAG_BUTTON,
          searchPlaceholder: SEARCH_PLACEHOLDER,
        }}
        addable
        creatable
      />,
    );

    userEvent.click(screen.getByText(ADD_TAG_BUTTON));

    const foundTag = screen.getByText(tagOne.name);

    userEvent.click(foundTag);

    expect(onSelectedChange).toHaveBeenCalled();
  });
  
  it('should only display up to maxVisibleTags selected tags', async () => {
    const data = [tagOne, tagTwo, tagThree, tagFour];
    const selected = [tagTwo, tagThree, tagFour];

    renderWithProvider(
      <Tags
        data={data}
        selected={selected}
        onSelectedChange={onSelectedChange}
        texts={{
          addButtonLabel: ADD_TAG_BUTTON,
          searchPlaceholder: SEARCH_PLACEHOLDER,
        }}
        addable
        creatable
        maxVisibleTags={1}
      />,
    );

     expect(screen.getByTestId(`tag-${tagTwo.id}`)).toBeInTheDocument();
     expect(screen.queryByTestId(`tag-${tagThree.id}`)).not.toBeInTheDocument();
     expect(screen.queryByTestId(`tag-${tagFour.id}`)).not.toBeInTheDocument();
     
    const limitedTag = screen.getByTestId('tag-limited-tags');
    expect(limitedTag).toHaveTextContent('+2');

    fireEvent.mouseOver(limitedTag);

    const dropdown = await screen.findByTestId(DROPDOWN_TESTID);

     expect(within(dropdown).queryByTestId(`tag-${tagTwo.id}`)).not.toBeInTheDocument();
     expect(within(dropdown).getByTestId(`tag-${tagThree.id}`)).toBeInTheDocument();
     expect(within(dropdown).getByTestId(`tag-${tagFour.id}`)).toBeInTheDocument();
  });
});
