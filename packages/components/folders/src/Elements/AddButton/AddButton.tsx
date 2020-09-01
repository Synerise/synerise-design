import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Add3M from '@synerise/ds-icon/dist/icons/Add3M';
import Button from '@synerise/ds-button';
import { Input } from '@synerise/ds-input';
import { Popover } from 'antd';
import * as S from './AddButtons.styles';
import { Props } from './AddButton.types';
import { StarFillM, StarM } from '@synerise/ds-icon/dist/icons';
import { useOnClickOutside } from '@synerise/ds-utils';

const DEFAULT_NAME = '';
const POPUP_CLOSE_DELAY = 250;
const AddButton: React.FC<Props> = ({ onItemAdd, addItemLabel, disabled, placeholder }) => {
  const [active, setActive] = React.useState(false);
  const [name, setName] = React.useState(DEFAULT_NAME);
  const [favourite, setFavourite] = React.useState<boolean>(false);
  const [overlayVisible, setOverlayVisible] = React.useState<boolean>(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(overlayRef, () => {
    setTimeout(() => {
      if (overlayVisible) {
        setOverlayVisible(false);
      }
    }, POPUP_CLOSE_DELAY);
  });
  const handleClickOutside = React.useCallback((): void => {
    setActive(false);
    setName(DEFAULT_NAME);
  }, []);

  const handleNameChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  const toggleInput = React.useCallback((): void => {
    setActive(!active);
    setName(DEFAULT_NAME);
    setOverlayVisible(!overlayVisible);
  }, [active, overlayVisible]);

  const createItem = React.useCallback((): void => {
    onItemAdd && onItemAdd({ name });
    toggleInput();
  }, [name, onItemAdd, toggleInput]);
  return (
    <S.AddItemLayout>
      <Popover
        content={
          <S.Overlay ref={overlayRef}>
            <Input
              label="Folder name"
              placeholder="Add"
              icon1={
                <S.FavouriteIcon
                  favourite={favourite}
                  component={favourite ? <StarFillM /> : <StarM />}
                  onClick={(): void => {
                    setFavourite(!favourite);
                  }}
                />
              }
              icon1Tooltip={<span>Add to favourites</span>}
            />
            <S.OverlayFooter>
              <Button
                type="primary"
                onClick={() => {
                  if (overlayVisible) {
                    setOverlayVisible(false);
                  }
                }}
              >
                {addItemLabel}
              </Button>
            </S.OverlayFooter>
          </S.Overlay>
        }
        placement="bottomLeft"
        trigger={['click']}
        visible={overlayVisible}
      >
        <Button type="ghost-primary" mode="icon-label" onClick={toggleInput} disabled={disabled}>
          <Icon component={<Add3M />} size={24} />
          {addItemLabel}
        </Button>
      </Popover>
    </S.AddItemLayout>
  );
};

export default AddButton;
