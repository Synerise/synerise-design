import * as React from 'react';
import { useRef } from 'react';
import { boolean } from '@storybook/addon-knobs';

import Scrollbar from '@synerise/ds-scrollbar';

const decorator = storyFn => <div style={{ width: 350, background: '#fff' }}>{storyFn()}</div>;

const stories = {
  ScrollTo: () => {
    const scrollRef = useRef<HTMLElement>(null);
    const handleClick = id => {
      const item = document.getElementById(id);
      if (scrollRef.current && item) {
        scrollRef.current.scrollTo({
          left: item.offsetLeft,
          behavior: boolean('Smooth scrolling', true) ? 'smooth' : 'auto',
        });
      }
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => handleClick(1)}>scroll to 1</button>
          <button onClick={() => handleClick(2)}>scroll to 2</button>
          <button onClick={() => handleClick(3)}>scroll to 3</button>
          <button onClick={() => handleClick(4)}>scroll to 4</button>
          <button onClick={() => handleClick(5)}>scroll to 5</button>
          <button onClick={() => handleClick(6)}>scroll to 6</button>
          <button onClick={() => handleClick(7)}>scroll to 7</button>
          <button onClick={() => handleClick(8)}>scroll to 8</button>
          <button onClick={() => handleClick(9)}>scroll to 9</button>
          <button onClick={() => handleClick(10)}>scroll to 10</button>
        </div>
        <Scrollbar
          maxWidth={300}
          classes={'test'}
          absolute={boolean('Scrollbar over text', false)}
          loading={boolean('Show loading status', false)}
          ref={scrollRef}
        >
          <div
            style={{
              width: '1200px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <div
              id="1"
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                margin: '0 10px',
                border: '1px solid black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              1
            </div>
            <div
              id="2"
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                margin: '0 10px',
                border: '1px solid black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              2
            </div>
            <div
              id="3"
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                margin: '0 10px',
                border: '1px solid black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              3
            </div>
            <div
              id="4"
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                margin: '0 10px',
                border: '1px solid black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              4
            </div>
            <div
              id="5"
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                margin: '0 10px',
                border: '1px solid black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              5
            </div>
            <div
              id="6"
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                margin: '0 10px',
                border: '1px solid black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              6
            </div>
            <div
              id="7"
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                margin: '0 10px',
                border: '1px solid black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              7
            </div>
            <div
              id="8"
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                margin: '0 10px',
                border: '1px solid black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              8
            </div>
            <div
              id="9"
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                margin: '0 10px',
                border: '1px solid black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              9
            </div>
            <div
              id="10"
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                margin: '0 10px',
                border: '1px solid black',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              10
            </div>
          </div>
        </Scrollbar>
      </div>
    );
  },
};

export default {
  name: 'Components/Scrollbar',
  config: {},
  stories,
  decorator,
  Component: Scrollbar,
};
