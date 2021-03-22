import React, { memo, forwardRef, Ref } from 'react';

import * as S from '../../TreeMenu.styles';
import * as Is from '../Item/Item.styles';

const Ghost = memo(
  forwardRef<HTMLDivElement, {}>((props, ref: Ref<HTMLDivElement>) => (
    <div ref={ref}>
      <S.TreeMenu key="ghost-menu">
        <Is.ItemGhost depth={0} className="ds-treemenu-item-ghost">
          <Is.Item {...props} />
        </Is.ItemGhost>
      </S.TreeMenu>
    </div>
  ))
);

export default Ghost;
