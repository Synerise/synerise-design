// @ts-nocheck
import figma from '@figma/code-connect';
import Icon, {
  CheckM,
  InfoFillM,
  PauseM,
  SaveM,
  StopM,
  TrashM,
  WarningFillM,
} from '@synerise/ds-icon';

import Confirmation from './Confirmation';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=11374-54519&m=dev';

figma.connect(Confirmation, FIGMA_URL, {
  variant: { 'Message type': 'Deleting objects' },
  example: () => (
    <Confirmation
      open
      type="negative"
      icon={<Icon component={<TrashM />} />}
      title="Deleting “object name”?"
      description="Deleting this “object name” may cause errors in working with related objects. This action cannot be undone."
      onOk={() => {}}
      onCancel={() => {}}
    />
  ),
});

figma.connect(Confirmation, FIGMA_URL, {
  variant: { 'Message type': 'Deleting objects with relations' },
  example: () => (
    <Confirmation
      open
      type="negative"
      icon={<Icon component={<TrashM />} />}
      title="Deleting “object name”?"
      description="This “object name” is used in 3 other objects. Deleting will cause errors in this related objects. This action cannot be undone."
      relatedObjects={<div>Related objects table</div>}
      onOk={() => {}}
      onCancel={() => {}}
    />
  ),
});

figma.connect(Confirmation, FIGMA_URL, {
  variant: { 'Message type': 'Deleting object bulk' },
  example: () => (
    <Confirmation
      open
      type="negative"
      icon={<Icon component={<TrashM />} />}
      title="Deleting 54 “objects name”?"
      description="This is a simple empty state example text. You can easily change it."
      batchActionItems={[
        { name: 'Object 1' },
        { name: 'Object 2' },
        { name: 'Object 3' },
      ]}
      onOk={() => {}}
      onCancel={() => {}}
    />
  ),
});

figma.connect(Confirmation, FIGMA_URL, {
  variant: { 'Message type': 'Deleting object actions' },
  example: () => (
    <Confirmation
      open
      type="negative"
      icon={<Icon component={<TrashM />} />}
      title="Deleting “object name”?"
      description="“object name” contain 23 objects."
      decisionOptions={[
        { value: 'delete-all', children: 'Delete all related objects' },
        { value: 'keep', children: 'Keep related objects' },
      ]}
      onOk={() => {}}
      onCancel={() => {}}
    />
  ),
});

figma.connect(Confirmation, FIGMA_URL, {
  variant: { 'Message type': 'Quiting without save' },
  example: () => (
    <Confirmation
      open
      type="negative"
      icon={<Icon component={<WarningFillM />} />}
      title="Quit editing?"
      description="You have made changes that are unsaved and will be lost."
      onOk={() => {}}
      onCancel={() => {}}
    />
  ),
});

figma.connect(Confirmation, FIGMA_URL, {
  variant: { 'Message type': 'Quiting without save with changes list' },
  example: () => (
    <Confirmation
      open
      type="negative"
      icon={<Icon component={<WarningFillM />} />}
      title="Quit editing?"
      description="You have made changes that are unsaved and will be lost."
      batchActionItems={[
        { name: 'Change 1' },
        { name: 'Change 2' },
        { name: 'Change 3' },
      ]}
      onOk={() => {}}
      onCancel={() => {}}
    />
  ),
});

figma.connect(Confirmation, FIGMA_URL, {
  variant: { 'Message type': 'Changing status stopping and unpublishing' },
  example: () => (
    <Confirmation
      open
      type="negative"
      icon={<Icon component={<StopM />} />}
      title="Stop/unpublish “object name”"
      description="XXX"
      onOk={() => {}}
      onCancel={() => {}}
    />
  ),
});

figma.connect(Confirmation, FIGMA_URL, {
  variant: { 'Message type': 'Changing status Publishin and activating' },
  example: () => (
    <Confirmation
      open
      type="success"
      icon={<Icon component={<CheckM />} />}
      title="Publishing/activating “object name”?"
      description="XXX"
      onOk={() => {}}
      onCancel={() => {}}
    />
  ),
});

figma.connect(Confirmation, FIGMA_URL, {
  variant: { 'Message type': 'Changing status pausing' },
  example: () => (
    <Confirmation
      open
      type="warning"
      icon={<Icon component={<PauseM />} />}
      title="Pause “object name”"
      description="XXX"
      onOk={() => {}}
      onCancel={() => {}}
    />
  ),
});

figma.connect(Confirmation, FIGMA_URL, {
  variant: { 'Message type': 'Saving changes' },
  example: () => (
    <Confirmation
      open
      type="informative"
      icon={<Icon component={<SaveM />} />}
      title="Save changes?"
      description="You are trying to save changes on active “object name”. This may lead to differences in performance for different clients."
      onOk={() => {}}
      onCancel={() => {}}
    />
  ),
});

figma.connect(Confirmation, FIGMA_URL, {
  variant: { 'Message type': 'Saving changes with changes list' },
  example: () => (
    <Confirmation
      open
      type="informative"
      icon={<Icon component={<SaveM />} />}
      title="Save changes?"
      description="You are trying to save changes on active “object name”. This may lead to differences in performance for different clients."
      batchActionItems={[
        { name: 'Change 1' },
        { name: 'Change 2' },
        { name: 'Change 3' },
      ]}
      onOk={() => {}}
      onCancel={() => {}}
    />
  ),
});
