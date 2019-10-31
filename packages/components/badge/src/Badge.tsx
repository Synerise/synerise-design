import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { BadgeProps } from 'antd/lib/badge';
import AntdBadge from './Badge.styles';

interface Props extends BadgeProps {
  flag: boolean;
}

const Badge: React.FC<Props> = ({ flag, ...antdProps }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AntdBadge flag={flag} {...antdProps} />
  );
};

export default Badge;
