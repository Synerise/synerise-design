import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-core';

import { TagsGroupCell } from './TagsGroup';

const TAGS = [{
    name: 'test1'
},
{
    name: 'test2'
},
{
    name: 'test3'
}
];
const TEXTS = {
    addButtonLabel: 'ADD'
}

describe('TagsGroupCell', () => {
    it('Should render max 1 tag by default', () => {
        renderWithProvider(<TagsGroupCell tagsProps={{ selected: TAGS}} />);
        expect(screen.getByText(TAGS[0].name)).toBeInTheDocument();
        expect(screen.queryByText(TAGS[1].name)).not.toBeInTheDocument();
    });

    it('Should render 2 tags', () => {
        renderWithProvider(<TagsGroupCell tagsProps={{ selected: TAGS, maxVisibleTags: 2}} />);
        expect(screen.getByText(TAGS[0].name)).toBeInTheDocument();
        expect(screen.queryByText(TAGS[1].name)).toBeInTheDocument();
        expect(screen.queryByText(TAGS[2].name)).not.toBeInTheDocument();
        expect(screen.queryByText(TEXTS.addButtonLabel)).not.toBeInTheDocument();
    });

    it('Should render add button', () => {
        renderWithProvider(<TagsGroupCell tagsProps={{ selected: [], addable: true, texts: TEXTS}} />);
        expect(screen.getByText(TEXTS.addButtonLabel)).toBeInTheDocument();
    });
});
