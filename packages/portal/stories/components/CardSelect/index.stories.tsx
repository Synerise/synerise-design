import * as React from 'react';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import CardSelect from '@synerise/ds-card-select';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { AdAfterScrollL } from '@synerise/ds-icon/dist/icons/additional';
import Icon from '@synerise/ds-icon';

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
      icon: <IconComponent />,
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
              title={`Cross-sell`}
              description={`Suspendisse a pellentesque duim maecenas malesuad.`}
              value={store === 0}
              onChange={() => store !== 0 && setStore(0)}
            />
          </div>

          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`Cross-sell`}
              value={store === 1}
              onChange={() => store !== 1 && setStore(1)}
            />
          </div>

          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              tickVisible={false}
              title={`Cross-sell`}
              description={`Suspendisse a pellentesque duim maecenas malesuad.`}
              onClick={() => window.alert('Hello world!')}
            />
          </div>

          <div style={{ marginLeft: 12, marginRight: 12 }}>
            <CardSelect
              {...commonProps}
              title={`Cross-sell`}
              description={`Suspendisse a pellentesque duim maecenas malesuad.`}
              disabled={true}
            />
          </div>

          {size === 'medium' && (
            <React.Fragment>
              <div style={{ marginLeft: 12, marginRight: 12 }}>
                <CardSelect
                  {...commonProps}
                  icon={undefined}
                  title={`Cross-sell`}
                  value={store === 2}
                  onChange={() => store !== 2 && setStore(2)}
                />
              </div>

              <div style={{ marginLeft: 12, marginRight: 12 }}>
                <CardSelect
                  {...commonProps}
                  icon={undefined}
                  description={`Suspendisse a pellentesque duim maecenas malesuad.`}
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
    const [store, setStore] = React.useState<number | null>(null);

    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const iconSize = number('Custom Icon component size', 0);
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Suspendisse a pellentesque duim maecenas malesuad.');
    const isOutline = boolean('outline', false);
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
              title={`Cross-sell`}
              description={descriptionMessage && getDescription(hasDescription)}
              disabled={boolean('disabled', false)}
              value={store === 0}
              onChange={() => store !== 0 && setStore(0)}
            />
          </div>
      </React.Suspense>
  </div>
  );

  },
  cardWithIcon:() =>{
    const [store, setStore] = React.useState<number | null>(null);
    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const iconSize = number('Custom Icon component size', 0);
    const hasDescription = boolean('Set Description', true);
    const descriptionMessage = text('Description', 'Suspendisse a pellentesque duim maecenas malesuad.');
    const isOutline = boolean('outline', false);
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
      icon: <Icon className="icon" component={<AdAfterScrollL />} />,
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
              title={`Cross-sell`}
              description={descriptionMessage && getDescription(hasDescription)}
              value={store === 0}
              onChange={() => store !== 0 && setStore(0)}
              disabled={boolean('disabled', false)}
            />
          </div>
        </React.Suspense>
      </div>
    );
  },
  smallCardWithIcon:() =>{
    const [store, setStore] = React.useState<number | null>(null);
    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const iconSize = number('Custom Icon component size', 0);
    const isOutline = boolean('outline', false);

    const commonProps = {
      raised,
      tickVisible,
      icon: <Icon className="icon" component={<AdAfterScrollL />}  />,
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
              value={store === 0}
              onChange={() => store !== 0 && setStore(0)}
              disabled={boolean('disabled', false)}

            />
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
