import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';

import Scrollbar from '../Scrollbar';

describe('Scrollbar', () => {
  it('should render scrollbar', () => {
    const MAX_HEIGHT = 100;
    const TEXT =
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum laborum nisi officia ut vitae? Architecto dolor dolores doloribus exercitationem explicabo ipsam, nisi nobis odit quo, recusandae rem ut. Architecto corporis deserunt distinctio dolores dolorum eligendi ex fuga, harum impedit ipsam molestias mollitia nesciunt nihil nulla, omnis perferendis ratione totam unde velit vitae. A ad aliquid aperiam commodi dicta dolore dolorem, dolorum eius excepturi facilis hic illo in inventore ipsa ipsum magnam maiores maxime odio officia omnis perferendis quod recusandae sapiente sed suscipit ullam vero voluptates! Amet aperiam consectetur dignissimos doloribus ea eius enim eveniet exercitationem fuga id ipsa ipsam ipsum maxime minima, molestiae numquam odio officia omnis placeat porro quia reprehenderit ullam voluptatibus? Aliquid animi delectus esse excepturi id laboriosam nostrum odio quis! Autem doloribus facere fuga itaque, necessitatibus numquam quam quasi repudiandae ut. Accusamus assumenda blanditiis est laboriosam non saepe. Adipisci debitis distinctio dolores doloribus excepturi harum itaque, magni maiores maxime nesciunt nisi nostrum officiis quas quasi, quis sunt ullam. Est et ipsum, provident quod sapiente sit? Harum, nulla numquam! Aperiam assumenda autem consectetur laboriosam nulla omnis optio quae quibusdam ut velit. Asperiores beatae cumque dolorum et id impedit in, iste, nam numquam perspiciatis quam recusandae similique sunt totam.';

    // ARRANGE
    const { container } = renderWithProvider(
      <Scrollbar maxHeight={MAX_HEIGHT} classes="test">
        {TEXT}
      </Scrollbar>,
    );

    const c = container.querySelectorAll('.test')[0];

    // ASSERT
    expect(c).toHaveStyle(`max-height: ${MAX_HEIGHT}px`);
  });
  it('should render dnd scrollbar', () => {
    const MAX_HEIGHT = 100;
    const TEXT =
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum laborum nisi officia ut vitae? Architecto dolor dolores doloribus exercitationem explicabo ipsam, nisi nobis odit quo, recusandae rem ut. Architecto corporis deserunt distinctio dolores dolorum eligendi ex fuga, harum impedit ipsam molestias mollitia nesciunt nihil nulla, omnis perferendis ratione totam unde velit vitae. A ad aliquid aperiam commodi dicta dolore dolorem, dolorum eius excepturi facilis hic illo in inventore ipsa ipsum magnam maiores maxime odio officia omnis perferendis quod recusandae sapiente sed suscipit ullam vero voluptates! Amet aperiam consectetur dignissimos doloribus ea eius enim eveniet exercitationem fuga id ipsa ipsam ipsum maxime minima, molestiae numquam odio officia omnis placeat porro quia reprehenderit ullam voluptatibus? Aliquid animi delectus esse excepturi id laboriosam nostrum odio quis! Autem doloribus facere fuga itaque, necessitatibus numquam quam quasi repudiandae ut. Accusamus assumenda blanditiis est laboriosam non saepe. Adipisci debitis distinctio dolores doloribus excepturi harum itaque, magni maiores maxime nesciunt nisi nostrum officiis quas quasi, quis sunt ullam. Est et ipsum, provident quod sapiente sit? Harum, nulla numquam! Aperiam assumenda autem consectetur laboriosam nulla omnis optio quae quibusdam ut velit. Asperiores beatae cumque dolorum et id impedit in, iste, nam numquam perspiciatis quam recusandae similique sunt totam.';

    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <Scrollbar maxHeight={MAX_HEIGHT} classes="test" withDnd>
        {TEXT}
      </Scrollbar>,
    );

    // ASSERT
    expect(getByTestId('dnd-scrollbar')).toBeTruthy();
  });
  it('should render virtual scrollbar', () => {
    const MAX_HEIGHT = 100;
    const TEXT =
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum laborum nisi officia ut vitae? Architecto dolor dolores doloribus exercitationem explicabo ipsam, nisi nobis odit quo, recusandae rem ut. Architecto corporis deserunt distinctio dolores dolorum eligendi ex fuga, harum impedit ipsam molestias mollitia nesciunt nihil nulla, omnis perferendis ratione totam unde velit vitae. A ad aliquid aperiam commodi dicta dolore dolorem, dolorum eius excepturi facilis hic illo in inventore ipsa ipsum magnam maiores maxime odio officia omnis perferendis quod recusandae sapiente sed suscipit ullam vero voluptates! Amet aperiam consectetur dignissimos doloribus ea eius enim eveniet exercitationem fuga id ipsa ipsam ipsum maxime minima, molestiae numquam odio officia omnis placeat porro quia reprehenderit ullam voluptatibus? Aliquid animi delectus esse excepturi id laboriosam nostrum odio quis! Autem doloribus facere fuga itaque, necessitatibus numquam quam quasi repudiandae ut. Accusamus assumenda blanditiis est laboriosam non saepe. Adipisci debitis distinctio dolores doloribus excepturi harum itaque, magni maiores maxime nesciunt nisi nostrum officiis quas quasi, quis sunt ullam. Est et ipsum, provident quod sapiente sit? Harum, nulla numquam! Aperiam assumenda autem consectetur laboriosam nulla omnis optio quae quibusdam ut velit. Asperiores beatae cumque dolorum et id impedit in, iste, nam numquam perspiciatis quam recusandae similique sunt totam.';

    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <Scrollbar maxHeight={MAX_HEIGHT} classes="test">
        {TEXT}
      </Scrollbar>,
    );

    // ASSERT
    expect(getByTestId('virtual-scrollbar')).toBeTruthy();
  });
});
