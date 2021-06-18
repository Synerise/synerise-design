import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import { DropdownSkeletonProps } from './DropdownSkeleton.types';
import * as S from './DropdownSkeleton.styles';




const DropdownSkeleton: React.FC<DropdownSkeletonProps> = ({ size = 'M' }) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  return (
    <div>
      <Dropdown
        trigger={['click']}
        overlayStyle={{ borderRadius: '3px' }}
        visible={dropdownVisible}
        placement="bottomLeft"
        overlay={
          <Dropdown.Wrapper
            style={{ width: '220px' }}
            onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
            ref={ref}
          >
            <S.Container>
              <S.Wrapper size={size}>
                <S.SkeletonBar size={size} />
              </S.Wrapper>
              <S.Wrapper size={size}>
                <S.SkeletonBar size={size} />
              </S.Wrapper>
              <S.Wrapper size={size}>
                <S.SkeletonBar size={size} />
              </S.Wrapper>
            </S.Container>
          </Dropdown.Wrapper>
        }
      >
        <Dropdown.TextTrigger
          onClick={() => setDropdownVisible(!dropdownVisible)}
          size={5}
          value="Select"
          inactiveColor='blue-600'
        />
      </Dropdown>
    </div>
  );
};
export default DropdownSkeleton;
