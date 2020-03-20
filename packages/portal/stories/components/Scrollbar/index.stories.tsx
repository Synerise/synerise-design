import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import {boolean} from "@storybook/addon-knobs";

const decorator = (storyFn) => (
  <div style={{width: 400, background: '#fff'}}>
    {storyFn()}
  </div>
);

const stories = {
  default: () => {
    return (
      <Scrollbar maxHeight={250} classes={'test'} absolute={boolean('Scrollbar over text', false)}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum laborum nisi officia ut vitae? Architecto
          dolor dolores doloribus exercitationem explicabo ipsam, nisi nobis odit quo, recusandae rem ut. Architecto
          corporis deserunt distinctio dolores dolorum eligendi ex fuga, harum impedit ipsam molestias mollitia nesciunt
          nihil nulla, omnis perferendis ratione totam unde velit vitae. A ad aliquid aperiam commodi dicta dolore
          dolorem, dolorum eius excepturi facilis hic illo in inventore ipsa ipsum magnam maiores maxime odio officia
          omnis perferendis quod recusandae sapiente sed suscipit ullam vero voluptates! Amet aperiam consectetur
          dignissimos doloribus ea eius enim eveniet exercitationem fuga id ipsa ipsam ipsum maxime minima, molestiae
          numquam odio officia omnis placeat porro quia reprehenderit ullam voluptatibus? Aliquid animi delectus esse
          excepturi id laboriosam nostrum odio quis! Autem doloribus facere fuga itaque, necessitatibus numquam quam
          quasi repudiandae ut. Accusamus assumenda blanditiis est laboriosam non saepe. Adipisci debitis distinctio
          dolores doloribus excepturi harum itaque, magni maiores maxime nesciunt nisi nostrum officiis quas quasi, quis
          sunt ullam. Est et ipsum, provident quod sapiente sit? Harum, nulla numquam! Aperiam assumenda autem
          consectetur laboriosam nulla omnis optio quae quibusdam ut velit. Asperiores beatae cumque dolorum et id
          impedit in, iste, nam numquam perspiciatis quam recusandae similique sunt totam.
        </div>
      </Scrollbar>
    )
  },
};

export default {
  name: 'Components|Scrollbar',
  config: {},
  stories,
  decorator,
  Component: Scrollbar,
}
