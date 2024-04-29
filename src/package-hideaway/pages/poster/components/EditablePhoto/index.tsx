import React from 'react';
import { Image, View, Text } from '@tarojs/components';
import { degToRad } from '../../utils/rotations';

export default React.memo((props: Photo & { onClick?: (e) => void }) => {
  const { src, rotation, x, y, status } = props;
  const cosV = Math.cos(degToRad(rotation) ?? 0);
  const sinV = Math.sin(degToRad(rotation) ?? 0);
  return (
    <View
      className='custom-photo'
      onTouchStart={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      style={{
        position: 'absolute',
        transformOrigin: '0 0',
        transform: `matrix(${cosV},${sinV},${-sinV},${cosV},${Math.round(x)},${Math.round(y)})`,
      }}
    >
      {
        {
          'success': (
            <View
              style={{
                position: 'absolute',
                transform: `translate(-50%,-50%) rotate(${-props.rotation}deg)`,
                width: '60rpx',
                height: '60rpx',
                borderRadius: '100%',
                border: '1px white dashed',
                zIndex: 3,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              +
            </View>
          ),
          'in_check': (
            <View
              style={{
                position: 'absolute',
                transform: `translate(-50%,-50%)`,
                width: '100%',
                height: '100%',
                zIndex: 3,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                background: 'rgba(0,0,0,0.7)',
              }}
            >
              审核中...
            </View>
          ),
          'invalid_content': (
            <View
              style={{
                position: 'absolute',
                transform: `translate(-50%,-50%)`,
                width: '60rpx',
                height: '60rpx',
                borderRadius: '100%',
                background: '#FF2C5F',
                zIndex: 3,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              !
            </View>
          ),
        }[status]
      }
      <Image
        src={src}
        onClick={props.onClick}
        style={{
          width: props.width + 'px',
          height: props.height + 'px',
          transform: `translate(-50%, -50%)`,
        }}
        mode='aspectFill'
      ></Image>
    </View>
  );
});
