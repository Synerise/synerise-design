"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ds_core_1 = require("@synerise/ds-core");
var ds_card_select_1 = require("@synerise/ds-card-select");
var react_1 = require("@storybook/react");
var addon_knobs_1 = require("@storybook/addon-knobs");
var react_2 = require("@storybook/addon-centered/react");
react_1.storiesOf('Components|CardSelect', module)
    .addDecorator(react_2.default)
    .add('default', function () {
    var _a = React.useState(null), store = _a[0], setStore = _a[1];
    var raised = addon_knobs_1.boolean('Raised', false);
    var tickVisible = addon_knobs_1.boolean('With tick', true);
    var stretchToFit = addon_knobs_1.boolean('Stretch to fit', false);
    var icon = addon_knobs_1.text('Icon component name', 'tiles-m');
    var iconSize = addon_knobs_1.number('Icon component size', 82);
    var size = addon_knobs_1.select('Size', { small: 'small', medium: 'medium' }, 'medium');
    var IconComponent = React.lazy(function () { return Promise.resolve().then(function () { return require("@synerise/ds-icon/dist/icons/" + icon + ".svg"); }).catch(function () { }); });
    var commonProps = {
        size: size,
        raised: raised,
        tickVisible: tickVisible,
        icon: <IconComponent />,
        iconSize: iconSize,
        stretchToFit: stretchToFit,
    };
    return (<ds_core_1.DSProvider code="en_GB">
        <div style={{ background: '#f2f5f6', padding: '16px', display: 'flex' }}>
          <React.Suspense fallback={<div>Loading icons... (or perhaps you've entered an icon that couldn't be found)</div>}>
            <div style={{ marginLeft: 12, marginRight: 12 }}>
              <ds_card_select_1.default {...commonProps} title={"Selectable card"} description={"With description"} value={store === 0} onChange={function () { return store !== 0 && setStore(0); }}/>
            </div>

            <div style={{ marginLeft: 12, marginRight: 12 }}>
              <ds_card_select_1.default {...commonProps} title={"No description"} value={store === 1} onChange={function () { return store !== 1 && setStore(1); }}/>
            </div>

            <div style={{ marginLeft: 12, marginRight: 12 }}>
              <ds_card_select_1.default {...commonProps} title={"Disabled card"} description={"Description of disabled card"} disabled={true}/>
            </div>

            <div style={{ marginLeft: 12, marginRight: 12 }}>
              <ds_card_select_1.default {...commonProps} icon={undefined} title={"No Icon with only title"} value={store === 2} onChange={function () { return store !== 2 && setStore(2); }}/>
            </div>

            <div style={{ marginLeft: 12, marginRight: 12 }}>
              <ds_card_select_1.default {...commonProps} icon={undefined} description={"No Icon with only description"} value={store === 3} onChange={function () { return store !== 3 && setStore(3); }}/>
            </div>
          </React.Suspense>
        </div>
      </ds_core_1.DSProvider>);
});
