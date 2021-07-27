/**
 * Created by nghinv on Tue Jul 27 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

export function clamp(x: number, min: number, max: number): number {
  'worklet';

  if (x < min) {
    return min;
  }
  if (x > max) {
    return max;
  }

  return x;
}

export const mix = (value: number, x: number, y: number) => {
  'worklet';

  return x * (1 - value) + y * value;
};

export function toRadian(theta: number) {
  'worklet';

  return (theta * Math.PI) / 180;
}

export function toDeg(theta: number) {
  'worklet';

  return (theta * 180) / Math.PI;
}
