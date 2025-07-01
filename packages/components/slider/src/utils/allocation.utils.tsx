import {
  type AllocationMark,
  type AllocationVariant,
} from '../Allocation/Allocation.types';

export const countControlGroupAllocation = (userAllocation: number[]): number =>
  100 - userAllocation.reduce((prev, curr) => prev + curr, 0);

export const countAllocation = (
  variants: AllocationVariant[] | undefined = [],
  controlGroup = false,
  recalculate = false,
): number[] => {
  if (variants.length === 0) {
    return [];
  }

  if (recalculate) {
    const numberOfVariants = controlGroup
      ? variants.length + 1
      : variants.length;
    const percentPerVariant = Math.floor(100 / numberOfVariants);
    const percentLeft = 100 - numberOfVariants * percentPerVariant;
    const recalculatedArr = new Array(numberOfVariants - 1).fill(
      percentPerVariant,
    );
    return [...recalculatedArr, percentPerVariant + percentLeft];
  }

  const allocation = [...variants.map((v) => v.percentage as number)];

  if (controlGroup) {
    allocation.push(countControlGroupAllocation(allocation));
  }

  return allocation;
};

export const mergeAllocationWithVariants = (
  variants: Partial<AllocationVariant>[] = [],
  allocation: number[],
): AllocationVariant[] =>
  variants.map((v, index) => ({
    ...v,
    percentage: allocation[index],
  })) as AllocationVariant[];

export const recalculateVariantsAllocation = (
  variants: AllocationVariant[],
  controlGroup = false,
): AllocationVariant[] => {
  const allocation = countAllocation(variants, controlGroup, true);
  return mergeAllocationWithVariants(variants, allocation);
};

export const mapUserAllocationToHandles = (
  userAllocation: number[],
): number[] =>
  userAllocation
    .reduce(
      (result: number[], item, index) => [
        ...result,
        parseInt(item as unknown as string, 10) +
          parseInt((result[index - 1] || 0) as unknown as string, 10),
      ],
      [],
    )
    .slice(0, userAllocation.length - 1);

export const mapUserAllocationToMarks = (
  userAllocation: number[],
  markRenderer: Function,
  variants: AllocationVariant[] = [],
): AllocationMark =>
  userAllocation
    .map((a, i) => ({
      value: `${a}%`,
      view:
        a / 2 +
        (i
          ? userAllocation
              .slice(0, i)
              .reduce((result, item) => result + item, 0)
          : 0),
    }))
    .reduce(
      (result, item, index) => ({
        ...result,
        [item.view]: markRenderer(item.value, index, variants),
      }),
      {},
    ) as AllocationMark;

export const mapSliderValueToVariants = (
  value: number[],
  variants: Partial<AllocationVariant>[] = [],
): AllocationVariant[] => {
  const allocation = value.reduce(
    (prev, curr) => [
      ...prev,
      curr - prev.reduce((previous, current) => previous + current, 0),
    ],
    [] as number[],
  );

  allocation.push(countControlGroupAllocation(allocation));

  return mergeAllocationWithVariants(variants, allocation);
};

const DEFAULT_MIN_PERCENTAGE = 1;

export const checkIsPercentageInBoundaries = (
  variants: AllocationVariant[],
) => {
  return !variants.some(
    (variant) =>
      variant.percentage < (variant.minPercentage ?? DEFAULT_MIN_PERCENTAGE),
  );
};
