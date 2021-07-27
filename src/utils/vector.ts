/**
 * Created by nghinv on Tue Jul 27 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import type { Vector, VectorAnimated, PolarPoint } from './types';

// reference from react-native-redash
export function createPoint(x1?: number, y1?: number) {
  'worklet';

  return {
    x: x1 ?? 0,
    y: y1 ?? x1 ?? 0,
  };
}

export function addVector(v1: Vector, v2: Vector | number) {
  'worklet';

  if (typeof v2 === 'number') {
    return {
      x: v1.x + v2,
      y: v1.y + v2,
    };
  }

  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  };
}

export function subVector(v1: Vector, v2: Vector | number) {
  'worklet';

  if (typeof v2 === 'number') {
    return {
      x: v1.x - v2,
      y: v1.y - v2,
    };
  }

  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
  };
}

export function addVectorAnimated(v1: VectorAnimated, v2: Vector | number) {
  'worklet';

  if (typeof v2 === 'number') {
    return {
      x: v1.x.value + v2,
      y: v1.y.value + v2,
    };
  }

  return {
    x: v1.x.value + v2.x,
    y: v1.y.value + v2.y,
  };
}

export function subVectorAnimated(v1: VectorAnimated, v2: Vector | number) {
  'worklet';

  if (typeof v2 === 'number') {
    return {
      x: v1.x.value - v2,
      y: v1.y.value - v2,
    };
  }

  return {
    x: v1.x.value - v2.x,
    y: v1.y.value - v2.y,
  };
}

export function canvas2Cartesian(v: Vector, center: Vector) {
  'worklet';

  return {
    x: v.x - center.x,
    y: -1 * (v.y - center.y),
  };
}

export function cartesian2Canvas(v: Vector, center: Vector) {
  'worklet';

  return {
    x: v.x + center.x,
    y: -1 * v.y + center.y,
  };
}

export function cartesian2Polar(v: Vector) {
  'worklet';

  return {
    theta: Math.atan2(v.y, v.x),
    radius: Math.sqrt(v.x ** 2 + v.y ** 2),
  };
}

export function polar2Cartesian(p: PolarPoint) {
  'worklet';

  return {
    x: p.radius * Math.cos(p.theta),
    y: p.radius * Math.sin(p.theta),
  };
}

export function polar2Canvas(p: PolarPoint, center: Vector) {
  'worklet';

  return cartesian2Canvas(polar2Cartesian(p), center);
}

export function canvas2Polar(v: Vector, center: Vector) {
  'worklet';

  return cartesian2Polar(canvas2Cartesian(v, center));
}
