import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from "react";
import Filter, {
  FilterProps
} from "./Filter";
const meta: Meta < FilterProps > = {
  title: "Filter",
  component: Filter
};
export default meta;
const excludedProps = ['onChangeOrder', 'onChangeLogic', 'onChangeStepMatching', 'onChangeStepName', 'onDeleteStep', 'onDuplicateStep', 'renderStepContent', 'renderStepFooter', 'renderStepHeaderRightSide', 'addFilterComponent', 'texts', 'logicOptions', 'renderHeaderRightSide'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < FilterProps > ;
const StoryTemplate: Story = {
  render: (args) => <Filter {...args} />,
};
export const Primary = {
    ...StoryTemplate,
    args: {
      maxConditionsLimit: 5,
      expressions: [{
        id: "1",
        type: "LOGIC",
        data: {
          value: "AND"
        },
        logic: null
      }, {
        id: "2",
        type: "STEP",
        data: {
          matching: true,
          name: "Step 1"
        },
        logic: null
      }, {
        id: "3",
        type: "STEP",
        data: {
          matching: false,
          name: "Step 2"
        },
        logic: {
          type: "LOGIC",
          data: {
            value: "OR"
          },
          logic: null
        }
      }],
      matching: {
        matching: true,
        notMatching: false
      },
      visibilityConfig: {
        isStepCardHeaderVisible: true
      },
      readOnly: false,
      onChangeOrder: (expressions) => {
        console.log(expressions);
      },
      onChangeLogic: (id, value) => {
        console.log(id, value);
      },
      onChangeStepMatching: (id, value) => {
        console.log(id, value);
      },
      onChangeStepName: (id, value) => {
        console.log(id, value);
      },
      onDeleteStep: (id) => {
        console.log(id);
      },
      onDuplicateStep: (id) => {
        console.log(id);
      },
      renderStepContent: (expression, isActive) => {
        return (<div>
        <h3>{expression.data.name}</h3>
        <p>{expression.data.matching.toString()}</p>
        <p>{isActive ? "Active" : "Inactive"}</p>
      </div>);
      },
      renderStepFooter: (expression) => {
        return (<div>
        <button onClick={() => console.log("Delete")}>Delete</button>
        <button onClick={() => console.log("Duplicate")}>Duplicate</button>
      </div>);
      },
      renderStepHeaderRightSide: (expression, index) => {
        return <button onClick={() => console.log(`Button ${index}`)}>Button {index}</button>;
      },
      addFilterComponent: (<button onClick={() => console.log("Add Filter")}>Add Filter</button>),
      texts: {
        addFilter: "Add New Filter",
        dropMeHere: "Drop Me Here",
        conditionsLimit: "Conditions Limit",
        matching: {
          matching: "Matching",
          notMatching: "Not Matching"
        },
        step: {
          matching: "Matching",
          notMatching: "Not Matching",
          have: "Have",
          performed: "Performed",
          notHave: "Does not have",
          notPerformed: "Have not performed",
          attribute: "attribute",
          event: "event",
          notAttribute: "attribute",
          notEvent: "event",
          namePlaceholder: "Name",
          moveTooltip: "Move",
          deleteTooltip: "Delete",
          duplicateTooltip: "Duplicate"
        },
        placeholder: {
          chooseCondition: "Choose a condition",
          getPreview: 'Get a preview'
        }
      },
      logicOptions: [{
        value: "AND",
        label: "AND"
      }, {
        value: "OR",
        label: "OR"
      }],
      renderHeaderRightSide: expressions => {
        return <button onClick={() => console.log("Header Right Side")}>Header Right Side</button>
      }
    }