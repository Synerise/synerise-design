import * as React from "react";

import Dropdown from "@synerise/ds-dropdown";
import Button from "@synerise/ds-button";

import OverlayExample1 from "./OverlayExample1";
import { DSProvider } from "../../../../../components/core";

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
    <DSProvider code="en_GB">
      <Dropdown
        trigger={['click']}
        visible
        overlay={
          <OverlayExample1 onSearchChange={filter} data={filteredData} onClickAction={() => alert('Action clicked')} />
        }>
        <Button>Click</Button>
      </Dropdown>
    </DSProvider>
  );
};

export default Example1;
