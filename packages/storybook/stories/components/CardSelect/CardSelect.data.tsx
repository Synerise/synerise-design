import React from "react";
import { faker } from "@faker-js/faker";
import { CardSelectProps } from "@synerise/ds-card-select";


const DESCIRIPTIONS = [
    "Delectatio dolor officiis maiores.",
    "Aequus tabgo curvo universe.",
    "Cruentus denuo surculus coaegresco.",
    "Celer constans harum acidus tabgo curvo praesentium.",
    "Callide cursus vix dolor.",
    "Praesentium vesper cohors crur."
]
export const generateItems = (count: number, args: Partial<CardSelectProps>, withDescription) => {
  return Array(count)
    .fill(1)
    .map((_item, index) => ({
      ...args,
      description: withDescription ? <div className="chromatic-ignore" style={{height: '100%'}}>{DESCIRIPTIONS[index]}</div> : undefined,
      key: faker.string.uuid(),
    }));
};