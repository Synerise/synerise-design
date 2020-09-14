import * as React from 'react';

import Grid from '@synerise/ds-grid';
import Card from '@synerise/ds-card';
import { number } from '@storybook/addon-knobs';
import Description, { DescriptionRow } from '@synerise/ds-description';

const stories = {
  default: () => {
    console.log('test');
    return (
      <div style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, padding: 24}}>
        <Grid>
          <Grid.Item xxl={8} xl={4} lg={4} md={2} sm={2} xs={3}>
            <Card showContent title="Item #1">
              <Description type="inline">
                <DescriptionRow label={'XXL'} value={'Span 8 of 24'}/>
                <DescriptionRow label={'XL'} value={'Span 4 of 16'}/>
                <DescriptionRow label={'LG'} value={'Span 4 of 12'}/>
                <DescriptionRow label={'MD'} value={'Span 2 of 8'}/>
                <DescriptionRow label={'SM'} value={'Span 2 of 8'}/>
                <DescriptionRow label={'XS'} value={'Span 3 of 3'}/>
              </Description>
            </Card>
          </Grid.Item>
          <Grid.Item xxl={8} xl={8} lg={4} md={4} sm={4} xs={3}>
            <Card showContent title="Item #1">
              <Description type="inline">
                <DescriptionRow label={'XXL'} value={'Span 8 of 24'}/>
                <DescriptionRow label={'XL'} value={'Span 8 of 16'}/>
                <DescriptionRow label={'LG'} value={'Span 4 of 12'}/>
                <DescriptionRow label={'MD'} value={'Span 2 of 8'}/>
                <DescriptionRow label={'SM'} value={'Span 2 of 8'}/>
                <DescriptionRow label={'XS'} value={'Span 3 of 3'}/>
              </Description>
            </Card>
          </Grid.Item>
          <Grid.Item xxl={8} xl={4} lg={4} md={2} sm={2} xs={3}>
            <Card showContent title="Item #1">
              <Description type="inline">
                <DescriptionRow label={'XXL'} value={'Span 8 of 24'}/>
                <DescriptionRow label={'XL'} value={'Span 4 of 16'}/>
                <DescriptionRow label={'LG'} value={'Span 4 of 12'}/>
                <DescriptionRow label={'MD'} value={'Span 2 of 8'}/>
                <DescriptionRow label={'SM'} value={'Span 2 of 8'}/>
                <DescriptionRow label={'XS'} value={'Span 3 of 3'}/>
              </Description>
            </Card>
          </Grid.Item>
        </Grid>
      </div>
    )
  },
};

export default {
name: 'Components/Grid',
  config: {},
  stories,
  Component: Grid,
}
