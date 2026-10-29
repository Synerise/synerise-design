import React from 'react';
import styled from 'styled-components';

import renderWithProvider from '../renderWithProvider/renderWithProvider';
import { declarationsFor, rulesFor } from './declarationsFor';

const Box = styled.div<{ $muted?: boolean }>`
  color: var(--ds-color-text-neutral-default);
  ${(props) => props.$muted && 'opacity: var(--ds-test-muted-opacity);'}
`;

const Stateful = styled.div`
  color: var(--ds-test-rest);
  &:hover {
    color: var(--ds-test-hover);
  }
  &:hover:before {
    content: '{}';
    color: var(--ds-test-hover-before);
  }
  &:not(.ds-off):first-child {
    opacity: var(--ds-test-structural);
  }
  & .child {
    color: var(--ds-test-descendant);
  }
  & + .sibling {
    color: var(--ds-test-sibling);
  }
`;

const Group = styled.div`
  & > .ds-probe-item:has(~ .ds-probe-item, ~ span > .ds-probe-item) {
    margin: var(--ds-test-has);
  }
`;

const Other = styled.div`
  & .ds-probe-item {
    margin: var(--ds-test-other-parent);
  }
`;

const Tinted = styled.div`
  svg {
    color: var(--ds-test-svg);
  }
`;

const Nested = styled.div`
  .ds-probe-inner > span {
    color: var(--ds-test-inner-span);
  }
`;

const Named = styled.div`
  .ds-probe-name {
    opacity: var(--ds-test-exact);
  }
  .ds-probe-name-long {
    opacity: var(--ds-test-prefix);
  }
  @media (max-width: 100px) {
    .ds-probe-name {
      opacity: var(--ds-test-media);
    }
  }
`;

describe('declarationsFor', () => {
  it('returns the declarations of rules targeting the element', () => {
    const { getByText } = renderWithProvider(<Box $muted>muted</Box>);

    expect(declarationsFor(getByText('muted'))).toContain(
      'opacity:var(--ds-test-muted-opacity)',
    );
  });

  it('ignores rules emitted for other elements earlier in the run', () => {
    renderWithProvider(<Box $muted>first</Box>);
    const { getByText } = renderWithProvider(<Box>plain</Box>);

    const declarations = declarationsFor(getByText('plain'));
    expect(declarations).toContain('color:var(--ds-color-text-neutral-default)');
    expect(declarations).not.toContain('--ds-test-muted-opacity');
  });

  it('throws when the element is missing', () => {
    expect(() => declarationsFor(null)).toThrow('element not found');
  });

  it('throws when the within element is missing', () => {
    const { getByText } = renderWithProvider(<Box>box</Box>);

    expect(() => declarationsFor(getByText('box'), { within: null })).toThrow(
      '`within` element not found',
    );
  });

  it('returns an empty string for an element without matching rules', () => {
    const { getByTestId } = renderWithProvider(<div data-testid="bare" />);

    expect(declarationsFor(getByTestId('bare'))).toBe('');
  });

  describe('state', () => {
    const renderStateful = () =>
      renderWithProvider(<Stateful data-testid="stateful" />).getByTestId(
        'stateful',
      );

    it('reads the resting state by default, keeping structural pseudo-classes', () => {
      const declarations = declarationsFor(renderStateful());

      expect(declarations).toContain('color:var(--ds-test-rest)');
      expect(declarations).toContain('opacity:var(--ds-test-structural)');
      expect(declarations).not.toContain('--ds-test-hover');
    });

    it('reads one state when asked', () => {
      const declarations = declarationsFor(renderStateful(), {
        state: ':hover',
      });

      expect(declarations).toContain('color:var(--ds-test-hover)');
      expect(declarations).toContain('color:var(--ds-test-hover-before)');
      expect(declarations).not.toContain('--ds-test-rest');
    });

    it('reads a pseudo-element of a state, with braces inside its strings', () => {
      const declarations = declarationsFor(renderStateful(), {
        state: ':hover:before',
      });

      expect(declarations).toContain("content:'{}'");
      expect(declarations).toContain('color:var(--ds-test-hover-before)');
      expect(declarations).not.toContain('color:var(--ds-test-hover);');
    });

    it('reads every state with `any`', () => {
      const declarations = declarationsFor(renderStateful(), { state: 'any' });

      expect(declarations).toContain('--ds-test-rest');
      expect(declarations).toContain('--ds-test-hover');
      expect(declarations).toContain('--ds-test-hover-before');
    });
  });

  describe('subject', () => {
    it('ignores rules for descendants and siblings of the element', () => {
      const { getByTestId } = renderWithProvider(
        <Stateful data-testid="stateful" />,
      );

      const declarations = declarationsFor(getByTestId('stateful'), {
        state: 'any',
      });
      expect(declarations).not.toContain('--ds-test-descendant');
      expect(declarations).not.toContain('--ds-test-sibling');
    });

    it('reads a rule that reaches the element through an ancestor', () => {
      const { getByTestId } = renderWithProvider(
        <Group>
          <div className="ds-probe-item" data-testid="item" />
          <div className="ds-probe-item" />
        </Group>,
      );

      expect(declarationsFor(getByTestId('item'))).toContain(
        'margin:var(--ds-test-has)',
      );
    });

    it('narrows to rules that come through the `within` ancestor', () => {
      const { getByTestId } = renderWithProvider(
        <>
          <Group data-testid="group">
            <div className="ds-probe-item" data-testid="item" />
          </Group>
          <Other />
        </>,
      );
      const item = getByTestId('item');

      expect(declarationsFor(item)).toContain('--ds-test-other-parent');
      const within = declarationsFor(item, { within: getByTestId('group') });
      expect(within).toContain('--ds-test-has');
      expect(within).not.toContain('--ds-test-other-parent');
    });

    it('matches a bare type subject only through a `within` ancestor', () => {
      const { getByTestId } = renderWithProvider(
        <Tinted data-testid="tinted">
          <svg data-testid="svg" />
        </Tinted>,
      );
      const svg = getByTestId('svg');

      expect(declarationsFor(svg)).toBe('');
      expect(declarationsFor(svg, { within: getByTestId('tinted') })).toContain(
        'color:var(--ds-test-svg)',
      );
    });

        it('matches a bare type subject only below the compound before it', () => {
      const { getByTestId } = renderWithProvider(
        <Nested data-testid="nested">
          <span className="ds-probe-inner" data-testid="outer-span">
            <span data-testid="inner-span" />
          </span>
        </Nested>,
      );
      const within = getByTestId('nested');

      expect(
        declarationsFor(getByTestId('outer-span'), { within }),
      ).not.toContain('--ds-test-inner-span');
      expect(
        declarationsFor(getByTestId('inner-span'), {
          within: getByTestId('outer-span'),
        }),
      ).toContain('color:var(--ds-test-inner-span)');
      // Through an element in between, as `.tab .ds-icon svg` reaches an svg.
      expect(
        declarationsFor(getByTestId('inner-span'), { within }),
      ).toContain('color:var(--ds-test-inner-span)');
    });

        it('matches whole class names only', () => {
      const { getByTestId } = renderWithProvider(
        <Named>
          <div className="ds-probe-name" data-testid="probe" />
        </Named>,
      );

      const declarations = declarationsFor(getByTestId('probe'));
      expect(declarations).toContain('opacity:var(--ds-test-exact)');
      expect(declarations).not.toContain('--ds-test-prefix');
    });
  });

  describe('rulesFor', () => {
    it('splits a selector list without breaking :has() arguments', () => {
      const { getByTestId } = renderWithProvider(
        <Group>
          <div className="ds-probe-item" data-testid="item" />
        </Group>,
      );

      const [rule] = rulesFor(getByTestId('item'));
      expect(rule.selector).toMatch(
        /> \.ds-probe-item:has\(~ \.ds-probe-item, ?~ span > \.ds-probe-item\)$/,
      );
    });

    it('keeps the selector of each state rule', () => {
      const { getByTestId } = renderWithProvider(
        <Stateful data-testid="stateful" />,
      );

      const selectors = rulesFor(getByTestId('stateful'), {
        state: 'any',
      }).map(({ selector }) => selector);
      expect(selectors.some((selector) => /:hover$/.test(selector))).toBe(true);
      expect(selectors.some((selector) => /:hover:before$/.test(selector))).toBe(
        true,
      );
    });

    it('reports the at-rule a rule is nested in', () => {
      const { getByTestId } = renderWithProvider(
        <Named>
          <div className="ds-probe-name" data-testid="probe" />
        </Named>,
      );

      const media = rulesFor(getByTestId('probe')).find(({ declarations }) =>
        declarations.includes('--ds-test-media'),
      );
      expect(media?.condition).toMatch(/^@media \(max-width: ?100px\)$/);
      const plain = rulesFor(getByTestId('probe')).find(({ declarations }) =>
        declarations.includes('--ds-test-exact'),
      );
      expect(plain?.condition).toBeUndefined();
    });
  });
});
