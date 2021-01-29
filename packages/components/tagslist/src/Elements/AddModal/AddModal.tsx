import * as React from 'react';

// import { v4 as uuid } from 'uuid';
import Icon from '@synerise/ds-icon';
import Add3M from '@synerise/ds-icon/dist/icons/Add3M';
import Button from '@synerise/ds-button';
import Menu from '@synerise/ds-menu';
import SearchBar from '@synerise/ds-search-bar';
import Checkbox from '@synerise/ds-checkbox';
import CheckboxTristate from '@synerise/ds-checkbox-tristate';
import Tooltip from '@synerise/ds-tooltip';
import { Settings2M, InfoFillS } from '@synerise/ds-icon/dist/icons';
import { useOnClickOutside } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';

// import { validateFolderName } from '../../utils';
import { AddModalProps } from './AddModal.types';
import * as S from './AddModal.styles';

const DEFAULT_NAME = '';
const POPUP_CLOSE_DELAY = 400;

type TagInfoProps = {
  info: string;
}

const TagInfo: React.FC<TagInfoProps> = ({info}) => {
  return <Tooltip
    title={info}
  >
    <S.TagInfoIcon component={<InfoFillS />} />
  </Tooltip> 
}

const AddModal: React.FC<AddModalProps> = ({ onItemAdd, disabled, texts, tristate = false }) => {
  const [name, setName] = React.useState(DEFAULT_NAME);
  const [overlayVisible, setOverlayVisible] = React.useState<boolean>(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(overlayRef, () => {
    setTimeout(() => {
      if (overlayVisible) {
        setOverlayVisible(false);
      }
    }, POPUP_CLOSE_DELAY);
    setName(DEFAULT_NAME);
  });

  const handleNameChange = React.useCallback((name: string): void => {
    setName(name);
  }, []);

  const toggleInput = React.useCallback((): void => {
    setName(DEFAULT_NAME);
    setOverlayVisible(!overlayVisible);
  }, [overlayVisible]);

  const focus = (inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>): void => {
    overlayVisible && inputRef.current && inputRef.current.focus();
  };

  const CheckboxComponent = tristate ? CheckboxTristate : Checkbox;

  return (
    <Dropdown
      overlay={
        <Dropdown.Wrapper style={{width: 'auto', minWidth: 'auto'}} ref={overlayRef}>
          <SearchBar 
            placeholder="Search"
            handleInputRef={focus}
            value={name}
            onSearchChange={handleNameChange}
          />
          <Menu asDropdownMenu style={{width: 'auto'}}>
            <S.TagItem
              prefixel={<CheckboxComponent />}
              suffixel={<TagInfo info="Testing tooltip" />}
            >Tag 1</S.TagItem>
            <S.TagItem 
              prefixel={<CheckboxComponent />}
              suffixel={<TagInfo info="Testing tooltip" />}
            >Tag 2</S.TagItem>
            <S.TagItem
              prefixel={<CheckboxComponent />}
              suffixel={<TagInfo info="Testing tooltip" />}
            >Tag 3</S.TagItem>
          </Menu>
          <Dropdown.BottomAction 
            onClickAction={() => {}} 
          >
            <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
              <div style={{flexGrow: 1}}>
                <Button type="ghost">
                  <Icon component={<Settings2M />} size={24} />&nbsp;
                  {texts?.enterSettings}
                </Button>
              </div>
              <Button type="ghost-primary">{texts?.applyAdd}</Button>
            </div>
          </Dropdown.BottomAction>
        </Dropdown.Wrapper>
      }
      placement="bottomLeft"
      trigger={['click']}
      overlayStyle={{ boxShadow: '0 4px 12px 0 rgba(138, 140, 145, 0.07)' }}
      visible={overlayVisible}
      onVisibleChange={(visible): void => {
        if (!visible) {
          // setFavourite(false);
        }
      }}
    >
      <S.ButtonWrapper style={{}}>
        <Button 
        type="ghost-primary" 
        mode="icon-label" 
        onClick={toggleInput} 
        disabled={disabled}>
          <Icon component={<Add3M />} size={24} />
          {texts?.addItemLabel}
        </Button>
      </S.ButtonWrapper>
    </Dropdown>
  );
};

export default AddModal;
