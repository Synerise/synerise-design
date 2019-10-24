const getColorByIndex = (index: number): string => {
  const colorIndex = index % 5;
  const COLORS = {
    0: 'yellow-600',
    1: 'green-600',
    2: 'orange-600',
    3: 'cyan-600',
    4: 'purple-600',
  };

  return COLORS[colorIndex];
};

export default getColorByIndex;
