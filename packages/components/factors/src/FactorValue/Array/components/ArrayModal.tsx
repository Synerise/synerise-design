import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { IconAlert } from '@synerise/ds-alert';
import Button, { ButtonToggle } from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import Icon, { CodeM, EditM, TrashM } from '@synerise/ds-icon';
import { SearchInput } from '@synerise/ds-search';
import { useIsMounted } from '@synerise/ds-utils';

import { MODAL_VIEWPORT_HEIGHT } from '../Array.const';
import * as S from '../Array.styles';
import { type ArrayModalProps, type ArrayValueWithID } from '../Array.types';
import { arrayWithUUID, sanitiseValues } from '../Array.utils';
import { type ArrayValueElement } from './../../../Factors.types';
import { ArrayCreator } from './ArrayCreator';
import { ArrayLimit } from './ArrayLimit';
import { ArrayRaw } from './ArrayRaw';
import { CopyButton } from './CopyButton';

export const ArrayModal = <ItemType extends 'string' | 'number'>({
  value,
  itemType,
  onApply,
  onCancel,
  visible,
  readOnly,
  texts,
  limit,
  collectorSuggestions,
}: ArrayModalProps<ItemType>) => {
  const [arrayValue, setArrayValue] = useState(arrayWithUUID(value || []));
  const [currentMode, setCurrentMode] = useState<'creator' | 'raw'>('creator');
  const [searchQuery, setSearchQuery] = useState('');
  const [rawEditorError, setRawEditorError] = useState<ReactNode>();

  const isMounted = useIsMounted();

  useEffect(() => {
    isMounted.current && setArrayValue(arrayWithUUID(value || []));
  }, [value, isMounted]);

  const handleRawEditorError = (errorMessage: ReactNode) => {
    setRawEditorError(errorMessage);
  };

  const plainArrayValue = useMemo(
    () =>
      arrayValue.map((item) =>
        typeof item.value === 'string'
          ? (sanitiseValues(item.value) as ArrayValueElement<ItemType>)
          : item.value,
      ),
    [arrayValue],
  );

  const handleOk = useCallback(() => {
    onApply(plainArrayValue);
    setCurrentMode('creator');
  }, [onApply, plainArrayValue]);

  const handleCancel = useCallback(() => {
    onCancel();
    setArrayValue(arrayWithUUID(value || []));
    setCurrentMode('creator');
  }, [onCancel, value]);

  const showClearButton = !!arrayValue?.length && !readOnly;

  const handleClear = useCallback(() => {
    setArrayValue([]);
  }, []);

  const clearButton = useMemo(() => {
    return (
      <S.ModalFooterLeftSide>
        {showClearButton && (
          <Button
            onClick={handleClear}
            data-testid="array-modal-clear-button"
            type="custom-color-ghost"
            color="red"
            mode="icon-label"
          >
            <Icon component={<TrashM />} />
            {texts.array.clearButtonLabel}
          </Button>
        )}
      </S.ModalFooterLeftSide>
    );
  }, [showClearButton, texts.array.clearButtonLabel, handleClear]);

  const handleSearchQueryChange = (query?: string) => {
    setSearchQuery(query || '');
  };

  const handleValueChange = useCallback(
    (updatedArray: ArrayValueWithID<ItemType>[]) => {
      setArrayValue(updatedArray);
      setSearchQuery('');
    },
    [],
  );

  const mainModalContent = useMemo(() => {
    return currentMode === 'creator' ? (
      <ArrayCreator
        texts={texts}
        readOnly={readOnly}
        itemType={itemType}
        value={arrayValue}
        limit={limit}
        searchQuery={searchQuery}
        onValueChange={handleValueChange}
        collectorSuggestions={collectorSuggestions}
      />
    ) : (
      <ArrayRaw
        readOnly={readOnly}
        onError={handleRawEditorError}
        itemType={itemType}
        limit={limit}
        onValueChange={handleValueChange}
        texts={texts}
        value={arrayValue}
      />
    );
  }, [
    currentMode,
    texts,
    readOnly,
    itemType,
    arrayValue,
    limit,
    searchQuery,
    handleValueChange,
    collectorSuggestions,
  ]);

  return (
    <S.Modal
      size="medium"
      title={texts.array.modalTitle}
      headerBottomBar={
        <S.ModalSubHeader>
          <S.LeftSide>
            <ButtonGroup compact={false}>
              <ButtonToggle
                disabled={!!rawEditorError}
                mode="icon-label"
                type="ghost"
                activated={currentMode === 'creator'}
                onClick={() => setCurrentMode('creator')}
              >
                <Icon component={<EditM />} /> {texts.array.creatorButtonLabel}
              </ButtonToggle>
              <ButtonToggle
                mode="icon-label"
                activated={currentMode === 'raw'}
                type="ghost"
                onClick={() => setCurrentMode('raw')}
              >
                <Icon component={<CodeM />} /> {texts.array.rawButtonLabel}
              </ButtonToggle>
            </ButtonGroup>
          </S.LeftSide>
          <S.RightSide>
            {rawEditorError ? (
              <IconAlert iconAlert type="alert" message={rawEditorError} />
            ) : (
              <>
                {limit && (
                  <ArrayLimit
                    limit={limit}
                    count={arrayValue.length}
                    texts={texts}
                  />
                )}
              </>
            )}
            <CopyButton
              texts={texts}
              copyValue={plainArrayValue?.join(',') || ''}
            />
            <S.SearchWrapper>
              <SearchInput
                disabled={currentMode === 'raw'}
                closeOnClickOutside
                value={searchQuery}
                onChange={handleSearchQueryChange}
                onClear={handleSearchQueryChange}
                placeholder={texts.array.searchPlaceholder}
                clearTooltip={texts.array.searchClearTooltip}
              />
            </S.SearchWrapper>
          </S.RightSide>
        </S.ModalSubHeader>
      }
      closable
      onOk={!rawEditorError ? handleOk : undefined}
      onCancel={handleCancel}
      open={visible}
      texts={{
        okButton: texts.modalApply,
        cancelButton: texts.modalCancel,
      }}
      bodyStyle={{ padding: 0 }}
      footer={readOnly ? null : undefined}
      prefix={clearButton}
      viewportHeight={MODAL_VIEWPORT_HEIGHT}
      maxViewportHeight={
        currentMode === 'creator' ? MODAL_VIEWPORT_HEIGHT : undefined
      }
    >
      <>{mainModalContent}</>
    </S.Modal>
  );
};
