const DATE_TIME_PART_FORMAT = ['long', 'short', 'numeric'] as const;
export type DateTimePartFormat = typeof DATE_TIME_PART_FORMAT[number];
