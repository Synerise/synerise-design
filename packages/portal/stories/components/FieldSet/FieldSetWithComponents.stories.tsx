import { boolean, number, select as knobSelect, select, text } from '@storybook/addon-knobs';
import Expander from '@synerise/ds-button/dist/Expander/Expander';
import Switch from '@synerise/ds-switch/dist/Switch';
import FieldSet from '@synerise/ds-field-set';
import Checkbox from '@synerise/ds-checkbox/dist';
import Button from '@synerise/ds-button';
import Icon, { AddS, CheckS } from '@synerise/ds-icon';
import * as React from 'react';
import { ExpanderWrapper } from '@synerise/ds-field-set/dist/FieldSet.styles';
import { action } from '@storybook/addon-actions';
import Radio from '@synerise/ds-radio';
import { Input } from '@synerise/ds-input';
import Select from '@synerise/ds-select';
import OrderedList from '@synerise/ds-ordered-list';
import UnorderedList from '@synerise/ds-unordered-list';
import ModalProxy from '@synerise/ds-modal';
import Card, { CardBadge } from '@synerise/ds-card';
import { CardProps } from '@synerise/ds-card';
import * as S from '../Card/stories.styles';

const typeOfPrefix = ['expander', 'switch'];
const getErrorText = (error: boolean, errorText: string): string => {
  if (error) {
    return errorText;
  } else {
    return '';
  }
};
const sizes = ['default', 'large'];
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};

const stories = {
  WithCheckbox: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    const additionalPrefixMapper = {
      expander: (
        <ExpanderWrapper description={description}>
          <Expander />
        </ExpanderWrapper>
      ),
      switch: <Switch />,
    };
    const showDescription = boolean('Show description', true);
    const showPrefix = boolean('Set prefix', false);
    const type = select('Set type of prefix', typeOfPrefix, 'expander');
    const showButton = boolean('Set button', false);
    return (
      <FieldSet
        title={title}
        description={showDescription && description}
        prefix={showPrefix && additionalPrefixMapper[type]}
        component={
            <Checkbox.Group onChange={values => console.log('Checked values', values)}>
              <Checkbox
                disabled={boolean('Disabled', false)}
                hasError={boolean('Has error', false)}
                indeterminate={boolean('Set indeterminate state of checkbox', false)}
                description="Deliver your campaign to a large list in batches to prevent website-crushing click flods"
                errorText={text('Set error message', '')}
                value="A"
              >
                Batch delivery
              </Checkbox>
              <Checkbox
                disabled={boolean('Disabled', false)}
                hasError={boolean('Has error', false)}
                indeterminate={boolean('Set indeterminate state of checkbox', false)}
                description="A control group is a defined percentage of your audience who
            won’t receive this campaign so you can better understand performance"
                errorText={text('Set error message', '')}
                value="B"
              >
                Enable a control group
              </Checkbox>
            </Checkbox.Group>
        }
        button={
          showButton && (
            <Button type="ghost-primary" mode="icon-label">
              <Icon component={<AddS />} /> Add new{' '}
            </Button>
          )
        }
      />
    );
  },
  WithRadio: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    const additionalPrefixMapper = {
      expander: (
        <ExpanderWrapper description={description}>
          <Expander />
        </ExpanderWrapper>
      ),
      switch: <Switch />,
    };
    const showDescription = boolean('Show description', true);
    const showPrefix = boolean('Set prefix', false);
    const type = select('Set type of prefix', typeOfPrefix, 'expander');
    const showButton = boolean('Set button', false);
    return (
      <FieldSet
        title={title}
        description={showDescription && description}
        prefix={showPrefix && additionalPrefixMapper[type]}
        component={
            <Radio.Group onChange={action('onChange')} defaultValue="A">
              <Radio
                disabled={boolean('disabled', false)}
                description="Deliver your campaign to a large list in batches to prevent website-crushing click flods"
                value="A"
              >
                Batch delivery
              </Radio>
              <Radio
                disabled={boolean('disabled', false)}
                description="A control group is a defined percentage of your audience who
            won’t receive this campaign so you can better understand performance"
                value="B"
              >
                Enable a control group
              </Radio>
            </Radio.Group>
        }
        button={
          showButton && (
            <Button type="ghost-primary" mode="icon-label">
              <Icon component={<AddS />} /> Add new{' '}
            </Button>
          )
        }
      />
    );
  },
  WithInputs: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    const additionalPrefixMapper = {
      expander: (
        <ExpanderWrapper description={description}>
          <Expander />
        </ExpanderWrapper>
      ),
      switch: <Switch />,
    };
    const showDescription = boolean('Show description', true);
    const showPrefix = boolean('Set prefix', false);
    const type = select('Set type of prefix', typeOfPrefix, 'expander');
    const showButton = boolean('Set button', false);
    const [value, setValue] = React.useState<string>('');
    const validationState = boolean('Set validation state', false);
    const message = text('Error Text', 'Error');
    const [isFocus, setFocus] = React.useState(false);
    const size = knobSelect('Set size', sizes as any, 'default');
    return (
      <FieldSet
        title={title}
        description={showDescription && description}
        prefix={showPrefix && additionalPrefixMapper[type]}
        component={
            <div style={{width: '700px'}}>
              <Input
                placeholder="Placeholder"
                label={renderLabel(text('Label of input', 'Label'))}
                description={text('Description of input', 'Description')}
                errorText={!isFocus && getErrorText(validationState, message)}
                error={!isFocus && validationState}
                disabled={boolean('Disabled', false)}
                onChange={e => setValue(e.target.value)}
                value={value}
                size={size}
                onBlur={() => {
                  action('I am blurred');
                  setFocus(false);
                }}
                onFocus={() => {
                  action('I am focused');
                  setFocus(true);
                }}
              />
              <Input
                placeholder="Placeholder"
                label={renderLabel(text('Label of input', 'Label'))}
                description={text('Description of input', 'Description')}
                errorText={!isFocus && getErrorText(validationState, message)}
                error={!isFocus && validationState}
                disabled={boolean('Disabled', false)}
                onChange={e => setValue(e.target.value)}
                value={value}
                size={size}
                onBlur={() => {
                  action('I am blurred');
                  setFocus(false);
                }}
                onFocus={() => {
                  action('I am focused');
                  setFocus(true);
                }}
              />
            </div>
        }
        button={
          showButton && (
            <Button type="ghost-primary" mode="icon-label">
              <Icon component={<AddS />} /> Add new{' '}
            </Button>
          )
        }
      />
    );
  },
  WithSelects: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    const additionalPrefixMapper = {
      expander: (
        <ExpanderWrapper description={description}>
          <Expander />
        </ExpanderWrapper>
      ),
      switch: <Switch />,
    };
    const showDescription = boolean('Show description', true);
    const showPrefix = boolean('Set prefix', false);
    const type = select('Set type of prefix', typeOfPrefix, 'expander');
    const showButton = boolean('Set button', false);
    return (
      <FieldSet
        title={title}
        description={showDescription && description}
        prefix={showPrefix && additionalPrefixMapper[type]}
        component={
            <div style={{width: '700px'}}>
              <Select defaultValue='Select'  label={renderLabel(text('Label of select', 'Label'))}
                      description={text('Description of select', 'Description')} children={<Option value="Select">Select</Option>}/>
              <Select defaultValue='Select'  label={renderLabel(text('Label of select', 'Label'))}
                      description={text('Description of select', 'Description')} children={<Option value="Select">Select</Option>}/>
            </div>
        }
        button={
          showButton && (
            <Button type="ghost-primary" mode="icon-label">
              <Icon component={<AddS />} /> Add new{' '}
            </Button>
          )
        }
      />
    );
  },
  WithOrderedList: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    const additionalPrefixMapper = {
      expander: (
        <ExpanderWrapper description={description}>
          <Expander />
        </ExpanderWrapper>
      ),
      switch: <Switch />,
    };
    const showDescription = boolean('Show description', true);
    const showPrefix = boolean('Set prefix', false);
    const type = select('Set type of prefix', typeOfPrefix, 'expander');
    const showButton = boolean('Set button', false);
    const numberFormatter = (index: number) => `${index + 1}. `;
    const hasLabel = boolean('Set label', true);
    const label = text('Label', 'Header label');
    const getLabel = (hasLabel: boolean): string => {
      if (hasLabel) {
        return label;
      } else {
        return '';
      }
    };
    const data = [
      {
        label: 'Deliver your campaign to a large list in batches to prevent website-crushing click flods',
      },
      {
        label: 'A control group is a defined percentage of your audience who won’t receive this campaign so you can better understand performance',
      },
      ]
    return (
      <FieldSet
        title={title}
        description={showDescription && description}
        prefix={showPrefix && additionalPrefixMapper[type]}
        component={
            <div style={{width: '700px'}}>
              <OrderedList text={renderLabel(label && getLabel(hasLabel))} data={data} indexFormatter={numberFormatter} />
            </div>
        }
        button={
          showButton && (
            <Button type="ghost-primary" mode="icon-label">
              <Icon component={<AddS />} /> Add new{' '}
            </Button>
          )
        }
      />
    );
  },
  WithUnorderedList: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    const additionalPrefixMapper = {
      expander: (
        <ExpanderWrapper description={description}>
          <Expander />
        </ExpanderWrapper>
      ),
      switch: <Switch />,
    };
    const showDescription = boolean('Show description', true);
    const showPrefix = boolean('Set prefix', false);
    const type = select('Set type of prefix', typeOfPrefix, 'expander');
    const showButton = boolean('Set button', false);
    const discFormatter = () => ` ▪ `;
    const hasLabel = boolean('Set label', true);
    const label = text('Label', 'Header label');
    const getLabel = (hasLabel: boolean): string => {
      if (hasLabel) {
        return label;
      } else {
        return '';
      }
    };
    const data = [
      {
        label: 'Deliver your campaign to a large list in batches to prevent website-crushing click flods',
      },
      {
        label: 'A control group is a defined percentage of your audience who won’t receive this campaign so you can better understand performance',
      },
    ]
    return (
      <FieldSet
        title={title}
        description={showDescription && description}
        prefix={showPrefix && additionalPrefixMapper[type]}
        component={
            <div style={{width: '700px'}}>
              <UnorderedList text={renderLabel(label && getLabel(hasLabel))} data={data} indexFormatter={discFormatter} />
            </div>
        }
        button={
          showButton && (
            <Button type="ghost-primary" mode="icon-label">
              <Icon component={<AddS />} /> Add new{' '}
            </Button>
          )
        }
      />
    );
  },
  ModalWithFieldSet: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    const additionalPrefixMapper = {
      expander: (
        <ExpanderWrapper description={description}>
          <Expander />
        </ExpanderWrapper>
      ),
      switch: <Switch />,
    };
    const showDescription = boolean('Show description', true);
    const showPrefix = boolean('Set prefix', false);
    const type = select('Set type of prefix', typeOfPrefix, 'expander');
    return (
      <ModalProxy
        size={select('Size', sizes, 'medium')}
        visible={boolean('Set open', true)}
        title="Modal header"
      >
        <div style={{ width: '500px', marginLeft: '120px', marginTop: '24px'}}>
      <FieldSet
        title={title}
        description={showDescription && description}
        prefix={showPrefix && additionalPrefixMapper[type]}
        component={
          <div style={{width: '500px'}}>
            <Select defaultValue='Select'  label={renderLabel(text('Label of select', 'Label'))}
                    description={text('Description of select', 'Description')} children={<Option value="Select">Select</Option>}/>
            <Select defaultValue='Select'  label={renderLabel(text('Label of select', 'Label'))}
                    description={text('Description of select', 'Description')} children={<Option value="Select">Select</Option>}/>
          </div>
        }
      />
      </div>
      </ModalProxy>
    );
  },
  CardWithFieldSet: () => {
    const title = text('Title', 'Advanced option');
    const description = text('Description', 'This section is for avanced users only');
    const additionalPrefixMapper = {
      expander: (
        <ExpanderWrapper description={description}>
          <Expander />
        </ExpanderWrapper>
      ),
      switch: <Switch />,
    };
    const showDescription = boolean('Show description', true);
    const showPrefix = boolean('Set prefix', false);
    const type = select('Set type of prefix', typeOfPrefix, 'expander');
    const [collapsedCardsState, setCollapsedCardsState] = React.useState({
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    });
    const updateCollapsedState = (index, collapsed) =>
      setCollapsedCardsState({ ...collapsedCardsState, [index]: collapsed });
    const renderCard = (
      props: CardProps & { withIcon?: string | boolean },
      hideContentInitial = false,
      onExpansionChange?: (expanded: boolean) => void
    ) => {
      const [hideContent, setHideContent] = React.useState(hideContentInitial);
      React.useEffect(() => {
        setHideContent(hideContentInitial);
      }, [hideContentInitial]);
      return(
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '837px',
            height: '100%',
          }}
        >
          <Card
            lively={boolean('Hover enabled', true)}
            disabled={ boolean('Disabled', false)}
            raised={boolean('Active', false)}
            withHeader={boolean('With header', true)}
            title={text('Title', 'Card header')}
            description={text('description', 'description')}
            icon={<CardBadge icon={<CheckS />} />}
            iconColor={text('Icon color', '#54cb0b')}
            compactHeader={boolean('Compact header', false)}
            onHeaderClick={() => {
              onExpansionChange && onExpansionChange(!hideContent);
              setHideContent(!hideContent);
            }}
            headerSideChildren={props.headerSideChildren}
            headerBorderBottom={boolean('Header with border bottom', false)}
            background={'white-shadow'}
            hideContent={boolean('Enable collapsing', false)}
            showSideChildrenWhenHeaderHidden={boolean('Set Footer Active', false)}
          >
            <div style={{ width: '100%', height: 350, padding: '48px 155px' }}>
              <FieldSet
                title={title}
                description={showDescription && description}
                prefix={showPrefix && additionalPrefixMapper[type]}
                component={
                  <div style={{width: '500px'}}>
                    <Select defaultValue='Select'  label={renderLabel(text('Label of select', 'Label'))}
                            description={text('Description of select', 'Description')} children={<Option value="Select">Select</Option>}/>
                    <Select defaultValue='Select'  label={renderLabel(text('Label of select', 'Label'))}
                            description={text('Description of select', 'Description')} children={<Option value="Select">Select</Option>}/>
                  </div>
                }
              />
            </div>
          </Card>
        </div>
      )
    }
    return (
      <S.HeaderWrapper>
        {renderCard(
          {
            lively: true,
            compactHeader: false,
            icon: <CardBadge icon={<CheckS />} />,
            headerBorderBottom: false,
            headerSideChildren: (
              <div>
                <Button>
                  Define
                </Button>
              </div>
            ),
          },
          collapsedCardsState[1],
          collapsed => updateCollapsedState(1, collapsed)
        )}
      </S.HeaderWrapper>
    );
  },
};

export default {
  name: 'Components/FieldSet/WithSecondLevel',
  config: {},
  stories,
  Component: FieldSet,
};
