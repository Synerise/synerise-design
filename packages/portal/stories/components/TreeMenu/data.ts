export function generateItems(amount: number, start = 1) {
  const items = [];
  for(let i = start; i<=amount+start; i+=1) {
    items.push({
      id: i,
      key: i,
      title: `Option ${i}`,
      type: "folder"
    });
  }
  return items;
}

export const dataSource = [
  {
    id: 1,
    key: 1,
    title: 'With children',
    type: "folder",
    children: [
      ...generateItems(5, 100),
    ]
  },
  {
    id: 2,
    key: 2,
    title: 'With grandchildren',
    type: "folder",
    children: [
      {
        id: 2000,
        key: 2000,
        name: 'Subchildren',
        title: 'Subchildren',
        children: [
          ...generateItems(5, 2001)
        ]
      },
      ...generateItems(5, 200)
    ]
  },
  ...generateItems(1, 10)
];

export const dataSourceAlter = [
  ...generateItems(1, 10),
  ...generateItems(2, 20),
  {
    id: 1,
    title: 'Other options',
    type: "folder",
    children: [
      ...generateItems(5, 100),
    ]
  },
]