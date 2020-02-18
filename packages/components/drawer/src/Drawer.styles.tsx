import * as React from 'react';
import Drawer from 'antd/lib/drawer';
import styled from 'styled-components';

// eslint-disable-next-line react/jsx-props-no-spreading
export const AntdDrawer = styled(({ ...rest }) => <Drawer {...rest} />)`
  && {
    .ant-drawer-mask {
      background-color: rgba(${({ theme }): string => theme.palette['grey-500']}, 0.1);
    }

    .ant-drawer-body {
      padding: 0;
      background-color: ${({ theme }): string => theme.palette.white};
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
    }
  }
`;

export const DrawerHeader = styled.div`
  padding: 24px 24px 0;
  border-bottom: 1px solid ${({ theme }): string => theme.palette['grey-100']};
`;

export const DrawerHeaderWithoutPadding = styled.div`
  padding: 0;
  border-bottom: 0;
`;

export const DrawerContent = styled.div`
  padding: 24px;
`;

export const DrawerBody = styled.div`
  background-color: white;
  overflow-y: auto;
`;
