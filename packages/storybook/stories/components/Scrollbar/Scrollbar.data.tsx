import React from 'react';
import { faker } from '@faker-js/faker';

export const getContent = (orientation?: string) => (
  <div style={{ width: orientation === 'horizontal' ? '600px' : 'auto' }}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum laborum nisi officia ut vitae? Architecto dolor
    dolores doloribus exercitationem explicabo ipsam, nisi nobis odit quo, recusandae rem ut. Architecto corporis
    deserunt distinctio dolores dolorum eligendi ex fuga, harum impedit ipsam molestias mollitia nesciunt nihil nulla,
    omnis perferendis ratione totam unde velit vitae. A ad aliquid aperiam commodi dicta dolore dolorem, dolorum eius
    excepturi facilis hic illo in inventore ipsa ipsum magnam maiores maxime odio officia omnis perferendis quod
    recusandae sapiente sed suscipit ullam vero voluptates! Amet aperiam consectetur dignissimos doloribus ea eius enim
    eveniet exercitationem fuga id ipsa ipsam ipsum maxime minima, molestiae numquam odio officia omnis placeat porro
    quia reprehenderit ullam voluptatibus? Aliquid animi delectus esse excepturi id laboriosam nostrum odio quis! Autem
    doloribus facere fuga itaque, necessitatibus numquam quam quasi repudiandae ut. Accusamus assumenda blanditiis est
    laboriosam non saepe. Adipisci debitis distinctio dolores doloribus excepturi harum itaque, magni maiores maxime
    nesciunt nisi nostrum officiis quas quasi, quis sunt ullam. Est et ipsum, provident quod sapiente sit? Harum, nulla
    numquam! Aperiam assumenda autem consectetur laboriosam nulla omnis optio quae quibusdam ut velit. Asperiores beatae
    cumque dolorum et id impedit in, iste, nam numquam perspiciatis quam recusandae similique sunt totam.
  </div>
);

export const getData = () =>
  [...new Array(20)].map((_item, index) => {
    return {
      id: index,
      name: faker.person.fullName(),
    };
  });

export const INITIAL_DATA = getData();

export const SORTABLE_CONFIG = {
  animation: 200,
  forceFallback: true,
};

const ITEM_STYLE = {
  width: '100%',
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ececec',
  cursor: 'grab',
  margin: '2px 0',
};

export const renderItem = (item: ItemType) => {
  return (
    <div style={ITEM_STYLE} key={`${item.id}-${item.name}`}>
      {item.id}.{item.name}
    </div>
  );
};

export type ItemType = typeof INITIAL_DATA[number];
