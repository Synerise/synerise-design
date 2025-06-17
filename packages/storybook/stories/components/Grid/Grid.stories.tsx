import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import Grid from '@synerise/ds-grid';
import Description, { DescriptionRow } from '@synerise/ds-description';
import GridPreview from '../../../stories/components/Grid/GridPreview';
import * as S from '../../../stories/components/Grid/Grid.styles';
import {
  centeredPaddedWrapper,
} from '../../utils';


export default {
  title: "Components/Grid",
  component: Grid,
  decorators: [centeredPaddedWrapper],
  render: (args) => {
    return <Grid {...args} />;
  },
  argTypes: {

  },
} as Meta<typeof Grid>;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  render: () => {
    return (
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, padding: 24 }}>
        <GridPreview/>
        <Grid>
          <Grid.Item xxl={8} xl={4} lg={4} md={2} sm={8} xs={4}>
            <S.GridItem>
              <Description type="inline">
                <DescriptionRow label={'XXL'} value={'8/24'}/>
                <DescriptionRow label={'XL'} value={'4/16'}/>
                <DescriptionRow label={'LG'} value={'4/12'}/>
                <DescriptionRow label={'MD'} value={'2/ 8'}/>
                <DescriptionRow label={'SM'} value={'8/ 8'}/>
                <DescriptionRow label={'XS'} value={'4/ 4'}/>
              </Description>
            </S.GridItem>
          </Grid.Item>
          <Grid.Item xxl={8} xl={8} lg={4} md={4} sm={8} xs={4}>
            <S.GridItem>
              <Description type="inline">
                <DescriptionRow label={'XXL'} value={'8/24'}/>
                <DescriptionRow label={'XL'} value={'8/16'}/>
                <DescriptionRow label={'LG'} value={'4/12'}/>
                <DescriptionRow label={'MD'} value={'4/ 8'}/>
                <DescriptionRow label={'SM'} value={'8/ 8'}/>
                <DescriptionRow label={'XS'} value={'4/ 4'}/>
              </Description>
            </S.GridItem>
          </Grid.Item>
          <Grid.Item xxl={8} xl={4} lg={4} md={2} sm={8} xs={4}>
            <S.GridItem>
              <Description type="inline">
                <DescriptionRow label={'XXL'} value={'8/24'}/>
                <DescriptionRow label={'XL'} value={'4/16'}/>
                <DescriptionRow label={'LG'} value={'4/12'}/>
                <DescriptionRow label={'MD'} value={'2/ 8'}/>
                <DescriptionRow label={'SM'} value={'8/ 8'}/>
                <DescriptionRow label={'XS'} value={'4/ 4'}/>
              </Description>
            </S.GridItem>
          </Grid.Item>
        </Grid>
      </div>
    )
  }
};