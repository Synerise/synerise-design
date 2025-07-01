import { calculateHandlersPercentagePosition, getBlockedHandlersKeys, checkIsBlockedHandlersConfigEnabled } from './allocationHandlers.utils';
import type { HandlerConfig } from '../Slider.types';
import type { AllocationVariant } from '../Allocation/Allocation.types';

const mockAllocationVariants1: AllocationVariant[] = [
    { name: 'Variant A', percentage: 30, tabId: 1, tabLetter: 'A' },
    { name: 'Variant B', percentage: 40, tabId: 2, tabLetter: 'B' },
    { name: 'Variant C', percentage: 30, tabId: 3, tabLetter: 'C' },
  ];

const mockAllocationVariants2: AllocationVariant[] = [
    { name: 'Variant A', percentage: 10, tabId: 1, tabLetter: 'A' },
    { name: 'Variant B', percentage: 30, tabId: 2, tabLetter: 'B' },
    { name: 'Variant B', percentage: 55, tabId: 2, tabLetter: 'B' },
    { name: 'Variant C', percentage: 5, tabId: 3, tabLetter: 'C' },
];

const mockHandlersConfig1:HandlerConfig = {
    1:{
        blocked:true,
        blockedTooltipProps:{
            title:"Blocked Handler"
        }
    }
}
const mockHandlersConfig2:HandlerConfig = {
    ...mockHandlersConfig1,
    3:{
        blocked:true,
    }
}

describe(calculateHandlersPercentagePosition.name,()=>{

    it('should return correct handlers position', () => {
        expect(calculateHandlersPercentagePosition(mockAllocationVariants1)).toEqual([30,70]);
        expect(calculateHandlersPercentagePosition(mockAllocationVariants2)).toEqual([10,40,95]);
    });
})

describe(getBlockedHandlersKeys.name,()=>{

    it('should return blocked handlers keys', () => {
        expect(getBlockedHandlersKeys(mockHandlersConfig1)).toEqual([1]);
        expect(getBlockedHandlersKeys(mockHandlersConfig2)).toEqual([1,3]);
    });
})

describe(checkIsBlockedHandlersConfigEnabled.name,()=>{

    it('should be enabled blocked handlers config', () => {
        expect(checkIsBlockedHandlersConfigEnabled(mockHandlersConfig1)).toBe(true);
    });
})
