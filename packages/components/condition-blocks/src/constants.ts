/**
 * Stable class applied to `ConditionRemove` so a parent `ConditionRow` can reveal it on hover
 * without the two components sharing a styled-component reference across files.
 */
export const CONDITION_REMOVE_CLASS = 'ds-condition-remove';

/**
 * Vertical gap between stacked `ConditionRow`s (and the add button). Shared so the connector's
 * vertical line knows exactly how far to reach the next row — the only spacing it must bridge,
 * now that the connector cell stretches to its own row's full height.
 */
export const CONDITION_ROWS_GAP = 16;
