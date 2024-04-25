import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { CSSProperties } from 'react';
export type SafeBottomProps = {
  children: JSX.Element | JSX.Element[] | string;
  style?: CSSProperties;
  className?: string;
  fallBackPadding?: string | number;
};
const { windowHeight, safeArea } = Taro.getSystemInfoSync();

const SAFE_BOTTOM = windowHeight - (safeArea?.bottom ?? windowHeight);

export default React.memo((props: SafeBottomProps) => {
  const calculatedStyle = React.useMemo<CSSProperties>(() => {
    return {
      boxSizing: 'content-box',
      paddingBottom: SAFE_BOTTOM !== 0 ? `${SAFE_BOTTOM}px` : props.fallBackPadding,
      ...props.style,
    };
  }, [props.style]);
  return (
    <View className={props.className} style={calculatedStyle}>
      {props.children}
    </View>
  );
});
