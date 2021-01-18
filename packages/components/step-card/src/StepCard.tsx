import * as React from 'react';
import Matching from '@synerise/ds-logic/dist/Matching/Matching';
import InlineEdit from '@synerise/ds-inline-edit';
import Cruds from '@synerise/ds-cruds';
import * as S from './StepCard.styles';

export type StepCardProps = {
  footer?: React.ReactNode;
  matching: boolean;
  name: string;
  onChangeName: (name: string) => void;
  onChangeMatching: (matching: boolean) => void;
};
const StepCard: React.FC<StepCardProps> = ({ children, name, onChangeName, footer, matching, onChangeMatching }) => {
  return (
    <S.Container>
      <S.Header>
        <S.LeftSide>
          <Matching
            matching={matching}
            onChange={onChangeMatching}
            texts={{ matching: 'Matching', notMatching: 'Not matching' }}
          />
          <InlineEdit
            input={{
              name: 'name-of-input',
              value: name,
              maxLength: 120,
              placeholder: 'This is placeholder',
              onChange: (event): void => onChangeName(event.target.value),
            }}
          />
        </S.LeftSide>
        <S.RightSide>
          <Cruds />
        </S.RightSide>
      </S.Header>
      <S.Body>{children}</S.Body>
      {footer && <S.Footer>{footer}</S.Footer>}
    </S.Container>
  );
};
export default StepCard;
