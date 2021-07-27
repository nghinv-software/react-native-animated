/**
 * Created by nghinv on Tue Jul 27 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import type Animated from 'react-native-reanimated';

//-------------- Position -------------------//

/**
 * Point with position x, y
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Point x, y with type Animated.ShareValue<number>
 */
export interface PointAnimated {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
}

/**
 * Vector x, y with type T
 */
export interface Vector<T = number> {
  x: T;
  y: T;
}

/**
 * Vector x, y with type Animated.ShareValue<number>
 */
export type VectorAnimated = Vector<Animated.SharedValue<number>>;

/**
 * Polar Point type
 */
export interface PolarPoint {
  theta: number;
  radius: number;
}

/**
 * Polar Point Animated type
 */
export interface PolarPointAnimated {
  theta: Animated.SharedValue<number>;
  radius: Animated.SharedValue<number>;
}

export interface LayoutRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutRectangleAnimated {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
  width: Animated.SharedValue<number>;
  height: Animated.SharedValue<number>;
}

export interface Vector3<T = number> {
  x: T;
  y: T;
  z: T;
}

export interface Vector3Animated<T = number> {
  x: Animated.SharedValue<T>;
  y: Animated.SharedValue<T>;
  z: Animated.SharedValue<T>;
}

//-------------- Color -------------------//

export interface Hsv {
  h: number;
  s: number;
  v: number;
}

export interface HsvAnimated {
  h: Animated.SharedValue<number>;
  s: Animated.SharedValue<number>;
  v: Animated.SharedValue<number>;
}

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface RgbAnimated {
  r: Animated.SharedValue<number>;
  g: Animated.SharedValue<number>;
  b: Animated.SharedValue<number>;
}
