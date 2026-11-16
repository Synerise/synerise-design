import {
  type Active,
  type ClientRect,
  closestCenter,
  type DroppableContainer,
  KeyboardCode,
  type SensorContext,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { describe, expect, it } from 'vitest';

import { createLeadingEdgeCollisionDetection } from '../leadingEdgeCollision';

type Axis = 'x' | 'y';
type ListItem = { id: string; size: number };

const GAP = 16;
const CROSS_AXIS_SIZE = 300;
const LIST_ID = 'list';

// A collapsed row above an expanded one: the overlay of the tall row can
// travel at most 52px up before it hits the top of the list.
const SHORT_THEN_TALL: ListItem[] = [
  { id: 'short', size: 36 },
  { id: 'tall', size: 260 },
];
const TALL_THEN_SHORT: ListItem[] = [
  { id: 'tall', size: 260 },
  { id: 'short', size: 36 },
];
const THREE_SHORT_THEN_TALL: ListItem[] = [
  { id: 'first', size: 36 },
  { id: 'second', size: 36 },
  { id: 'third', size: 36 },
  { id: 'tall', size: 260 },
];

const rectOnAxis = (axis: Axis, start: number, size: number): ClientRect =>
  axis === 'y'
    ? {
        top: start,
        bottom: start + size,
        height: size,
        left: 0,
        right: CROSS_AXIS_SIZE,
        width: CROSS_AXIS_SIZE,
      }
    : {
        left: start,
        right: start + size,
        width: size,
        top: 0,
        bottom: CROSS_AXIS_SIZE,
        height: CROSS_AXIS_SIZE,
      };

const layOut = (axis: Axis, items: ListItem[]) => {
  const rects = new Map<UniqueIdentifier, ClientRect>();
  items.reduce((start, { id, size }) => {
    rects.set(id, rectOnAxis(axis, start, size));
    return start + size + GAP;
  }, 0);
  return rects;
};

const createContainer = (id: string, index: number, items: ListItem[]) =>
  ({
    id,
    key: id,
    disabled: false,
    data: {
      current: {
        sortable: {
          containerId: LIST_ID,
          index,
          items: items.map((item) => item.id),
        },
      },
    },
    node: { current: document.createElement('div') },
    rect: { current: null },
  }) satisfies DroppableContainer;

const createActive = (id: string): Active => ({
  id,
  data: { current: undefined },
  rect: { current: { initial: null, translated: null } },
});

const startOf = (axis: Axis, rect: ClientRect) =>
  axis === 'y' ? rect.top : rect.left;

const sizeOf = (axis: Axis, rect: ClientRect) =>
  axis === 'y' ? rect.height : rect.width;

const moveAlongAxis = (axis: Axis, rect: ClientRect, travel: number) =>
  rectOnAxis(axis, startOf(axis, rect) + travel, sizeOf(axis, rect));

const buildArgs = (
  axis: Axis,
  items: ListItem[],
  activeId: string,
  travel: number,
) => {
  const droppableRects = layOut(axis, items);
  const activeRect = droppableRects.get(activeId);
  if (!activeRect) {
    throw new Error(`No item with id "${activeId}"`);
  }
  return {
    active: createActive(activeId),
    collisionRect: moveAlongAxis(axis, activeRect, travel),
    droppableRects,
    droppableContainers: items.map(({ id }, index) =>
      createContainer(id, index, items),
    ),
    pointerCoordinates: null,
  };
};

const detectOver = (
  axis: Axis,
  items: ListItem[],
  activeId: string,
  travel: number,
) =>
  createLeadingEdgeCollisionDetection(axis)(
    buildArgs(axis, items, activeId, travel),
  )[0]?.id;

describe('createLeadingEdgeCollisionDetection', () => {
  it.each<[string, Axis, ListItem[], string, number, string]>([
    // Short center 18, tall top 52: switches after 18 + 16 = 34px (< 52).
    ['tall up, not past short center', 'y', SHORT_THEN_TALL, 'tall', -34, 'tall'],
    ['tall up, past short center', 'y', SHORT_THEN_TALL, 'tall', -35, 'short'],
    ['tall up, at the top of the list', 'y', SHORT_THEN_TALL, 'tall', -52, 'short'],
    // Short center 294, tall bottom 260.
    ['tall down, not past short center', 'y', TALL_THEN_SHORT, 'tall', 34, 'tall'],
    ['tall down, past short center', 'y', TALL_THEN_SHORT, 'tall', 35, 'short'],
    // Tall center 182, short bottom 36.
    ['short down, not past tall center', 'y', SHORT_THEN_TALL, 'short', 146, 'short'],
    ['short down, past tall center', 'y', SHORT_THEN_TALL, 'short', 147, 'tall'],
    // Tall center 130, short top 276.
    ['short up, not past tall center', 'y', TALL_THEN_SHORT, 'short', -146, 'short'],
    ['short up, past tall center', 'y', TALL_THEN_SHORT, 'short', -147, 'tall'],
    // Centers 18, 70, 122; tall top 156.
    ['up past two of three', 'y', THREE_SHORT_THEN_TALL, 'tall', -100, 'second'],
    ['up past all three', 'y', THREE_SHORT_THEN_TALL, 'tall', -139, 'first'],
    // Centers 70, 122, 286; first bottom 36.
    ['down past two of three', 'y', THREE_SHORT_THEN_TALL, 'first', 100, 'third'],
    ['down past all three', 'y', THREE_SHORT_THEN_TALL, 'first', 251, 'tall'],
    ['no travel', 'y', SHORT_THEN_TALL, 'tall', 0, 'tall'],
    ['wide left, not past narrow center', 'x', SHORT_THEN_TALL, 'tall', -34, 'tall'],
    ['wide left, past narrow center', 'x', SHORT_THEN_TALL, 'tall', -35, 'short'],
    ['narrow right, not past wide center', 'x', SHORT_THEN_TALL, 'short', 146, 'short'],
    ['narrow right, past wide center', 'x', SHORT_THEN_TALL, 'short', 147, 'tall'],
  ])('%s (axis %s)', (_, axis, items, activeId, travel, expected) => {
    expect(detectOver(axis, items, activeId, travel)).toBe(expected);
  });

  it('returns a single collision carrying the droppable container', () => {
    const args = buildArgs('y', SHORT_THEN_TALL, 'tall', -35);

    const collisions = createLeadingEdgeCollisionDetection('y')(args);

    expect(collisions).toHaveLength(1);
    expect(collisions[0].data?.droppableContainer).toBe(
      args.droppableContainers[0],
    );
  });

  it('skips containers that have not been measured', () => {
    const args = buildArgs('y', THREE_SHORT_THEN_TALL, 'tall', -100);
    args.droppableRects.delete('second');

    const collisions = createLeadingEdgeCollisionDetection('y')(args);

    expect(collisions[0].id).toBe('third');
  });

  it('falls back to closestCenter when the active item is not measured', () => {
    const args = buildArgs('y', SHORT_THEN_TALL, 'tall', -35);
    args.droppableRects.delete('tall');

    const collisions = createLeadingEdgeCollisionDetection('y')(args);

    expect(collisions).toEqual(closestCenter(args));
  });

  describe('with sortableKeyboardCoordinates', () => {
    const moveByKey = (items: ListItem[], activeId: string, code: string) => {
      const args = buildArgs('y', items, activeId, 0);
      const droppableContainers = Object.assign(
        new Map(args.droppableContainers.map((entry) => [entry.id, entry])),
        {
          toArray: () => args.droppableContainers,
          getEnabled: () => args.droppableContainers,
          getNodeFor: () => undefined,
        },
      ) as unknown as SensorContext['droppableContainers'];
      const context: SensorContext = {
        activatorEvent: null,
        active: args.active,
        activeNode: null,
        collisionRect: args.collisionRect,
        collisions: null,
        draggableNodes: new Map(),
        draggingNode: null,
        draggingNodeRect: null,
        droppableRects: args.droppableRects,
        droppableContainers,
        over: null,
        scrollableAncestors: [],
        scrollAdjustedTranslate: null,
      };
      const coordinates = sortableKeyboardCoordinates(
        new KeyboardEvent('keydown', { code }),
        {
          active: activeId,
          currentCoordinates: { x: 0, y: args.collisionRect.top },
          context,
        },
      );
      if (!coordinates) {
        throw new Error(`No keyboard target for ${code}`);
      }
      const travel = coordinates.y - args.collisionRect.top;

      return detectOver('y', items, activeId, travel);
    };

    it.each<[string, ListItem[], string, string, string]>([
      ['tall up past short', SHORT_THEN_TALL, 'tall', KeyboardCode.Up, 'short'],
      ['tall down past short', TALL_THEN_SHORT, 'tall', KeyboardCode.Down, 'short'],
      ['short up past tall', TALL_THEN_SHORT, 'short', KeyboardCode.Up, 'tall'],
      ['short down past tall', SHORT_THEN_TALL, 'short', KeyboardCode.Down, 'tall'],
    ])('moves %s in one key press', (_, items, activeId, code, expected) => {
      expect(moveByKey(items, activeId, code)).toBe(expected);
    });
  });
});
