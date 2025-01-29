import { removeEmptyEntries } from './utils';
import { WeeklySchedule, WeeklyScheduleDayValue } from './Weekly.types';


const dayValue = {
    "start": "06:00:00.000",
    "stop": "20:59:59.999",
    "restricted": true,
    "display": false,
    "inverted": false,
    "mode": "Range"
} as WeeklyScheduleDayValue;
const scheduleWithEmptyEntries: WeeklySchedule = {
    '5de64ead-e81e-4bf9-8e13-47e8829b8cc3': {
        0: {...dayValue},
        1: {...dayValue},
        2: {...dayValue},
        3: {...dayValue},
        4: {...dayValue},
        5: {...dayValue},
        6: {...dayValue}
    },
    // @ts-ignore
    '5dr44ead-e81e-4bf9-8e13-47e8829b8cc3': {}
};

describe('Weekly utils', () => {
    it('removeEmptyEntries should clear entries with no day data', () => {
        removeEmptyEntries(scheduleWithEmptyEntries)
        expect(Object.keys(scheduleWithEmptyEntries).length).toBe(1);
        expect(Object.keys(scheduleWithEmptyEntries)[0]).toBe('5de64ead-e81e-4bf9-8e13-47e8829b8cc3');
    })
});