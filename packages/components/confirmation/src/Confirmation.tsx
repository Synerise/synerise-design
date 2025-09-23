import React, { useMemo, useState } from 'react';

import Button from '@synerise/ds-button';
import { useTheme } from '@synerise/ds-core';
import Icon, { ArrowLeftM, ShowM } from '@synerise/ds-icon';
import type { ListItemProps } from '@synerise/ds-list-item';
import Modal from '@synerise/ds-modal';
import { Paragraph } from '@synerise/ds-typography';

import { BUTTON_COLOR_MAPPING } from './Confirmation.const';
import * as S from './Confirmation.styles';
import type { ConfirmationProps, DisplayMode } from './Confirmation.types';
import { getIconColor } from './Confirmation.utils';
import { BatchItemsList } from './components/BatchItemsList';
import { DecisionSection } from './components/DecisionSection';
import { useDefaultTexts } from './hooks/useDefaultTexts';

const Confirmation = <ItemType extends ListItemProps>({
  type,
  texts,
  title,
  description,
  onCancel,
  onOk,
  icon,
  batchActionItems,
  decisionOptions,
  relatedObjects,
  additionalInfo,
  secondaryButtonProps,
  mainButtonProps,
  ...modalProps
}: ConfirmationProps<ItemType>) => {
  const [mode, setMode] = useState<DisplayMode>('default');
  const theme = useTheme();
  const allTexts = useDefaultTexts(texts);

  const buttonColor = BUTTON_COLOR_MAPPING[type];
  const iconColor = getIconColor(type, theme);

  const modalContent = useMemo(() => {
    if (mode === 'default') {
      return (
        <S.ConfirmationModalContent>
          <S.ConfirmationModalContentMain>
            <Icon component={icon} size={96} color={iconColor} />
            <S.Title level={3}>{title}</S.Title>
            <Paragraph size="small">{description}</Paragraph>
          </S.ConfirmationModalContentMain>
          {additionalInfo && (
            <S.AdditionalInfo>{additionalInfo}</S.AdditionalInfo>
          )}
          {batchActionItems?.length && (
            <BatchItemsList
              items={batchActionItems}
              title={allTexts.batchActionItemsTitle}
            />
          )}
          {decisionOptions?.length && (
            <DecisionSection
              options={decisionOptions}
              title={allTexts.decisionTitle}
            />
          )}
        </S.ConfirmationModalContent>
      );
    }
    return relatedObjects;
  }, [
    relatedObjects,
    mode,
    icon,
    iconColor,
    additionalInfo,
    title,
    description,
    batchActionItems,
    decisionOptions,
    allTexts.batchActionItemsTitle,
    allTexts.decisionTitle,
  ]);

  const modalFooter = useMemo(() => {
    return mode === 'default' ? (
      <S.Footer>
        {relatedObjects && (
          <S.FooterLeft>
            <Button
              onClick={() => setMode('related-objects')}
              type="ghost"
              mode="icon-label"
            >
              <Icon component={<ShowM />} />{' '}
              {allTexts.relatedObjectsButtonLabel}
            </Button>
          </S.FooterLeft>
        )}
        <S.FooterRight>
          <Button type="secondary" onClick={onCancel} {...secondaryButtonProps}>
            {allTexts.secondaryButtonLabel}
          </Button>
          <Button
            type="custom-color"
            onClick={onOk}
            color={buttonColor}
            {...mainButtonProps}
          >
            {allTexts.mainButtonLabel}
          </Button>
        </S.FooterRight>
      </S.Footer>
    ) : null;
  }, [
    mode,
    onOk,
    onCancel,
    buttonColor,
    mainButtonProps,
    relatedObjects,
    secondaryButtonProps,
    allTexts.secondaryButtonLabel,
    allTexts.mainButtonLabel,
    allTexts.relatedObjectsButtonLabel,
  ]);

  const modalTitle =
    mode === 'related-objects' ? (
      <S.ModalBackTitle>
        <Icon onClick={() => setMode('default')} component={<ArrowLeftM />} />
        {allTexts.relatedObjectsTitle}
      </S.ModalBackTitle>
    ) : undefined;

  return (
    <Modal
      {...modalProps}
      onCancel={onCancel}
      size="small"
      blank={mode === 'default'}
      footer={modalFooter}
      bodyStyle={{ padding: 0 }}
      title={modalTitle}
    >
      {modalContent}
    </Modal>
  );
};
export default Confirmation;
