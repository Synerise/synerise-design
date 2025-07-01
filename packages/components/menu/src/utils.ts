export const triggerPlacements = {
  left: {
    points: ['cr', 'cl'],
    offset: [-8, 0],
  },
  right: {
    points: ['cl', 'cr'],
    offset: [0, 0],
  },
  top: {
    points: ['bc', 'tc'],
    offset: [0, -8],
  },
  bottom: {
    points: ['tc', 'bc'],
    offset: [0, 8],
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -8],
  },
  topRight: {
    points: ['br', 'tr'],
    offset: [0, -8],
  },
  bottomRight: {
    points: ['tr', 'br'],
    offset: [0, 8],
  },
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 8],
  },
};
