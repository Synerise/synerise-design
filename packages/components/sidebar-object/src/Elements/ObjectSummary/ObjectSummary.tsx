import * as React from 'react';
import Description, { DescriptionRow } from '@synerise/ds-description';
import { ObjectSummaryProps } from './ObjectSummary.types';

const ObjectSummary: React.FC<ObjectSummaryProps> = ({inputObject}) => {
  const keys = Object.keys(inputObject);
  return ( <Description>
    {keys.map(key=> <DescriptionRow key={key} label={key === 'id'? key.toUpperCase(): key} value={inputObject[key]} />)}</Description>
  );

};

export default ObjectSummary;