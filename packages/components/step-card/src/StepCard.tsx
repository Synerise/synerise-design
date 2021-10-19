import * as React from 'react';
import Matching from '@synerise/ds-logic/dist/Matching/Matching';
import InlineEdit from '@synerise/ds-inline-edit';
import Cruds from '@synerise/ds-cruds';
import { DragHandleM } from '@synerise/ds-icon/dist/icons';
import { useIntl } from 'react-intl';
import { debounce } from 'lodash';

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
  const { formatMessage } = useIntl();
  const [nameValue, setNameValue] = React.useState(name);
  const onChangeNameDebounce = React.useCallback(debounce(onChangeName, 300), [onChangeName]);
  const text = React.useMemo(
    () => ({
      matching: formatMessage({ id: 'DS.MATCHING.MATCHING' }),
      notMatching: formatMessage({ id: 'DS.MATCHING.NOT-MATCHING' }),
      namePlaceholder: formatMessage({ id: 'DS.STEP-CARD.NAME-PLACEHOLDER' }),
      moveTooltip: formatMessage({ id: 'DS.STEP-CARD.MOVE' }),
      deleteTooltip: formatMessage({ id: 'DS.STEP-CARD.DELETE' }),
      duplicateTooltip: formatMessage({ id: 'DS.STEP-CARD.DUPLICATE' }),
      ...texts,
    }),
    [formatMessage, texts]
  );

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNameValue(event.target.value);
    onChangeNameDebounce(event.target.value);
  };

  return (
    <S.Container>
      <S.Header>
        <S.LeftSide>
          <Matching
            matching={matching}
            onChange={onChangeMatching}
            texts={{ matching: text.matching, notMatching: text.notMatching }}
          />
          <InlineEdit
            input={{
              name: 'name-of-input',
              value: nameValue,
              maxLength: 120,
              placeholder: text.namePlaceholder,
              onChange: handleChangeName,
            }}
          />
        </S.LeftSide>
        <S.RightSide>
          <S.CrudsWrapper>
            <Cruds.CustomAction
              title={text.moveTooltip}
              onClick={NOOP}
              icon={<DragHandleM />}
              className="step-card-drag-handler"
            />
            <Cruds
              deleteTooltip={text.deleteTooltip}
              onDelete={onDelete}
              duplicateTooltip={text.duplicateTooltip}
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
