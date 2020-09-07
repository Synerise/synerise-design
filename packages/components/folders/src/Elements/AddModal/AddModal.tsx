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
import { validateFolderName } from '../../utils';

const DEFAULT_NAME = '';
const POPUP_CLOSE_DELAY = 250;
const AddModal: React.FC<Props> = ({ onItemAdd, disabled, texts }) => {
  const [name, setName] = React.useState(DEFAULT_NAME);
  const [favourite, setFavourite] = React.useState<boolean>(false);
  const [overlayVisible, setOverlayVisible] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | React.ReactNode>();
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

  const confirmAdd = React.useCallback((): void => {
    if (!validateFolderName(name)) {
      setError(texts.invalidNameError);
      return;
    }
    if (error) {
      setError(undefined);
    }
    if (overlayVisible) {
      setOverlayVisible(false);
    }
    const trimmedName = name.trim();
    onItemAdd &&
      onItemAdd({ id: uuid(), name: trimmedName, favourite, canEnterSettings: true, canUpdate: true, canDelete: true });
    setFavourite(false);
  }, [name, error, onItemAdd, overlayVisible, favourite, texts.invalidNameError]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        confirmAdd();
      }
    },
    [confirmAdd]
  );
  const focus = (inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>): void => {
    overlayVisible && inputRef.current && inputRef.current.focus();
  };
  return (
    <S.AddItemLayout>
      <Popover
        className="ds-folders-add"
        content={
          <S.Overlay ref={overlayRef}>
            <Input
              handleInputRef={focus}
              onKeyDown={handleKeyDown}
              label={texts.addItemLabel}
              placeholder={texts.folderNamePlaceholder}
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
              icon1Tooltip={<span>{texts.addToFavourite}</span>}
            />
            <S.OverlayFooter>
              <Button type="primary" onClick={confirmAdd}>
                {texts.addItemLabel}
              </Button>
            </S.OverlayFooter>
          </S.Overlay>
        }
        placement="bottomLeft"
        trigger={['click']}
        visible={overlayVisible}
      >
        <S.ButtonWrapper>
          <Button type="ghost-primary" mode="icon-label" onClick={toggleInput} disabled={disabled}>
            <Icon component={<Add3M />} size={24} />
            {texts.addItemLabel}
          </Button>
        </S.ButtonWrapper>
      </Popover>
    </S.AddItemLayout>
  );
};

export default AddModal;
