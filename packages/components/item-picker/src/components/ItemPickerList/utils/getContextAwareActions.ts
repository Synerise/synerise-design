import {
  type Action,
  CONTEXT_AWARE_ACTIONS,
  type ContextAwareAction,
  type ContextAwareActionType,
} from '../../ItemPickerNew/types/actions.types';

const getActionByTypeAndSectionId = (
  actions: Action[],
  sectionId: string | undefined,
  actionType: Action['actionType'],
) => {
  return actions?.find(
    (action) =>
      action.actionType === actionType && action?.sectionId === sectionId,
  );
};

export const getContextAwareActions = (
  actions: Action[],
  sectionId: string | undefined,
) => {
  const globalLocalContextActions = CONTEXT_AWARE_ACTIONS.reduce<
    Partial<Record<ContextAwareActionType, ContextAwareAction>>
  >((contextActionsObject, contextActionsType) => {
    if (sectionId) {
      const localAction = getActionByTypeAndSectionId(
        actions,
        sectionId,
        contextActionsType,
      );
      if (localAction) {
        return { ...contextActionsObject, [contextActionsType]: localAction };
      }
    }
    const globalAction = getActionByTypeAndSectionId(
      actions,
      undefined,
      contextActionsType,
    );
    if (globalAction) {
      return { ...contextActionsObject, [contextActionsType]: globalAction };
    }
    return contextActionsObject;
  }, {});

  return globalLocalContextActions;
};
