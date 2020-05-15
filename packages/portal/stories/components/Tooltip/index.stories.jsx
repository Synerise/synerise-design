"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var addon_knobs_1 = require("@storybook/addon-knobs");
var ds_tooltip_1 = require("@synerise/ds-tooltip");
var ds_avatar_1 = require("@synerise/ds-avatar");
var icons_1 = require("@synerise/ds-icon/dist/icons");
var ds_icon_1 = require("@synerise/ds-icon");
var ds_button_1 = require("@synerise/ds-button");
var decorator = function (storyFn) { return (<div style={{ padding: '60px' }}>
    {storyFn()}
  </div>); };
var TUTORIALS = [
    {
        title: 'Tip for you - 1',
        description: 'You can change profile name later in your profile settings.'
    },
    {
        title: 'Tip for you - 2',
        description: 'You can change avatar later in your profile settings.'
    },
    {
        title: 'Tip for you - 3',
        description: 'You can change password later in your profile settings.'
    }
];
var props = function () { return ({
    placement: addon_knobs_1.select('Placement', [
        'top',
        'left',
        'right',
        'bottom',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom',
    ], 'top'),
    trigger: addon_knobs_1.select('Trigger', ['hover', 'focus', 'click', 'contextMenu'], 'hover'),
}); };
var tutorialProps = function () { return ({
    tutorialAutoplay: addon_knobs_1.boolean('Enable tutorial autoplay', true),
    tutorialAutoplaySpeed: addon_knobs_1.number('Set speed of tutorial [ms]', 5000),
    tutorials: TUTORIALS,
}); };
var stories = {
    default: function () { return (<div>
      <ds_tooltip_1.default {...props()} type="default" title={addon_knobs_1.text('Set tooltip title', 'More than just example text')}>
        <span>Tooltip will show on mouse enter.</span>
      </ds_tooltip_1.default>
    </div>); },
    icon: function () { return (<div>
      <ds_tooltip_1.default {...props()} type="icon" title={addon_knobs_1.text('Set tooltip title', 'More than just example text')} description={addon_knobs_1.text('Set tooltip description', 'You can change profile name later in your profile settings. More info')}>
        <ds_button_1.default type="primary">Show more</ds_button_1.default>
      </ds_tooltip_1.default>
    </div>); },
    large: function () { return (<div>
      <ds_tooltip_1.default {...props()} type="largeSimple" description={addon_knobs_1.text('Set tooltip description', 'You can change profile name later in your profile settings. More info')} offset='small'>
        <span style={{ display: 'flex' }}>
          <ds_icon_1.default component={<icons_1.InfoFillS />} color="#b5bdc3"/>
        </span>
      </ds_tooltip_1.default>
    </div>); },
    avatar: function () { return (<div>
      <ds_tooltip_1.default {...props()} type="avatar" title={addon_knobs_1.text('Set user name', 'Jan Nowak')} description={addon_knobs_1.text('Set user email', 'jan.nowak@gmail.com')}>
        <ds_avatar_1.default backgroundColor='green' backgroundColorHue='600'>JN</ds_avatar_1.default>
      </ds_tooltip_1.default>
    </div>); },
    tutorial: function () { return (<div>
      <ds_tooltip_1.default {...props()} {...tutorialProps()} type="tutorial" tutorials={TUTORIALS}>
        <ds_button_1.default type="primary">Show tips</ds_button_1.default>
      </ds_tooltip_1.default>
    </div>); },
};
exports.default = {
    name: 'Components|Tooltip',
    decorator: decorator,
    stories: stories,
    Component: ds_tooltip_1.default,
};
