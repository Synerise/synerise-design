const _DATE_TIME_PART_FORMAT = ['long', 'short', 'numeric'] as const;
export type DateTimePartFormat = (typeof _DATE_TIME_PART_FORMAT)[number];
