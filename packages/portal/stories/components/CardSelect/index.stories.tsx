import * as React from 'react';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import CardSelect from '@synerise/ds-card-select';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { AbTestXl, ChartPieL } from '@synerise/ds-icon/dist/icons/additional';
import CardSelectGroup from '@synerise/ds-card-select/dist/CardSelectGroup/CardSelectGroup';


const positionOfElements = {
  left: 'left',
  center: 'center',
  right: 'right',
};

const stories = {
  cardWithIcon:() =>{
    const [selected, setSelected] = React.useState<boolean>(false);
    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const iconSize = number('Custom Icon component size', 0);
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Suspendisse a pellentesque duim maecenas malesuad.');
    const isOutline = boolean('Outline', false);
    const elementsPosition = select('Position of elements', positionOfElements, positionOfElements.center);
    const getDescription = (hasDescription: boolean): string => {
      if (hasDescription) {
        return descriptionMessage;
      } else {
        return '';
      }
    };

    const commonProps = {
      raised,
      tickVisible,
      icon: <AbTestXl/>,
      iconSize,
    };

    return (
      <div style={{ background: isOutline ? theme.palette['grey-200'] : 'transparent', padding: '24px', display: 'flex' }}>
        <React.Suspense
          fallback={<div>Loading icons... (or perhaps you've entered an icon that couldn't be found)</div>}
        >
          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`A/B Tests`}
              description={descriptionMessage && getDescription(hasDescription)}
              value={selected}
              onChange={() => setSelected(!selected)}
              disabled={boolean('Disabled', false)}
              elementsPosition={elementsPosition}
            />
          </div>
        </React.Suspense>
      </div>
    );
  },
  cardWithOutIcon:() =>{
    const [selected, setSelected] = React.useState<boolean>(false);

    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const iconSize = number('Custom Icon component size', 0);
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Suspendisse a pellentesque duim maecenas malesuad.');
    const isOutline = boolean('Outline', false);
    const getDescription = (hasDescription: boolean): string => {
      if (hasDescription) {
        return descriptionMessage;
      } else {
        return '';
      }
    };

    const commonProps = {
      raised,
      tickVisible,
      iconSize,
    };

    return (
      <div style={{ background: isOutline ? theme.palette['grey-200'] : 'transparent', padding: '24px', display: 'flex' }}>
        <React.Suspense
          fallback={<div>Loading icons... (or perhaps you've entered an icon that couldn't be found)</div>}
        >
          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`A/B Tests`}
              description={descriptionMessage && getDescription(hasDescription)}
              disabled={boolean('Disabled', false)}
              value={selected}
              onChange={()=> setSelected(!selected)}
            />
          </div>
        </React.Suspense>
      </div>
    );

  },
  smallCardWithIcon:() =>{
    const [selected, setSelected] = React.useState<boolean>(false);
    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const iconSize = number('Custom Icon component size', 0);
    const isOutline = boolean('Outline', false);


    const commonProps = {
      raised,
      tickVisible,
      icon: <ChartPieL/>,
      iconSize,
    };

    return (
      <div style={{ width: "100%", background: isOutline ? theme.palette['grey-200'] : 'transparent', padding: '24px', display: 'flex' }}>
        <React.Suspense
          fallback={<div>Loading icons... (or perhaps you've entered an icon that couldn't be found)</div>}
        >
          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`Column`}
              value={selected}
              onChange={()=> setSelected(!selected)}
              disabled={boolean('Disabled', false)}
              size={'small'}

            />
          </div>
        </React.Suspense>
      </div>
    );
  },
  groupOfCards:() =>{
    const [selectedIndex, setSelectedIndex] = React.useState<number>(null);
    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Suspendisse a pellentesque duim maecenas malesuad.');
    const isOutline = boolean('Outline', true);
    const elementsPosition = select('Position of elements', positionOfElements, positionOfElements.center);
    const itemsInGroup = number('Number of cards rendered',2,{min:2});
    const columns = number('Number of columns',2,{min:1,max:3})
    const getDescription = (hasDescription: boolean): string => {
      if (hasDescription) {
        return descriptionMessage;
      } else {
        return '';
      }
    };

    const commonProps = {
      raised,
      tickVisible,
      icon: <AbTestXl/>,
    };

    return (
      <div style={{width: "100%",height:"100%", background: isOutline ? theme.palette['grey-200'] : 'transparent',justifyContent:"center",textAlign:"center",alignItems: "center", padding: '24px', display: 'flex' }}>
        <React.Suspense
          fallback={<div>Loading icons... (or perhaps you've entered an icon that couldn't be found)</div>}
        >
          <CardSelectGroup width={'large'} columns={columns}>
            {[...Array(itemsInGroup).keys()].map((key,index)=>(
              <CardSelect
              {...commonProps}
              key={key}
              title={`A/B Tests`}
              description={descriptionMessage && getDescription(hasDescription)}
              value={selectedIndex === index}
              onChange={()=> selectedIndex === index? setSelectedIndex(null): setSelectedIndex(index)}
              disabled={boolean('Disabled', false)}
              elementsPosition={elementsPosition}
            />))}
          </CardSelectGroup>
        </React.Suspense>
      </div>
    );
  },
  groupOfSmallCards:() =>{
    const [selectedIndex, setSelectedIndex] = React.useState<number>(null);
    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const isOutline = boolean('Outline', true);
    const itemsInGroup = number('Number of cards rendered',2,{min:2});
    const columns = number('Number of columns',2,{min:1,max:3})


    const commonProps = {
      raised,
      tickVisible,
      icon: <ChartPieL/>,
    };

    return (
      <div style={{ width: "100%", background: isOutline ? theme.palette['grey-200'] : 'transparent',justifyContent:"center", padding: '24px', display: 'flex' }}>
        <React.Suspense
          fallback={<div>Loading icons... (or perhaps you've entered an icon that couldn't be found)</div>}
        >
          <CardSelectGroup width={'small'} columns={columns} >
            {[...Array(itemsInGroup).keys()].map((key,index)=>(
              <CardSelect
              {...commonProps}
              title={`Column`}
              value={selectedIndex === index}
              onChange={()=> selectedIndex === index? setSelectedIndex(null): setSelectedIndex(index)}
              disabled={boolean('Disabled', false)}
              size={'small'}
              />))}
          </CardSelectGroup>
        </React.Suspense>
      </div>
    );
  },

};

export default {
  name: 'Components|CardSelect',
  withoutCenter: true,
  stories,
  Component: CardSelect,
};
