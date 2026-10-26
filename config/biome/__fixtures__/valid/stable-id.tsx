export const List = ({ items }: { items: { id: string }[] }) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>row</li>
    ))}
  </ul>
);
