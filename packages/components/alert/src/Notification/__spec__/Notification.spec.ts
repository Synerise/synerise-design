describe('notification', () => {
  it.todo('notification message should allow passing jsx component');
  it.todo('notification should have close-button');
  it.todo('notification holder should have no padding nor margin');
  it.todo('by default there should be no icon');
  it.todo('notifications should be closable with a close icon-click');
  it.todo('notifications should dissapear after given time');
  it.todo('pass duration and other props to the notification.open api');
  it.todo('should mount in a styled-components NotificationWrapper wrapper (not next to as a e.g. sibling)');
  it.todo('notification message can handle multiline and/or long messages');
  it.todo('notifications appear correctly even after destroying notifications instance');
  it.todo('notification container has no background (so border-radius on the content can be applied)');
  it.todo('container has background-color of gray-900 and 3px border-radius, padding-left is 16px');
  it.todo('shadow has gray-800');
  it.todo('default text font-size is 13px');
  it.todo('button label font-size is 13px');
  it.todo('notification has min-height of 50px (NotificationsContainer)');
  it.todo('ant-notification-hook-holder should have 0px height if empty (including margins)');
  it.todo('first ant-notification-hook-handler has margin-top 0px, the other ones have 8px');
  it.todo('.ant-notification > div should have transparent background');
  it.todo('close button and action button can be shown separately (even exclusively)');
  it.todo("Notification's message can accept special characters \"&'");
  it.todo('placement bottom applies .ant-notification-bottom class to the container');
  it.todo('sending notification with another placement handles it correctly');
  it.todo('getContainer should always point at NotificationsWrapper element');
  it.todo(
    '.ant-notification-bottom should be properly styled even if e.g. .ant-notification-topLeft was added first (`.ant-notification{, }.ant-notification-bottom`)'
  );
});
