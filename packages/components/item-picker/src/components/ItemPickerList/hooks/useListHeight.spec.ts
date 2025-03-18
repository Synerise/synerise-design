import { renderHook } from '@testing-library/react';
import { createRef } from 'react';
import { FOOTER_HEIGHT, SEARCH_BAR_HEIGHT } from '../constants';
import { useListHeight } from './useListHeight';

describe('useListHeight', () => {
  it('Should calculate fixed height', () => {
    const HEIGHT_CONFIG = {
      defaultHeight: 600,
      viewportHeightThreshold: 800,
      belowThresholdHeight: 400,
    }
    const containerRef = createRef<HTMLElement | undefined>();
    const { result } = renderHook(() =>
      useListHeight({
        heightConfig: HEIGHT_CONFIG,
        calculatedContentHeight: 600,
        containerRef,
      })
    );
    expect(result.current.outerWrapperHeight).toBe(`${HEIGHT_CONFIG.belowThresholdHeight}px`)
  });
  
  it('Should calculate height based on content height', () => {
    const LIST_PADDING = 16;
    const CONTENT_HEIGHT = 320;
    
    const containerRef = createRef<HTMLElement | undefined>();
    const { result } = renderHook(() =>
      useListHeight({
        heightConfig: 'fitContent',
        calculatedContentHeight: 320,
        containerRef,
      })
    );
    expect(result.current.offsetSpace).toBe(SEARCH_BAR_HEIGHT+FOOTER_HEIGHT);
    expect(result.current.listWrapperHeight).toBe(CONTENT_HEIGHT+LIST_PADDING)
    expect(result.current.outerWrapperHeight).toBe(`${CONTENT_HEIGHT+LIST_PADDING+SEARCH_BAR_HEIGHT+FOOTER_HEIGHT}px`)
  });
  
  it('Should calculate height withOut search bar', () => {
    const LIST_PADDING = 16;
    const CONTENT_HEIGHT = 320;
    
    const containerRef = createRef<HTMLElement | undefined>();
    const { result } = renderHook(() =>
      useListHeight({
        heightConfig: 'fitContent',
        calculatedContentHeight: 320,
        containerRef,
        includeSearchBar: false,
      })
    );
    expect(result.current.outerWrapperHeight).toBe(`${CONTENT_HEIGHT+LIST_PADDING+FOOTER_HEIGHT}px`)
  });
  
  it('Should calculate height withOut footer', () => {
    const LIST_PADDING = 16;
    const CONTENT_HEIGHT = 320;
    
    const containerRef = createRef<HTMLElement | undefined>();
    const { result } = renderHook(() =>
      useListHeight({
        heightConfig: 'fitContent',
        calculatedContentHeight: 320,
        containerRef,
        includeFooter: false,
      })
    );
    expect(result.current.outerWrapperHeight).toBe(`${CONTENT_HEIGHT+LIST_PADDING+SEARCH_BAR_HEIGHT}px`)
  });

});
