import * as React from 'react';


export type OrderedListProps = {
  list?: boolean;
  options?: boolean;
  type: string | 'numbers' | 'withZeros' | 'withLetters' | 'withRomanian' ;
  content: React.ReactNode;
};