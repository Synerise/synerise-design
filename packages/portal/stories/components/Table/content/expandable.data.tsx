import faker from 'faker';

export const dataSource = [...new Array(1000)].map((item, itemIndex) => {
  const children = [...new Array(Math.floor(Math.random() * 10))];
  return {
    key: itemIndex,
    name: faker.name.findName(),
    age: Math.floor(Math.random() * 100),
    children: children.length ? children.map((child, childIndex) => ({
      key: `${itemIndex}-${childIndex}`,
      name: faker.name.findName(),
      age: Math.floor(Math.random() * 100),
    })) : undefined,
  }
});
