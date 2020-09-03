import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Add3M from '@synerise/ds-icon/dist/icons/Add3M';
import Button from '@synerise/ds-button';
import { Input } from '@synerise/ds-input';
import { Popover } from 'antd';
import { StarFillM, StarM } from '@synerise/ds-icon/dist/icons';
import { useOnClickOutside } from '@synerise/ds-utils';
import { v4 as uuid } from 'uuid';
import * as S from './AddModal.styles';
import { Props } from './AddModal.types';

const DEFAULT_NAME = '';
const POPUP_CLOSE_DELAY = 250;
const AddModal: React.FC<Props> = ({ onItemAdd, addItemLabel, disabled, placeholder }) => {
  const [name, setName] = React.useState(DEFAULT_NAME);
  const [favourite, setFavourite] = React.useState<boolean>(false);
  const [overlayVisible, setOverlayVisible] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(overlayRef, () => {
    setTimeout(() => {
      if (overlayVisible) {
        setOverlayVisible(false);
      }
    }, POPUP_CLOSE_DELAY);
    setName(DEFAULT_NAME);
  });

  const handleNameChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  }, []);

  const toggleInput = React.useCallback((): void => {
    setName(DEFAULT_NAME);
    setOverlayVisible(!overlayVisible);
  }, [overlayVisible]);

  const confirmAdd = (): void => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Name cannot be empty');
      return;
    }
    if (error) {
      setError('');
    }
    if (overlayVisible) {
      setOverlayVisible(false);
    }
    onItemAdd && onItemAdd({ id: uuid(), name: trimmedName, favourite });
  };

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        confirmAdd();
      }
    },
    [confirmAdd, name]
  );

  const focus = (inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>): void => {
    overlayVisible && inputRef.current && inputRef.current.focus();
  };
  return (
    <S.AddItemLayout>
      <Popover
        content={
          <S.Overlay ref={overlayRef}>
            <Input
              handleInputRef={focus}
              onKeyDown={handleKeyDown}
              label={addItemLabel}
              placeholder={placeholder}
              value={name}
              onChange={handleNameChange}
              errorText={error}
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
              <Button type="primary" onClick={confirmAdd}>
                {addItemLabel}
              </Button>
            </S.OverlayFooter>
          </S.Overlay>
        }
        placement="bottomLeft"
        trigger={['click']}
        visible={overlayVisible}
        onVisibleChange={() => {
          if (overlayVisible && inputRef?.current) {
            inputRef.current.focus();
          }
        }}
      >
        <Button type="ghost-primary" mode="icon-label" onClick={toggleInput} disabled={disabled}>
          <Icon component={<Add3M />} size={24} />
          {addItemLabel}
        </Button>
      </Popover>
    </S.AddItemLayout>
  );
};

export default AddModal;
