import React from 'react';
import styled from 'styled-components';

/*
 * Stand-in for a consumer's filter bar (e.g. @synerise/rsql-filter's
 * `variant="toolbar"`), used to exercise the `subHeaderComponent` slot in
 * Chromatic. Deliberately a fixture rather than the real package: the DS
 * storybook must not depend on a consumer library.
 */
const Bar = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.palette['grey-200']};
  background: ${({ theme }) => theme.palette['white']};
`;

const Pills = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
  padding: 16px 24px;
`;

const Pill = styled.span`
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.palette['grey-200']};
  border-radius: 3px;
  color: ${({ theme }) => theme.palette['grey-800']};
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
`;

const Toggle = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 16px 24px;
  border-left: 1px solid ${({ theme }) => theme.palette['grey-200']};
  color: ${({ theme }) => theme.palette['grey-600']};
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
`;

const PILLS = [
  'Name contains "Tropical"',
  'Type is 2',
  'Create date between 24 Aug 2026 - 24 Aug 2026',
  'Size greater than 123 MB',
  'Author is Alexandra Young',
];

export const MockSubHeaderBar = () => (
  <Bar>
    <Pills>
      {PILLS.map((label) => (
        <Pill key={label}>{label}</Pill>
      ))}
    </Pills>
    <Toggle>Basic | RSQL</Toggle>
  </Bar>
);
