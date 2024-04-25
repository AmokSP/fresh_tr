import React, { CSSProperties, useState } from 'react';
import { Block, View } from '@tarojs/components';
import { getMenuButtonBoundingClientRect, usePageScroll } from '@tarojs/taro';

export type CustomNavbarProps = {
  /**
   * @default false
   */
  transparent?: boolean | 'auto' | number;

  /**
   * @default true
   */
  holdPlace?: boolean;

  /**
   * @default #fff
   */
  backgroundColor?: string;

  /**
   * @default {}
   */
  style?: CSSProperties;

  children?: any;
};

const HEADERPDB = 8; // The distance from the bottom of the capsule to the bottom of the navigation bar, 8 pixels
const menuButtonRect = getMenuButtonBoundingClientRect();

/** The total height of the navigation bar,
 *  which can be used to locate favorite prompts, paddingTop of the page when using custom navigation, etc.
 *  @description Total height of navigation bar = height of capsule + distance between capsule and top of screen + 8 (constant)
 */
export const NAVBAR_HEIGHT: number = menuButtonRect.height + menuButtonRect.top + HEADERPDB;
const NAVBAR_PLACEHOLDER_STYLE: CSSProperties = {
  boxSizing: 'content-box',
  paddingTop: `${menuButtonRect.top}px`,
  width: '100vw',
  height: `${menuButtonRect.height}px`,
  paddingBottom: `${HEADERPDB}px`,
  background: 'none',
};
const NAVBAR_STYLE: CSSProperties = {
  ...NAVBAR_PLACEHOLDER_STYLE,
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: 300,
};

export default React.memo(
  ({
    transparent = false,
    holdPlace = true,
    backgroundColor = '#fff',
    children = null,
    style = {},
  }: Partial<CustomNavbarProps>) => {
    const threshold =
      typeof transparent === 'number' ? transparent : transparent === 'auto' ? 35 : 0;
    const [transparentNavBar, setTransparentNavBar] = useState(
      typeof transparent === 'boolean' ? transparent : true
    );
    usePageScroll(
      typeof transparent === 'boolean'
        ? () => {}
        : (e) => {
            if (e.scrollTop > threshold && transparentNavBar) {
              setTransparentNavBar(false);
            } else if (e.scrollTop <= threshold && !transparentNavBar) {
              setTransparentNavBar(true);
            }
          }
    );
    return (
      <Block>
        <View style={NAVBAR_STYLE}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              transition: 'opacity 0.1s linear',
              opacity: transparentNavBar ? '0' : '1',
              background: backgroundColor,
              zIndex: 0,
              ...style,
            }}
          ></View>
          <View
            id={'navigation-wrapper'}
            style={{
              position: 'relative',
              height: '100%',
              zIndex: 1,
            }}
          >
            {children}
          </View>
        </View>
        {holdPlace && <View style={NAVBAR_PLACEHOLDER_STYLE}></View>}
      </Block>
    );
  }
);
