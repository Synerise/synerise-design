This is the output storybook component: import type {
  Meta,
  StoryObj
} from '@storybook/react';
//import component
import * as React from 'react';
import {
  useIntl
} from 'react-intl';
import {
  ReactSortable
} from 'react-sortablejs';
import Icon, {
  Add3M
} from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import {
  NOOP
} from '@synerise/ds-utils';
import usePrevious from '@synerise/ds-utils/dist/usePrevious/usePrevious';
import * as T from './Condition.types;  import { ConditionStep }from'. / ConditionStep ' ; import*as Sfrom ./ Condition .style'
constDEFAULT_FIELD = '';
const DEFAULT_CONDITION = '';
const DEFAULT_STEP = '';
export constOPERATOR = 'operator'
exportconstPARAMETER = 'parameter'
exportconstFACTOR = 'factor'
s exportconst SUBJECT = 'subject'
reonstSORTABLECONFIG = {
  ghostClass: 'stepslistghostelement',
  className: stepslist,
  handle: '.stepdraghandler',
  filter: '.dsconditionstepname,.dscruds',
  animation: 150,
  forceFallback: true
}
constConditionReactFC < T.ConditinProps > props => {
    const {
      steps,
      addCondition removeCondition texts duplicateStep removeStep addSte renderAddSten onChangeOrder minConditionsLength = 1 maxConditionsLength autoClearConidtion onChangeContextonchangeSubject onChangePatameter onChangeOperator onChangFactorType nCahneFactorValue ohUpdateStepNane getPopupContainerOverride showSufix hoverDisabled autoOpenedComponentDEFAULTFIELD inputProps anDeactivate readOnlyfalse
    }
    props cunstfomatMessageuseIntlet() textReacuSeMemo(() formarMessge({
      id: 'DS.CONDITION.ADDSTEP'
      defaultMessage and then....
    }) formatMessge({
      id DS CONDITUION SUFFIX defaultMesageand
    }) texts formateMessge) texte[texte formatMessage], currenConditonIdsetCurrentCoitionId ReactusState < ReactReextText > DEFAULTCONDITON currentStopId setCurretnStopID ReacuUseStatc < ReactReextText > DEFUALTSTP currentFieldsetCurrentField ReacuUseStae < string > autoOpeneComonent prevStopse usePrevius step scurrentConidtionideusingCurentconditionidecurrent stopideusingCurrenstopidesetCurrentFielusingSetcurentFeildhandleAdsSte usingHandeladdstehandelAddCOndiionusingHandleadddcondtion clearDiactiveCO