import {
  countAllocation,
  mergeAllocationWithVariants,
} from './allocation.utils';
import { type AllocationVariant } from '../Allocation/Allocation.types';

const VARIANTS_WITH_ALLOCATION: AllocationVariant[] = [
  { name: 'Variant A', percentage: 20, tabId: 1, tabLetter: 'A' },
  { name: 'Variant B', percentage: 30, tabId: 2, tabLetter: 'B' },
  { name: 'Variant C', percentage: 50, tabId: 3, tabLetter: 'C' },
];
const VARIANTS_WITHOUT_ALLOCATION: Partial<AllocationVariant>[] = [
  { name: 'Variant A', tabId: 1, tabLetter: 'A' },
  { name: 'Variant B', tabId: 2, tabLetter: 'B' },
  { name: 'Variant C', tabId: 3, tabLetter: 'C' },
];
const ALLOCATION = [20, 30, 50];
describe('Slider allocation utils', () => {
  it('should extract allocation values from given variants', () => {
    expect(countAllocation(VARIANTS_WITH_ALLOCATION)).toStrictEqual(ALLOCATION);
  });
  it('should merge allocation values with given variants', () => {
    expect(mergeAllocationWithVariants(VARIANTS_WITHOUT_ALLOCATION as AllocationVariant[], ALLOCATION)).toStrictEqual(
      VARIANTS_WITH_ALLOCATION
    );
  });
});
