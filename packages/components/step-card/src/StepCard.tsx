import * as React from 'react';
import Matching from '@synerise/ds-logic/dist/Matching/Matching';
import InlineEdit from '@synerise/ds-inline-edit';
import Cruds from '@synerise/ds-cruds';
import { DragHandleM } from '@synerise/ds-icon/dist/icons';
import * as S from './StepCard.styles';
import { StepCardProps } from './StepCard.types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};

const StepCard: React.FC<StepCardProps> = ({
  children,
  name,
  onChangeName,
  onDelete,
  onDuplicate,
  footer,
  matching,
  onChangeMatching,
  texts,
}) => {
  return (
    <S.Container>
      <S.Header>
        <S.LeftSide>
          <Matching
            matching={matching}
            onChange={onChangeMatching}
            texts={{ matching: texts.matching, notMatching: texts.notMatching }}
          />
          <InlineEdit
            input={{
              name: 'name-of-input',
              value: name,
              maxLength: 120,
              placeholder: texts.namePlaceholder,
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => onChangeName(event.target.value),
            }}
          />
        </S.LeftSide>
        <S.RightSide>
          <S.CrudsWrapper>
            <Cruds.CustomAction title={texts.moveTooltip} onClick={NOOP} icon={<DragHandleM />} />
            <Cruds
              deleteTooltip={texts.deleteTooltip}
              onDelete={onDelete}
              duplicateTooltip={texts.duplicateTooltip}
              onDuplicate={onDuplicate}
            />
          </S.CrudsWrapper>
        </S.RightSide>
      </S.Header>
      <S.Body>{children}</S.Body>
      {footer && <S.Footer>{footer}</S.Footer>}
    </S.Container>
  );
};
export default StepCard;
