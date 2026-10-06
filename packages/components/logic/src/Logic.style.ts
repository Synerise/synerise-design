import styled from 'styled-components';

export const Logic = styled.div<{ readOnly?: boolean }>`
  user-select: none;
  position: relative;
  .ds-title {
    cursor: pointer;

    ${({ readOnly }): string =>
      !readOnly
        ? `&:after {
      position: absolute;
      bottom: -2px;
      width: 100%;
      content: '';
      height: 1px;
      left: 1px;
      background-image: linear-gradient(
        to right,
        var(--ds-color-text-base-muted) 25%,
        transparent 0%
      );
      background-position: top;
      background-size: 4px 1px;
      background-repeat: repeat-x;
    }`
        : ''}
  }

  ${({ readOnly }): string =>
    !readOnly
      ? ` &:hover {
    .ds-title {
      color: var(--ds-color-text-brand-defaulthover);
      &:after {
        background-image: linear-gradient(
          to right,
          var(--ds-color-text-brand-defaulthover) 25%,
          transparent 0%
        );
      }
    }
  }`
      : ''}
`;
