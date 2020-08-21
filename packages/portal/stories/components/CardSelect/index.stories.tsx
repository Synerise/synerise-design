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
    const tickVisible = boolean('With tick', true);
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Suspendisse a pellentesque duim maecenas malesuad.');
    const setBackground = boolean('SetBackground', false);
    const elementsPosition = select('Position of elements', positionOfElements, positionOfElements.center);
    const getDescription = (hasDescription: boolean): string => {
      if (hasDescription) {
        return descriptionMessage;
      } else {
        return '';
      }
    };

    const commonProps = {
      tickVisible,
      icon: <AbTestXl/>,
    };

    return (
      <div style={{ background: setBackground ? theme.palette['grey-200'] : 'transparent',display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center', }}>
          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`A/B Tests`}
              description={descriptionMessage && getDescription(hasDescription)}
              value={selected}
              onChange={() => setSelected(!selected)}
              disabled={boolean('Disabled', false)}
              elementsPosition={elementsPosition}
              raised={setBackground}
            />
          </div>
      </div>
    );
  },
  cardWithOutIcon:() =>{
    const [selected, setSelected] = React.useState<boolean>(false);
    const tickVisible = boolean('With tick', true);
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Suspendisse a pellentesque duim maecenas malesuad.');
    const setBackground = boolean('SetBackground', false);
    const getDescription = (hasDescription: boolean): string => {
      if (hasDescription) {
        return descriptionMessage;
      } else {
        return '';
      }
    };

    const commonProps = {
      tickVisible,
    };

    return (
      <div style={{ background: setBackground ? theme.palette['grey-200'] : 'transparent', display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',}}>
          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`A/B Tests`}
              description={descriptionMessage && getDescription(hasDescription)}
              disabled={boolean('Disabled', false)}
              value={selected}
              onChange={()=> setSelected(!selected)}
              raised={setBackground}
            />
          </div>
      </div>
    );

  },
  smallCardWithIcon:() =>{
    const [selected, setSelected] = React.useState<boolean>(false);
    const tickVisible = boolean('With tick', true);
    const setBackground = boolean('SetBackground', false);


    const commonProps = {
      tickVisible,
      icon: <ChartPieL/>,
    };

    return (
      <div style={{ background: setBackground ? theme.palette['grey-200'] : 'transparent', display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',}}>
          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`Column`}
              value={selected}
              onChange={()=> setSelected(!selected)}
              disabled={boolean('Disabled', false)}
              size={'small'}
              raised={setBackground}

            />
          </div>
      </div>
    );
  },
  groupOfCards:() =>{
    const [selectedIndex, setSelectedIndex] = React.useState<number>(null);
    const tickVisible = boolean('With tick', true);
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Suspendisse a pellentesque duim maecenas malesuad.');
    const elementsPosition = select('Position of elements', positionOfElements, positionOfElements.center);
    const itemsInGroup = number('Number of cards rendered',2,{min:2});
    const columns = select('Number of columns',[2,3],2)
    const getDescription = (hasDescription: boolean): string => {
      if (hasDescription) {
        return descriptionMessage;
      } else {
        return '';
      }
    };

    const commonProps = {
      tickVisible,
      icon: <AbTestXl/>,
    };

    return (
      <div style={{background: theme.palette['grey-200'] , display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',}}>
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
      </div>
    );
  },
  groupOfSmallCards:() =>{
    const [selectedIndex, setSelectedIndex] = React.useState<number>(null);
    const tickVisible = boolean('With tick', true);
    const itemsInGroup = number('Number of cards rendered',2,{min:2});
    const columns = select('Number of columns',[2,3],2)


    const commonProps = {
      tickVisible,
      icon: <ChartPieL/>,
    };

    return (
      <div style={{ background: theme.palette['grey-200'] , display: 'flex',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center', }}>
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
      </div>
    );
  },

};

export default {
name: 'Components/CardSelect',
  stories,
  Component: CardSelect,
};
