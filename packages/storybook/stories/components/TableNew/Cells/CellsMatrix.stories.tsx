import { composeStories, Meta, StoryObj } from '@storybook/react-vite';
import React, { Fragment } from 'react';
import styled from 'styled-components';

import * as ActionCellStories from './ActionCell.stories';
import * as AvatarLabelCellStories from './AvatarLabelCell.stories';
import * as CopyableCellStories from './CopyableCell.stories';
import * as EditableCellStories from './EditableCell.stories';
import * as FlagLabelCellStories from './FlagLabelCell.stories';
import * as IconLabelCellStories from './IconLabelCell.stories';
import * as IconTooltipCellStories from './IconTooltipCell.stories';
import * as InputNumberCellStories from './InputNumberCell.stories';
import * as LabelsWithShowMoreStories from './LabelsWithShowMore.stories';
import * as StarCellStories from './StarCell.stories';
import * as StatusLabelCellStories from './StatusLabelCell.stories';
import * as TagIconCellStories from './TagIconCell.stories';
import * as TagsGroupCellStories from './TagsGroupCell.stories';

const CELL_STORIES = {
  ActionCell: composeStories(ActionCellStories),
  AvatarLabelCell: composeStories(AvatarLabelCellStories),
  CopyableCell: composeStories(CopyableCellStories),
  EditableCell: composeStories(EditableCellStories),
  FlagLabelCell: composeStories(FlagLabelCellStories),
  IconLabelCell: composeStories(IconLabelCellStories),
  IconTooltipCell: composeStories(IconTooltipCellStories),
  InputNumberCell: composeStories(InputNumberCellStories),
  LabelsWithShowMore: composeStories(LabelsWithShowMoreStories),
  StarCell: composeStories(StarCellStories),
  StatusLabelCell: composeStories(StatusLabelCellStories),
  TagIconCell: composeStories(TagIconCellStories),
  TagsGroupCell: composeStories(TagsGroupCellStories),
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  gap: 16px 24px;
`;

const meta: Meta = {
  title: 'Components/TableNew/Cells/Matrix',
  parameters: { layout: 'padded' },
};

export default meta;

/** Every story of every cell, so the single-cell stories need no snapshot of their own. */
export const CellsMatrix: StoryObj = {
  render: () => (
    <Grid>
      {Object.entries(CELL_STORIES).map(([cell, stories]) =>
        Object.values(stories).map((Story) => (
          <Fragment key={`${cell}/${Story.storyName}`}>
            <span>
              {cell} / {Story.storyName}
            </span>
            <Story />
          </Fragment>
        )),
      )}
    </Grid>
  ),
};
