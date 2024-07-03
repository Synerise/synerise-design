import faker from 'faker';

export const dataSource = [...new Array(10)].map((item, itemIndex) => {
  const children = [...new Array(Math.floor(Math.random() * 10))];
  return {
    key: `parent-row-${itemIndex}`,
    name: faker.name.findName(),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
    age: Math.floor(Math.random() * 100),
    children: children.length
      ? children.map((child, childIndex) => ({
          key: `child-row-${itemIndex}-${childIndex}`,
          name: faker.name.findName(),
          unavailable: Math.random() < 0.1,
          disabled: Math.random() < 0.3,
          selectable: faker.random.boolean(),
          age: Math.floor(Math.random() * 100),
        }))
      : undefined,
  };
});
