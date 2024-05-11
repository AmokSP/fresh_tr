import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { posterToView } from '../../utils/scale';
import { degToRad } from '../../utils/rotations';

export default React.memo((props: TextField & { onClick?: () => void }) => {
  const { content, x, y, fontSize, lineHeight, error, rotation, limit } = props;
  const cosV = Math.cos(degToRad(rotation) ?? 0);
  const sinV = Math.sin(degToRad(rotation) ?? 0);
  return (
    <View
      style={{
        position: 'absolute',
        transformOrigin: '0 0',
        transform: `matrix(${cosV},${sinV},${-sinV},${cosV},${Math.round(x)},${Math.round(y)})`,
      }}
    >
      <Text
        onClick={props.onClick}
        style={{
          position: 'absolute',
          width: props.width + 'px',
          height: props.height + 'px',
          transform: `translate(-50%, -50%)`,
          border: error ? '1px #ff2c5f dashed' : '1px white dashed',
          color: props.color,
          fontWeight: props.fontWeight,
          textAlign: props.textAlign,
          wordBreak: 'break-all',
          lineHeight: lineHeight === undefined ? '1.5' : posterToView(lineHeight) + 'px',
          fontSize: posterToView(fontSize ?? 24),
        }}
        className='custom-text'
      >
        {content.slice(0, limit)}
      </Text>
    </View>
  );
});
