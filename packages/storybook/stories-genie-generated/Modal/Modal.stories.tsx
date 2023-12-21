{
  import React from 'react';
  import classnames from 'classnames';
  import '@synerise/ds-core/dist/js/style';
  import {
    Modal as AntModal
  } from 'antd';
  import {
    ModalFooter,
    ModalFooterProps
  } from './Elements/ModalFooter';
  import {
    ModalTitle
  } from './Elements/ModalTitle';
  import type {
    ModalProps
  } from './Modal.types';
  import './style/index.less';
  import * as S from './Modal.styles';
  const mapSizeToWidth = {
    small: 520,
    medium: 792,
    large: 1044,
    extraLarge: 1280,
    fullSize: '100%',
  };
  /** @deprecated */
  export const buildModalFooter = (props: ModalFooterProps) => <ModalFooter {...props} />;
  export const Modal = (props: ModalProps) => {
    const {
      texts,
      bodyBackground = 'white',
      headerActions,
      title,
      description,
      size,
      blank,
      settingButtonText,
      titleContainerStyle,
      ...antModalProps
    } = props;
    const className = classnames(`bodybg-${bodyBackground}`, antModalProps.className, {
      'modal-blank': Boolean(blank)
    }, {
      'with-description': Boolean(description)
    });
    return (<S.AntdModal
      {...antModalProps}
      className={className}
      width={size && mapSizeToWidth[size]}
      closable={false}
      title={(title || description || blank) && <ModalTitle {...props} />}
      footer={antModalProps.footer !== null ? antModalProps.footer || <ModalFooter {...props} /> : null}
    />);
  };
  Modal.info = AntModal.info;
  Modal.success = AntModal.success;
  Modal.error = AntModal.error;
  Modal.warning = AntModal.warning;
  Modal.confirm = AntModal.confirm;
  export default Modal;
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import classnames from 'classnames';
  import {
    Modal,
    ModalProps,
    ModalFooterProps
  } from './Modal';
  const meta: Meta < ModalProps > = {
    title: 'Modal',
    component: Modal,
  };
  export default meta;
  const excludedProps = ['className', 'size', 'bodyBackground', 'headerActions', 'blank', 'titleContainerStyle'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < ModalProps > ;
  const StoryTemplate: Story = {
    render: (args) => (<Modal 
      {...Object.keys(args)
      .filter((arg) => !excludeRegexp.test(arg))
      .reduce((obj, key) => {
        obj[key] = args[key];
        return obj;
      }, {})}
    />
  ),
};

export const Primary = {
  ...StoryTemplate,
  args: {
    title: 'Primary Modal',
    description: 'This is a primary modal.',
    size: 'medium',
    bodyBackground: 'white',
    headerActions: <button>Actions</button>, blank: true, settingButtonText: 'Settings', titleContainerStyle: {
        color: 'red'
      },
    },
  };