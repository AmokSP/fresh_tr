import Taro from '@tarojs/taro';

const { windowWidth } = Taro.getSystemInfoSync();
export const POSTER_WIDTH = 375;
export const POSTER_HEIGHT = 812;
export function posterToView(value): number {
  return (value * windowWidth) / POSTER_WIDTH;
}
export function viewToPoster(value): number {
  return (value / windowWidth) * POSTER_WIDTH;
}
