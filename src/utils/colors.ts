/**
 * Created by nghinv on Fri Jul 23 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { clamp } from './math';

const RGB_MAX = 255;
const HUE_MAX = 360;
const SV_MAX = 100;

function _normalizeAngle(degrees: number) {
  'worklet';

  return ((degrees % 360) + 360) % 360;
}

export const rgb2Hex = (r: any, g: any, b: any) => {
  'worklet';

  if (typeof r === 'object') {
    const args = r;
    r = args.r;
    g = args.g;
    b = args.b;
  }
  r = Math.round(r).toString(16);
  g = Math.round(g).toString(16);
  b = Math.round(b).toString(16);

  r = r.length === 1 ? `0${r}` : r;
  g = g.length === 1 ? `0${g}` : g;
  b = b.length === 1 ? `0${b}` : b;

  return `#${r}${g}${b}`;
};

export function rgb2Hsv(r: any, g: any, b: any) {
  'worklet';

  if (typeof r === 'object') {
    const args = r;
    r = args.r;
    g = args.g;
    b = args.b;
  }

  // It converts [0,255] format, to [0,1]
  // @ts-ignore
  r = r === RGB_MAX ? 1 : (r % RGB_MAX) / parseFloat(RGB_MAX);
  // @ts-ignore
  g = g === RGB_MAX ? 1 : (g % RGB_MAX) / parseFloat(RGB_MAX);
  // @ts-ignore
  b = b === RGB_MAX ? 1 : (b % RGB_MAX) / parseFloat(RGB_MAX);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  const v = max;

  const d = max - min;

  const s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * HUE_MAX),
    s: Math.round(s * SV_MAX),
    v: Math.round(v * SV_MAX),
  };
}

export function hex2Rgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

  return null;
}

export function hex2Hsv(hex: string) {
  'worklet';

  const rgb = hex2Rgb(hex)!;
  return rgb2Hsv(rgb.r, rgb.g, rgb.b);
}

export const hsv2Rgb = (h: any, s: any, v: any) => {
  'worklet';

  if (typeof h === 'object') {
    const args = h;
    h = args.h;
    s = args.s;
    v = args.v;
  }

  h = _normalizeAngle(h);
  // @ts-ignore
  h = h === HUE_MAX ? 1 : ((h % HUE_MAX) / parseFloat(HUE_MAX)) * 6;
  // @ts-ignore
  s = s === SV_MAX ? 1 : (s % SV_MAX) / parseFloat(SV_MAX);
  // @ts-ignore
  v = v === SV_MAX ? 1 : (v % SV_MAX) / parseFloat(SV_MAX);

  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];

  return {
    r: Math.floor(r * RGB_MAX),
    g: Math.floor(g * RGB_MAX),
    b: Math.floor(b * RGB_MAX),
  };
};

export function hsv2Hex(h: any, s: any, v: any) {
  'worklet';

  const rgb = hsv2Rgb(h, s, v);
  return rgb2Hex(rgb.r, rgb.g, rgb.b);
}

export function colorTemperature2Rgb(kelvin: number) {
  'worklet';

  const temp = kelvin / 100;

  let red: number;
  let green: number;
  let blue: number;

  if (temp <= 66) {
    red = 255;
    green = temp;
    green = 99.4708025861 * Math.log(green) - 161.1195681661;

    if (temp <= 19) {
      blue = 0;
    } else {
      blue = temp - 10;
      blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
    }
  } else {
    red = temp - 60;
    red = 329.698727446 * Math.pow(red, -0.1332047592);

    green = temp - 60;
    green = 288.1221695283 * Math.pow(green, -0.0755148492);

    blue = 255;
  }

  return {
    r: clamp(Math.round(red), 0, 255),
    g: clamp(Math.round(green), 0, 255),
    b: clamp(Math.round(blue), 0, 255),
  };
}
