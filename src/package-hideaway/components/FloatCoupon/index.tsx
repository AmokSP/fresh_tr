import React, { CSSProperties } from 'react';
import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import FloatIcon from './floatIcon.png';
type FloatCouponProps = {
  style?: CSSProperties;
  onClick?: () => void;
};
export default React.memo((props: FloatCouponProps) => {
  return (
    <Image
      onClick={props.onClick}
      className='hideaway-float-coupon'
      mode='widthFix'
      style={{
        position: 'fixed',
        width: '180rpx',
        height: 'auto',
        left: '40rpx',
        bottom: '300rpx',
        ...props.style,
      }}
      src={FloatIcon}
    ></Image>
  );
});
