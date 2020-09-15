import * as React from 'react';

import Grid from '@synerise/ds-grid';
import Description, { DescriptionRow } from '@synerise/ds-description';
import * as S from './Grid.styles';
import { boolean } from '@storybook/addon-knobs';
import GridPreview from './GridPreview';

const stories = {
  default: () => {
    return (
      <div style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, padding: 24}}>
        <GridPreview />
        <Grid>
          <Grid.Item xxl={8} xl={4} lg={4} md={2} sm={8} xs={3}>
            <S.GridItem>
            <Description type="inline">
              <DescriptionRow label={'XXL'} value={'8/24'}/>
              <DescriptionRow label={'XL'} value={'4/16'}/>
              <DescriptionRow label={'LG'} value={'4/12'}/>
              <DescriptionRow label={'MD'} value={'2/ 8'}/>
              <DescriptionRow label={'SM'} value={'8/ 8'}/>
              <DescriptionRow label={'XS'} value={'3/ 3'}/>
            </Description>
            </S.GridItem>
          </Grid.Item>
          <Grid.Item xxl={8} xl={8} lg={4} md={4} sm={8} xs={3}>
            <S.GridItem>
            <Description type="inline">
              <DescriptionRow label={'XXL'} value={'8/24'}/>
              <DescriptionRow label={'XL'} value={'8/16'}/>
              <DescriptionRow label={'LG'} value={'4/12'}/>
              <DescriptionRow label={'MD'} value={'4/ 8'}/>
              <DescriptionRow label={'SM'} value={'8/ 8'}/>
              <DescriptionRow label={'XS'} value={'3/ 3'}/>
            </Description>
            </S.GridItem>
          </Grid.Item>
          <Grid.Item xxl={8} xl={4} lg={4} md={2} sm={8} xs={3}>
            <S.GridItem>
            <Description type="inline">
              <DescriptionRow label={'XXL'} value={'8/24'}/>
              <DescriptionRow label={'XL'} value={'4/16'}/>
              <DescriptionRow label={'LG'} value={'4/12'}/>
              <DescriptionRow label={'MD'} value={'2/ 8'}/>
              <DescriptionRow label={'SM'} value={'8/ 8'}/>
              <DescriptionRow label={'XS'} value={'3/ 3'}/>
            </Description>
            </S.GridItem>
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
