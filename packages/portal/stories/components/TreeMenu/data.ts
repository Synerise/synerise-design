export function generateItems(amount: number, start = 1) {
  const items = [];
  for(let i = start; i<=amount+start; i+=1) {
    items.push({
      id: i,
      name: `Option ${i}`,
      type: "folder"
    });
  }
  return items;
}

export const defaultItems = [
  {
    id: 1,
    name: 'With Children',
    type: "folder",
    children: [
      ...generateItems(5, 100),
      {
        id: 3452345,
        name: 'Switch',
        type: 'switch'
      }
    ]
  },
  {
    id: 2,
    name: 'With multiple children',
    type: "folder",
    children: [
      {
        id: 2000,
        name: 'Subchildren',
        children: [
          ...generateItems(5, 2001)
        ]
      },
      ...generateItems(5, 200)
    ]
  },
  ...generateItems(1, 10)
];