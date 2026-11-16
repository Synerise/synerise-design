import {
  type ClientRect,
  type CollisionDetection,
  closestCenter,
  type DroppableContainer,
} from '@dnd-kit/core';

type Axis = 'x' | 'y';

type AxisGeometry = {
  start: 'left' | 'top';
  end: 'right' | 'bottom';
  size: 'width' | 'height';
};

type MeasuredContainer = {
  container: DroppableContainer;
  rect: ClientRect;
};

const GEOMETRY_BY_AXIS: Record<Axis, AxisGeometry> = {
  x: { start: 'left', end: 'right', size: 'width' },
  y: { start: 'top', end: 'bottom', size: 'height' },
};

/**
 * Collision detection for single-axis lists whose items differ in size.
 * The dragged item takes a neighbour's place once its leading edge crosses
 * that neighbour's center; with several crossed neighbours the furthest one
 * wins, and with none the active item itself is returned, so a drop keeps
 * the order. `closestCenter` would make a tall item travel about a quarter
 * of its own size, further than its overlay can move inside the list.
 */
export const createLeadingEdgeCollisionDetection = (
  axis: Axis,
): CollisionDetection => {
  const { start, end, size } = GEOMETRY_BY_AXIS[axis];
  const centerOf = (rect: ClientRect) => rect[start] + rect[size] / 2;

  return (args) => {
    const { active, collisionRect, droppableRects, droppableContainers } = args;
    const activeRect = droppableRects.get(active.id);
    const activeContainer = droppableContainers.find(
      ({ id }) => id === active.id,
    );
    if (!activeRect || !activeContainer) {
      return closestCenter(args);
    }

    const isMovingBackward = collisionRect[start] < activeRect[start];
    const isCrossed = ({ rect }: MeasuredContainer) =>
      isMovingBackward
        ? rect[start] < activeRect[start] &&
          collisionRect[start] < centerOf(rect)
        : rect[start] > activeRect[start] &&
          collisionRect[end] > centerOf(rect);
    const distanceFromActive = ({ rect }: MeasuredContainer) =>
      Math.abs(rect[start] - activeRect[start]);

    const target = droppableContainers
      .flatMap((container) => {
        const rect = droppableRects.get(container.id);
        return rect ? [{ container, rect }] : [];
      })
      .filter(isCrossed)
      .reduce<MeasuredContainer>(
        (furthest, candidate) =>
          distanceFromActive(candidate) > distanceFromActive(furthest)
            ? candidate
            : furthest,
        { container: activeContainer, rect: activeRect },
      );

    return [
      {
        id: target.container.id,
        data: {
          droppableContainer: target.container,
          value: Math.abs(centerOf(collisionRect) - centerOf(target.rect)),
        },
      },
    ];
  };
};
