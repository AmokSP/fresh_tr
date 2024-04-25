import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { posterToView } from '../../utils/scale';

export default React.memo((props: TextField & { onClick?: () => void }) => {
  const { content, fontSize, lineHeight,error } = props;
  return (
    <View
      style={{
        position: 'absolute',
        width: Taro.pxTransform(props.width * 2),
        height: Taro.pxTransform(props.height * 2),
        transformOrigin: '0 0',
        transform: `translate(${props.x}px,${props.y}px) rotate(${props.rotation}deg)`,
      }}
    >
      <Text
        onClick={props.onClick}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: `translate(-50%, -50%)`,
          border: error? '1px #ff2c5f dashed':'1px white dashed',
          color: props.color,
          fontWeight: props.fontWeight,
          textAlign: props.textAlign,
          lineHeight: lineHeight === undefined ? '1.5' : posterToView(lineHeight) + 'px',
          fontSize: posterToView(fontSize ?? 24),
        }}
        className='custom-text'
      >
        {content}
      </Text>
    </View>
  );
});
