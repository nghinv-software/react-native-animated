/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Created by nghinv on Tue Jul 27 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { useSharedValue } from 'react-native-reanimated';
import type {
  VectorAnimated,
  LayoutRectangleAnimated,
  HsvAnimated,
  RgbAnimated,
  Hsv,
  Rgb,
  LayoutRectangle,
} from './types';

export function useVector(x = 0, y?: number): VectorAnimated {
  return {
    x: useSharedValue(x),
    y: useSharedValue(y ?? x),
  };
}

export function useLayoutRectangle(
  x: number | LayoutRectangle,
  y?: number,
  width?: number,
  height?: number
): LayoutRectangleAnimated {
  if (typeof x === 'number') {
    return {
      x: useSharedValue(x),
      y: useSharedValue(y ?? x),
      width: useSharedValue(width ?? x),
      height: useSharedValue(height ?? x),
    };
  }

  return {
    x: useSharedValue(x.x),
    y: useSharedValue(x.y),
    width: useSharedValue(x.width),
    height: useSharedValue(x.height),
  };
}

export function useHsv(h: number | Hsv, s?: number, v?: number): HsvAnimated {
  if (typeof h === 'number') {
    return {
      h: useSharedValue(h),
      s: useSharedValue(s ?? h),
      v: useSharedValue(v ?? h),
    };
  }

  return {
    h: useSharedValue(h.h),
    s: useSharedValue(h.s),
    v: useSharedValue(h.v),
  };
}

export function useRgb(r: number | Rgb, g?: number, b?: number): RgbAnimated {
  if (typeof r === 'number') {
    return {
      r: useSharedValue(r),
      g: useSharedValue(g ?? r),
      b: useSharedValue(b ?? r),
    };
  }

  return {
    r: useSharedValue(r.r),
    g: useSharedValue(r.g),
    b: useSharedValue(r.b),
  };
}
