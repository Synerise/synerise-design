import React from 'react';
import styled from 'styled-components';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { screen } from '@testing-library/react';

import { Box, Flex } from '../index';

const CONTENT = 'CONTENT';

const getInjectedStyles = (): string =>
  Array.from(document.querySelectorAll('style'))
    .map((node) => node.textContent ?? '')
    .join('\n');

const getRulesFor = (element: Element): string => {
  const styles = getInjectedStyles();
  return Array.from(element.classList)
    .map((cls) => styles.match(new RegExp(`\\.${cls}\\{[^}]*\\}`, 'g')) ?? [])
    .flat()
    .join('\n');
};

describe('FlexBox', () => {
  it('should render Flex', () => {
    renderWithProvider(<Flex>{CONTENT}</Flex>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });

  it('should render Box', () => {
    renderWithProvider(<Box>{CONTENT}</Box>);
    expect(screen.getByText(CONTENT)).toBeInTheDocument();
  });

  it('should map numeric gap to theme.space scale', () => {
    renderWithProvider(<Flex gap={2}>{CONTENT}</Flex>);
    expect(getRulesFor(screen.getByText(CONTENT))).toContain('gap:12px');
  });

  it('should pass string gap through verbatim', () => {
    renderWithProvider(<Flex gap="1rem">{CONTENT}</Flex>);
    expect(getRulesFor(screen.getByText(CONTENT))).toContain('gap:1rem');
  });

  it('should not emit a gap rule when prop is omitted', () => {
    renderWithProvider(<Flex>{CONTENT}</Flex>);
    expect(getRulesFor(screen.getByText(CONTENT))).not.toMatch(/\bgap:/);
  });

  it('should render Box as a border-box div', () => {
    renderWithProvider(<Box>{CONTENT}</Box>);
    const box = screen.getByText(CONTENT);
    expect(box.tagName).toBe('DIV');
    expect(getRulesFor(box)).toContain('box-sizing:border-box');
  });

  it('should make Flex a flex container', () => {
    renderWithProvider(<Flex>{CONTENT}</Flex>);
    expect(getRulesFor(screen.getByText(CONTENT))).toContain('display:flex');
  });

  it('should resolve space props through the real design-system theme', () => {
    renderWithProvider(
      <Box ml={1} mt={24}>
        {CONTENT}
      </Box>,
    );
    const rules = getRulesFor(screen.getByText(CONTENT));
    expect(rules).toContain('margin-left:8px');
    expect(rules).toContain('margin-top:24px');
  });

  it('should treat a fractional width as a percentage', () => {
    renderWithProvider(<Box width={1 / 2}>{CONTENT}</Box>);
    expect(getRulesFor(screen.getByText(CONTENT))).toContain('width:50%');
  });

  it('should emit a media query for a responsive tuple', () => {
    renderWithProvider(<Box width={[1, 1 / 2]}>{CONTENT}</Box>);

    const [cls] = Array.from(screen.getByText(CONTENT).classList).filter(
      (name) => getInjectedStyles().includes(`.${name}{`),
    );
    expect(getInjectedStyles()).toContain(
      `@media screen and (min-width:768px){.${cls}{width:50%;}}`,
    );
  });

  it('should render an element given by the as prop', () => {
    renderWithProvider(<Flex as="section">{CONTENT}</Flex>);
    expect(screen.getByText(CONTENT).tagName).toBe('SECTION');
  });

  describe('markup', () => {
    it('should keep style props out of the DOM', () => {
      const { container } = renderWithProvider(
        <Box
          width={1}
          height={40}
          maxWidth={588}
          color="#f00"
          opacity={1}
          fontWeight={500}
          mt={24}
        >
          {CONTENT}
        </Box>,
      );

      expect(
        container.querySelector(
          '[width], [height], [maxWidth], [color], [opacity], [fontWeight], [mt]',
        ),
      ).toBeNull();
    });

    it('should still forward genuine DOM attributes', () => {
      renderWithProvider(
        <Box id="the-box" title="a title" data-testid="box" width={1}>
          {CONTENT}
        </Box>,
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveAttribute('id', 'the-box');
      expect(box).toHaveAttribute('title', 'a title');
    });
  });

  describe('consumer overrides', () => {
    it('should let styled(Box) win at equal specificity', () => {
      const Wide = styled(Box)`
        width: 500px;
      `;
      renderWithProvider(<Wide width={1}>{CONTENT}</Wide>);

      const rules = getRulesFor(screen.getByText(CONTENT));
      expect(rules).toContain('width:100%');
      expect(rules).toContain('width:500px');
      expect(rules.indexOf('width:500px')).toBeGreaterThan(
        rules.indexOf('width:100%'),
      );
    });

    it('should let styled(Flex) win at equal specificity', () => {
      const Tall = styled(Flex)`
        height: 500px;
      `;
      renderWithProvider(<Tall height={40}>{CONTENT}</Tall>);

      const rules = getRulesFor(screen.getByText(CONTENT));
      expect(rules.indexOf('height:500px')).toBeGreaterThan(
        rules.indexOf('height:40px'),
      );
    });

    it('should drop a consumer transient prop rather than leak it', () => {
      const Fancy = styled(Box)<{ hasError?: boolean }>`
        border: ${({ hasError }): string =>
          hasError ? '1px solid red' : 'none'};
      `;
      const { container } = renderWithProvider(
        <Fancy hasError>{CONTENT}</Fancy>,
      );

      expect(container.querySelector('[hasError]')).toBeNull();
      expect(getRulesFor(screen.getByText(CONTENT))).toContain(
        'border:1px solid red',
      );
    });
  });
});
