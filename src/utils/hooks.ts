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
} from './types';

export function useVector(x1 = 0, y1?: number): VectorAnimated {
  const x = useSharedValue(x1);
  const y = useSharedValue(y1 ?? x1);
  return { x, y };
}

export function useLayoutRectangle(
  x = 0,
  y?: number,
  width?: number,
  height?: number
): LayoutRectangleAnimated {
  return {
    x: useSharedValue(x),
    y: useSharedValue(y ?? x),
    width: useSharedValue(width ?? x),
    height: useSharedValue(height ?? x),
  };
}

export function useHsv(h = 0, s?: number, v?: number): HsvAnimated {
  return {
    h: useSharedValue(h),
    s: useSharedValue(s ?? h),
    v: useSharedValue(v ?? h),
  };
}

export function useRgb(r = 0, g?: number, b?: number): RgbAnimated {
  return {
    r: useSharedValue(r),
    g: useSharedValue(g ?? r),
    b: useSharedValue(b ?? r),
  };
}
