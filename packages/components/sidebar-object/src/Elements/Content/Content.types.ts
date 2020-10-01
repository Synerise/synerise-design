import { HeaderTexts } from '../Header/Header.types';


export type ContentProps ={
description: React.ReactNode;
tags: React.ReactNode;
textDescription: string;
texts: HeaderTexts;
autoSize: {minRows: number; maxRows: number};
};