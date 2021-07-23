/**
 * Created by nghinv on Fri Jul 23 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import Animated, { useSharedValue } from 'react-native-reanimated';

export interface Vector<T = number> {
  x: T;
  y: T;
}

export const useVector = (
  x1 = 0,
  y1?: number
): Vector<Animated.SharedValue<number>> => {
  const x = useSharedValue(x1);
  const y = useSharedValue(y1 ?? x1);
  return { x, y };
};

export interface PolarPoint {
  theta: number;
  radius: number;
}

export const canvas2Cartesian = (v: Vector, center: Vector) => {
  'worklet';

  return {
    x: v.x - center.x,
    y: -1 * (v.y - center.y),
  };
};

export const cartesian2Canvas = (v: Vector, center: Vector) => {
  'worklet';

  return {
    x: v.x + center.x,
    y: -1 * v.y + center.y,
  };
};

export const cartesian2Polar = (v: Vector) => {
  'worklet';

  return {
    theta: Math.atan2(v.y, v.x),
    radius: Math.sqrt(v.x ** 2 + v.y ** 2),
  };
};

export const polar2Cartesian = (p: PolarPoint) => {
  'worklet';

  return {
    x: p.radius * Math.cos(p.theta),
    y: p.radius * Math.sin(p.theta),
  };
};

export const polar2Canvas = (p: PolarPoint, center: Vector) => {
  'worklet';

  return cartesian2Canvas(polar2Cartesian(p), center);
};

export const canvas2Polar = (v: Vector, center: Vector) => {
  'worklet';

  return cartesian2Polar(canvas2Cartesian(v, center));
};

export const toRadian = (theta: number) => {
  'worklet';

  return (theta * Math.PI) / 180;
};

export const toDeg = (theta: number) => {
  'worklet';

  return (theta * 180) / Math.PI;
};
