import * as React from 'react';
import { simpleText } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';
import Tag from '@synerise/ds-tags/dist/Tag/Tag';
import { TagShape } from '@synerise/ds-tags/dist/Tag/Tag.types';
import { text, select } from '@storybook/addon-knobs';

const shapes = {
  'small square': TagShape.SMALL_SQUARE,
  'small round': TagShape.SMALL_ROUND,
  'status neutral': TagShape.STATUS_NEUTRAL,
  'status success': TagShape.STATUS_SUCCESS,
  'status error': TagShape.STATUS_ERROR,
  'default square': TagShape.DEFAULT_SQUARE,
  'default round': TagShape.DEFAULT_ROUND,
};
const withTag = () => {
  const defaultProps = getDefaultProps();
  const shape = select('Set tag shape', shapes, TagShape.SMALL_SQUARE);
  const suffixel = <Tag name={'Tag'} shape={shape} />;
  const props = {
    dataSource: attachKnobsToDataSource(simpleText),
    suffixel,
    ...defaultProps,
  } as object;
  return decorator(props);
};
export default withTag;
