import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import Table, { TableProps } from 'antd/lib/table';

import * as S from './Table.styles';
import './style/index.less';

interface DSTableProps<T> extends Omit<TableProps<T>, 'title'> {
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
}

class DSTable<T> extends React.Component<DSTableProps<T>> {
  renderTitle = (): React.ReactNode => {
    const { title, subTitle } = this.props;
    return (
      <S.Header>
        <S.Left>
          {title && <S.Title>{title}</S.Title>}
          {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
        </S.Left>
        <S.Right />
      </S.Header>
    );
  };

  render(): React.ReactNode {
    return (
      <div>
        {/* disable eslint to pass all antd table props */}
        <Table {...this.props} title={this.renderTitle} /> {/* eslint-disable-line  react/jsx-props-no-spreading */}
      </div>
    );
  }
}

export default DSTable;
