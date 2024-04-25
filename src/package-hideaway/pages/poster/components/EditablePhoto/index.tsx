import React from 'react';
import { Image, View, Text } from '@tarojs/components';

export default React.memo((props: Photo & { onClick?: (e) => void }) => {
  const { src } = props;
  return (
    <View
      className='custom-photo'
      onTouchStart={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onClick={props.onClick}
      style={{
        position: 'absolute',
        width: props.width + 'px',
        height: props.height + 'px',
        transformOrigin: '0 0',
        transform: `translate(${props.x}px,${props.y}px) rotate(${props.rotation}deg)`,
      }}
    >
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
        }}
      >
        +
      </View>
      <Image
        src={src}
        style={{
          width: '100%',
          height: '100%',
          transform: `translate(-50%, -50%)`,
        }}
        mode='aspectFill'
      ></Image>
    </View>
  );
});
