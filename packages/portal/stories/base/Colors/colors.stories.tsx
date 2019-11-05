import * as React from 'react';
import groupBy from 'ramda/es/groupBy';
// @ts-ignore
import './index.css';
import { ColorBar, colorMap, ColorPalette } from './utils';
import colors from '@synerise/ds-core/dist/style/colors.less';

const PRIMARY = ['blue', 'grey'];
const DISABLED = ['white'];
const groupedColors = groupBy(([color]) => (PRIMARY.includes(color) ? 'primary' : 'secondary'));
const { secondary, primary } = groupedColors(colorMap);
primary.reverse();

const stories = {
  Colors: () => (
    <div>
      <div className="container">
        <div className="primary-colors">
          <h2>Primary colors</h2>
          <div className="primary-colors__boxes">
            <div className="primary-colors__box">
              <ColorBar group={'blue'} value={'600'} color={colors['blue-600']} index={0} textColor="#fff" />
            </div>
            <div className="primary-colors__box">
              <ColorBar group={'grey'} value={'600'} color={colors['grey-600']} index={1} textColor="#fff" />
            </div>
          </div>
        </div>
        <div className="alert-colors">
          <h2>Alert colors</h2>
          <div className="primary-colors__boxes">
            <div className="primary-colors__box">
              <ColorBar group={'yellow'} value={'600'} color={colors['yellow-600']} index={0} textColor="#fff" />
            </div>
            <div className="primary-colors__box">
              <ColorBar group={'green'} value={'600'} color={colors['green-600']} index={1} textColor="#fff" />
            </div>
            <div className="primary-colors__box">
              <ColorBar group={'red'} value={'600'} color={colors['red-600']} index={1} textColor="#fff" />
            </div>
          </div>
        </div>

      </div>
      <div className="container">
        <h2>Primary colors full palette</h2>
        <ColorPalette palette={primary} />
      </div>
      <div className="container">
        <h2>Secondary colors full palette</h2>
        <ColorPalette palette={secondary.filter(([color]) => !DISABLED.includes(color))} />
      </div>
    </div>
  ),
};

export default {
  name: 'Intro|Core',
  stories,
  Component: ColorBar,
};
