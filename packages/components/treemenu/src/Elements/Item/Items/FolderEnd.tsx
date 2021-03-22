import React from 'react';

import * as S from '../Item.styles';

const FolderEnd: React.FC = props => {
  return (
    <S.Item style={{ height: 0 }} {...props}>
      <div style={{ width: '100%', height: '32px', background: 'rgba(0,0,0,0.25)' }} />
    </S.Item>
  );
};

export default FolderEnd;
