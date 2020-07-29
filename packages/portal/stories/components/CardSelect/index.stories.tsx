import * as React from 'react';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import CardSelect from '@synerise/ds-card-select';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { AbTestXl, ChartPieL } from '@synerise/ds-icon/dist/icons/additional';


const positionOfElements = {
  left: 'left',
  center: 'center',
  right: 'right',
};

const stories = {
  default: () => {
    const [store, setStore] = React.useState<number | null>(null);

    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const stretchToFit = boolean('Stretch to fit', false);
    const icon = text('Icon component name', 'TilesM');
    const iconSize = number('Custom Icon component size', 0);
    const size = select('Size', { small: 'small', medium: 'medium' }, 'medium');

    const IconComponent = React.lazy(() =>
      import(`@synerise/ds-icon/dist/icons/${icon}`)
        .catch(() => {})
    );

    const commonProps = {
      size,
      raised,
      tickVisible,
      icon: <AbTestXl/>,
      iconSize,
      stretchToFit,
    };

    return (
      <div style={{ background: '#f2f5f6', padding: '16px', display: 'flex' }}>
        <React.Suspense
          fallback={<div>Loading icons... (or perhaps you've entered an icon that couldn't be found)</div>}
        >
          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`Selectable card`}
              description={`With description`}
              value={store === 0}
              onChange={() => store !== 0 && setStore(0)}
            />
          </div>

          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`No description`}
              value={store === 1}
              onChange={() => store !== 1 && setStore(1)}
            />
          </div>

          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              tickVisible={false}
              title={`Clickable example`}
              description={`No tick or value`}
              onClick={() => window.alert('Hello world!')}
            />
          </div>

          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`Disabled card`}
              description={`Description of disabled card`}
              disabled={true}
            />
          </div>

          {size === 'medium' && (
            <React.Fragment>
              <div style={{ marginLeft: 12, marginRight: 12 }}>
                <CardSelect
                  {...commonProps}
                  icon={undefined}
                  title={`No Icon with only title`}
                  value={store === 2}
                  onChange={() => store !== 2 && setStore(2)}
                />
              </div>

              <div style={{ marginLeft: 12, marginRight: 12 }}>
                <CardSelect
                  {...commonProps}
                  icon={undefined}
                  description={`No Icon with only description`}
                  value={store === 3}
                  onChange={() => store !== 3 && setStore(3)}
                />
              </div>
            </React.Fragment>
          )}
        </React.Suspense>
      </div>
    );
  },
  cardWithNoIcon:() =>{
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
              disabled={boolean('disabled', false)}
              value={selected}
              onChange={()=> setSelected(!selected)}
            />
          </div>
        </React.Suspense>
      </div>
    );

  },
  cardWithIcon:() =>{
    const [selected, setSelected] = React.useState<boolean>(false);
    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const iconSize = number('Custom Icon component size', 0);
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Suspendisse a pellentesque duim maecenas malesuad.');
    const isOutline = boolean('Outline', false);
    const elementsPosition = select('Position of elements', positionOfElements, positionOfElements.center);
    const isFocus = React.useState(false);
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
              disabled={boolean('disabled', false)}
              elementsPosition={elementsPosition}
              onFocus={isFocus}
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
    const size = select('Size', { small: 'small', medium: 'medium' }, 'small');


    const commonProps = {
      raised,
      tickVisible,
      icon: <ChartPieL/>,
      iconSize,
      size,
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
              disabled={boolean('disabled', false)}
              size={'small'}

            />
          </div>
        </React.Suspense>
      </div>
    );
  },
  groupOfCards:() =>{
    const [selected, setSelected] = React.useState<boolean>(false);
    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const iconSize = number('Custom Icon component size', 0);
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Suspendisse a pellentesque duim maecenas malesuad.');
    const isOutline = boolean('Outline', true);
    const elementsPosition = select('Position of elements', positionOfElements, positionOfElements.center);
    const isFocus = React.useState(false);
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
      <div style={{width: "100%", background: isOutline ? theme.palette['grey-200'] : 'transparent',justifyContent:"center",textAlign:"center", padding: '24px', display: 'flex' }}>
        <React.Suspense
          fallback={<div>Loading icons... (or perhaps you've entered an icon that couldn't be found)</div>}
        >
          <div style={{ width: "588px",height:"304px", justifyContent:"center",backgroundColor: 'white', padding: '24px 0', display: 'flex' }}>
          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`A/B Tests`}
              description={descriptionMessage && getDescription(hasDescription)}
              value={selected}
              onChange={() => setSelected(!selected)}
              disabled={boolean('disabled', false)}
              elementsPosition={elementsPosition}
              onFocus={isFocus}
            />
          </div>
          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`A/B Tests`}
              description={descriptionMessage && getDescription(hasDescription)}
              value={selected}
              onChange={() => setSelected(!selected)}
              disabled={boolean('disabled', false)}
              elementsPosition={elementsPosition}
              onFocus={isFocus}
            />
          </div>
          </div>
        </React.Suspense>
      </div>
    );
  },
  groupOfSmallCards:() =>{
    const [selected, setSelected] = React.useState<boolean>(false);
    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const iconSize = number('Custom Icon component size', 0);
    const isOutline = boolean('Outline', true);
    const size = select('Size', { small: 'small', medium: 'medium' }, 'small');


    const commonProps = {
      raised,
      tickVisible,
      icon: <ChartPieL/>,
      iconSize,
      size,
    };

    return (
      <div style={{ width: "100%", background: isOutline ? theme.palette['grey-200'] : 'transparent',justifyContent:"center",textAlign:"center", padding: '24px', display: 'flex' }}>
        <React.Suspense
          fallback={<div>Loading icons... (or perhaps you've entered an icon that couldn't be found)</div>}
        >
          <div style={{ width: "338px",height:"284px", justifyContent:"center",backgroundColor: 'white', padding: '24px', display: 'flex' }}>
          <div style={{ marginLeft: 12, marginRight: 8, }}>
            <CardSelect
              {...commonProps}
              title={`Column`}
              value={selected}
              onChange={()=> setSelected(!selected)}
              disabled={boolean('disabled', false)}
              size={'small'}

            />
          </div>
          <div style={{ marginLeft: 8, marginRight: 8 }}>
            <CardSelect
              {...commonProps}
              title={`Column`}
              value={selected}
              onChange={()=> setSelected(!selected)}
              disabled={boolean('disabled', false)}
              size={'small'}

            />
          </div>
          <div style={{ marginLeft: 8, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`Column`}
              value={selected}
              onChange={()=> setSelected(!selected)}
              disabled={boolean('disabled', false)}
              size={'small'}

            />
          </div>
          </div>
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
