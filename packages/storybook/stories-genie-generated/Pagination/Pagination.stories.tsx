{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import Pagination, {
    PaginationProps
  } from './Pagination';
  const meta: Meta < PaginationProps > = {
    title: 'Example/Pagination',
    component: Pagination,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < PaginationProps > ;
  const StoryTemplate: Story = {
    render: (args) => <Pagination {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      defaultCurrent: 1,
      total: 50,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} items`,
      itemRender: undefined,
      sizeChangerOptions: [10, 20, 50, 100],
      pageSizeOptions: ['10', '20', '50', '100'],
      ...args,
    },
  };
  export const WithIcons = {
    ...StoryTemplate,
    args: {
      defaultCurrent: 1,
      total: 50,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} items`,
      itemRender: undefined,
      sizeChangerOptions: [10, 20, 50, 100],
      pageSizeOptions: ['10', '20', '50', '100'],
      itemRender: (current: number, type: string, originalElement: React.ReactNode) => {
        switch (type) {
        case 'prev': {
          return (<Button mode="single-icon" type="ghost">
              <Icon component={<AngleLeftS />} />
            </Button>);
        }
        case 'next': {
          return (<Button mode="single-icon" type="ghost">
              <Icon component={<AngleRightS />} />
            </Button>);
        }
        case 'jump-prev': {
          return (<Button mode="single-icon" type="ghost">
              <Icon className="default-icon" component={<OptionHorizontalM />} />
              <Icon className="hover-icon" component={<DoubleAngleLeftS />} />
            </Button>);
        }
        case 'jump-next': {
          return (<Button mode="single-icon" type="ghost">
              <Icon className="default-icon" component={<OptionHorizontalM />} />
              <Icon className="hover-icon" component={<DoubleAngleRightS />} />
            </Button>);
        }
        default: {
          return originalElement;
        }
        }
      },
    },
  };
}