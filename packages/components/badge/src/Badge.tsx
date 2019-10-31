import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { BadgeProps } from 'antd/lib/badge';
import AntdBadge from './Badge.styles';

interface Props extends BadgeProps {
  flag?: boolean;
  outlined?: boolean;
}

const Badge: React.FC<Props> = ({ flag, outlined, ...antdProps }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AntdBadge flag={flag} outlined={outlined} {...antdProps} />
  );
};

export default Badge;
