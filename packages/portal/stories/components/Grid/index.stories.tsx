import * as React from 'react';

import Grid from '@synerise/ds-grid';
import { GridItem } from '@synerise/ds-grid/dist/Grid.styles';

const stories = {
  default: () => {
    return (
      <Grid>
        <GridItem>Item #1</GridItem>
        <GridItem columns={3}>Item #2</GridItem>
        <GridItem>Item #3</GridItem>
        <GridItem>Item #4</GridItem>
        <GridItem>Item #5</GridItem>
        <GridItem>Item #6</GridItem>
        <GridItem>Item #7</GridItem>
        <GridItem>Item #8</GridItem>
        <GridItem>Item #9</GridItem>
        <GridItem>Item #10</GridItem>
        <GridItem>Item #11</GridItem>
        <GridItem>Item #12</GridItem>
        <GridItem>Item #13</GridItem>
        <GridItem>Item #14</GridItem>
        <GridItem>Item #15</GridItem>
        <GridItem>Item #16</GridItem>
        <GridItem>Item #17</GridItem>
        <GridItem>Item #18</GridItem>
        <GridItem>Item #19</GridItem>
        <GridItem>Item #20</GridItem>
        <GridItem>Item #21</GridItem>
        <GridItem>Item #22</GridItem>
        <GridItem>Item #23</GridItem>
        <GridItem>Item #24</GridItem>
        <GridItem>Item #25</GridItem>
        <GridItem>Item #26</GridItem>
        <GridItem>Item #27</GridItem>
        <GridItem>Item #28</GridItem>
        <GridItem>Item #29</GridItem>
        <GridItem>Item #30</GridItem>
      </Grid>
    )
  },
};

export default {
name: 'Components/Grid',
  config: {},
  stories,
  Component: Grid,
}
