// @ts-nocheck
import figma from '@figma/code-connect';

import Condition from './Condition';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=14759-948&m=dev';

figma.connect(Condition, FIGMA_URL, {
  example: () => (
    <Condition
      minConditionsLength={1}
      steps={[
        {
          id: 'step-1',
          subject: {
            items: [],
            selectedItem: { id: 'event', name: 'Event' },
          },
          conditions: [
            {
              id: 'condition-1',
              parameter: { items: [], selectedItem: undefined },
              operator: { items: [], selectedItem: undefined },
            },
          ],
        },
      ]}
      addStep={() => 'new-step'}
      addCondition={(stepId) => 'new-condition'}
      removeCondition={() => undefined}
      onChangeSubject={() => undefined}
      onChangeContext={() => undefined}
      onChangeParameter={() => undefined}
      onChangeOperator={() => undefined}
      onChangeFactorValue={() => undefined}
      onChangeFactorType={() => undefined}
    />
  ),
});
