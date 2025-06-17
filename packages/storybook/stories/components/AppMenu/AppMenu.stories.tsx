import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import AppMenu from '@synerise/ds-app-menu';
import Icon, {
  Add3M, AiSearchColorM, AiSearchGreyM,
  AnalyticsColorM,
  AnalyticsGreyM, AssetsColorM, AssetsGreyM,
  AutomationColorM,
  AutomationGreyM,
  CampaignsColorM,
  CampaignsGreyM,
  ChatColorM,
  ChatGreyM,
  CustomersColorM,
  CustomersGreyM,
  DashboardColorM,
  DashboardGreyM, PredictionsA, PredictionsN,
  SettingsColorM,
  SettingsGreyM,
} from '@synerise/ds-icon';
import {
  centeredPaddedWrapper,
} from '../../utils';


export default {
  title: "Components/AppMenu",
  component: AppMenu,
  decorators: [centeredPaddedWrapper],
  render: (args) => {
    return <AppMenu {...args} />;
  },
  argTypes: {
    activeItem: 'campaigns',
    footer: {
      control: false
    },
    children: {
      control: false
    },
  },
} as Meta<typeof AppMenu>;

type Story = StoryObj<typeof AppMenu>;

export const Default: Story = {
  args: {
    activeItem: 'campaigns',
    footer: (
      <AppMenu.Item
        name="Settings"
        id="settings"
        subMenu={(
          <AppMenu.SubMenu>
            <AppMenu.SubMenu.Title>Settings</AppMenu.SubMenu.Title>
            <AppMenu.SubMenu.SubTitle>My Account</AppMenu.SubMenu.SubTitle>
            <AppMenu.SubMenu.Item>Account Details</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Account Security</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.SubTitle>Organization</AppMenu.SubMenu.SubTitle>
            <AppMenu.SubMenu.Item>Organization Details</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Business Profiles</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Billing</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Audit Log</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.SubTitle>Business Profile</AppMenu.SubMenu.SubTitle>
            <AppMenu.SubMenu.Item>Profile Details</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Billing</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Audit Log</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Approval Requests</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.SubTitle>Identity & Access Management</AppMenu.SubMenu.SubTitle>
            <AppMenu.SubMenu.Item>Users</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Access Groups</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Access Control</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Identity Providers</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>User Provisioning</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.SubTitle>Apps and Integrations</AppMenu.SubMenu.SubTitle>
            <AppMenu.SubMenu.Item>Integrations</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Connected Apps & Services</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.SubTitle>Configuration</AppMenu.SubMenu.SubTitle>
            <AppMenu.SubMenu.Item>Approval Services</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Advertising</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Campaign Limits</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Chat</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Customers IAM</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Default Accounts</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Emailing</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>SMS</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>System Templates</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.SubTitle>Tools</AppMenu.SubMenu.SubTitle>
            <AppMenu.SubMenu.Item>Import</AppMenu.SubMenu.Item>
            <AppMenu.SubMenu.Item>Export</AppMenu.SubMenu.Item>
          </AppMenu.SubMenu>
        )}>
        <AppMenu.Item.Icon active={<SettingsColorM />} inActive={<SettingsGreyM />}/>
      </AppMenu.Item>
    ),
    children: ([
        <AppMenu.Item
          key="dashboards"
          id="dashboards"
          name="Dashboards"
        >
          <AppMenu.Item.Icon active={<DashboardColorM />} inActive={<DashboardGreyM />}/>
        </AppMenu.Item>,
        <AppMenu.Item
          key="customers"
          id="customers"
          name="CRM"
          subMenu={(
            <AppMenu.SubMenu>
              <AppMenu.SubMenu.Title>CRM</AppMenu.SubMenu.Title>
              <AppMenu.SubMenu.Item>Customers</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Companies</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Deals</AppMenu.SubMenu.Item>
            </AppMenu.SubMenu>
          )}
        >
          <AppMenu.Item.Icon active={<CustomersColorM />} inActive={<CustomersGreyM />}/>
        </AppMenu.Item>,
        <AppMenu.Item
          key="campaigns"
          name="Campaigns"
          id="campaigns"
          subMenu={(
            <AppMenu.SubMenu>
              <AppMenu.SubMenu.Title>Campaigns</AppMenu.SubMenu.Title>
              <AppMenu.SubMenu.Item>Dashboard</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.SubTitle>Marketing Channels</AppMenu.SubMenu.SubTitle>
              <AppMenu.SubMenu.Item active>Email</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>SMS</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Mobile</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Web Push</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Dynamic Content</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>
                Landing Page
                <AppMenu.SubMenu.Item.Action> <Icon color="blue" component={<Add3M />} /></AppMenu.SubMenu.Item.Action>
              </AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>RTB</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Facebook</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.SubTitle>Loyalty & Engagement</AppMenu.SubMenu.SubTitle>
              <AppMenu.SubMenu.Item>Promotions</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Personalized Promotions</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Recommendations</AppMenu.SubMenu.Item>
            </AppMenu.SubMenu>
          )}
        >
          <AppMenu.Item.Icon active={<CampaignsColorM />} inActive={<CampaignsGreyM />}/>
        </AppMenu.Item>,
        <AppMenu.Item key="chat" name="Chat" id="chat">
          <AppMenu.Item.Icon active={<ChatColorM />} inActive={<ChatGreyM />}/>
        </AppMenu.Item>,
        <AppMenu.Item  key="automation" name="Automation" id="automation">
          <AppMenu.Item.Icon active={<AutomationColorM />} inActive={<AutomationGreyM />}/>
        </AppMenu.Item>,
        <AppMenu.Item
          key="analytics"
          name="Analytics"
          id="analytics"
          subMenu={(
            <AppMenu.SubMenu>
              <AppMenu.SubMenu.Title>Analytics</AppMenu.SubMenu.Title>
              <AppMenu.SubMenu.Item>Dashboard</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.SubTitle>Analysis Type</AppMenu.SubMenu.SubTitle>
              <AppMenu.SubMenu.Item>Funnel</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Segmentation</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Metrics</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Histogram</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Report</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Trend</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Landing Page</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>RTB</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Facebook</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.SubTitle>Analytics Assets</AppMenu.SubMenu.SubTitle>
              <AppMenu.SubMenu.Item>Aggregates</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Expresions</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.SubTitle>Results</AppMenu.SubMenu.SubTitle>
              <AppMenu.SubMenu.Item>Dashboards</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Reports</AppMenu.SubMenu.Item>
            </AppMenu.SubMenu>
          )}
        >
          <AppMenu.Item.Icon active={<AnalyticsColorM />} inActive={<AnalyticsGreyM />}/>
        </AppMenu.Item>,
        <AppMenu.Item key="predictions" name="Predictions" id="predictions">
          <AppMenu.Item.Icon active={<PredictionsA />} inActive={<PredictionsN />}/>
        </AppMenu.Item>,
        <AppMenu.Item
          key="ai-search"
          name="AI Search"
          id="ai-search"
          subMenu={(
            <AppMenu.SubMenu>
              <AppMenu.SubMenu.Title>AI Search</AppMenu.SubMenu.Title>
              <AppMenu.SubMenu.Item>Indexes</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Suggestions</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>A/B Tests</AppMenu.SubMenu.Item>
            </AppMenu.SubMenu>
          )}
        >
          <AppMenu.Item.Icon active={<AiSearchColorM />} inActive={<AiSearchGreyM />}/>
        </AppMenu.Item>,
        <AppMenu.Item
          key="assets"
          name="Data management"
          id="assets"
          subMenu={(
            <AppMenu.SubMenu>
              <AppMenu.SubMenu.Title>Data management</AppMenu.SubMenu.Title>
              <AppMenu.SubMenu.SubTitle>Assets</AppMenu.SubMenu.SubTitle>
              <AppMenu.SubMenu.Item>Catalogs</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Events</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Tags</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Files</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.SubTitle>Events</AppMenu.SubMenu.SubTitle>
              <AppMenu.SubMenu.Item>Event Manager</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Params Manager</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.SubTitle>Customers</AppMenu.SubMenu.SubTitle>
              <AppMenu.SubMenu.Item>Agreements</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Customer Tags</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.SubTitle>Content</AppMenu.SubMenu.SubTitle>
              <AppMenu.SubMenu.Item>Documents</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Blocks</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.Item>Voucher Pools</AppMenu.SubMenu.Item>
              <AppMenu.SubMenu.SubTitle>AI</AppMenu.SubMenu.SubTitle>
              <AppMenu.SubMenu.Item>Search</AppMenu.SubMenu.Item>
            </AppMenu.SubMenu>
          )}
        >
          <AppMenu.Item.Icon active={<AssetsColorM />} inActive={<AssetsGreyM />}/>
        </AppMenu.Item>,
      ]
    )
  },
};

