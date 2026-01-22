import { type AllocationVariant, type HandlerConfig } from '../Slider.types';

export const calculateHandlersPercentagePosition = (
  variants?: AllocationVariant[],
) => {
  if (!variants) {
    return [];
  }
  return variants
    ?.reduce<
      number[]
    >((prev, curr) => [...prev, curr.percentage + (prev.length ? prev[prev.length - 1] : 0)], [])
    .slice(0, -1);
};

export const getBlockedHandlersKeys = (handlers?: HandlerConfig) => {
  if (!handlers) {
    return [];
  }

  const blockedHandlersKeys = Object.keys(handlers).filter(
    (handlerKey) => handlers[parseInt(handlerKey)].blocked,
  );

  return blockedHandlersKeys.map(Number);
};

export const checkIsBlockedHandlersConfigEnabled = (
  handlers?: HandlerConfig,
) => {
  return !!handlers && Object.values(handlers).some(({ blocked }) => blocked);
};

export const checkIsBlockedVariantsChange = (
  blockedHandlersKeys: number[],
  currentHandlersPercentagePositions: number[],
  afterChangeHandlersPercentagePositions: number[],
) => {
  return blockedHandlersKeys.some(
    (blockedHandlerKey) =>
      currentHandlersPercentagePositions[blockedHandlerKey - 1] !==
      afterChangeHandlersPercentagePositions[blockedHandlerKey - 1],
  );
};
