import * as React from "react";

import Dropdown from "@synerise/ds-dropdown";
import Button from "@synerise/ds-button";

import OverlayExample1 from "./OverlayExample1";

const Example1 = () => {
  const data = [
    [
      { text: 'Item 1' },
      { text: 'Item 2' },
      { text: 'Item 3' },
      { text: 'Item 4' },
    ],
  ];

  const [ filteredData, setFilteredData ] = React.useState(data);

  const filter = (searchTerm: string) => {
    const newData = data.map(list => list.filter(item => {
      return item.text.includes(searchTerm);
    }));

    setFilteredData(newData);
  };

  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <OverlayExample1 onSearchChange={filter} data={filteredData} onClickAction={() => alert('Action clicked')} />
      }>
      <Button>Click</Button>
    </Dropdown>
  );
};

export default Example1;
