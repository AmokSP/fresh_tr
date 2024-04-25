import { Block, View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import React, { CSSProperties, useEffect, useState } from 'react';

export type FixedViewProps = {
  children?: JSX.Element | JSX.Element[] | string;
  style?: CSSProperties;
  holdPlace?: boolean;
};

export default React.memo((props: FixedViewProps) => {
  const { style, holdPlace = true } = props;
  const wrapperStyle: CSSProperties = {
    zIndex: 500,
    width: '100vw',
    height: 'auto',
    position: 'fixed',
    bottom: '0',
    left: '0',
    boxSizing: 'content-box',
    ...style,
  };
  const [holderStyle, setHolderStyle] = useState<CSSProperties>({});
  useDidShow(() => {});
  useEffect(() => {
    {
      holdPlace &&
        Taro.nextTick(() => {
          const sq = Taro.createSelectorQuery();
          sq.select('#footer')
            .boundingClientRect((res) => {
              setHolderStyle({
                position: 'relative',
                height: `${res?.height}px`,
                pointerEvents: 'none',
                left: 0,
              });
            })
            .exec();
        });
    }
  }, []);
  return (
    <Block>
      <View id='footer' style={wrapperStyle}>
        {props.children}
      </View>
      {holdPlace && <View id='fixed-footer-placeholder' style={holderStyle}></View>}
    </Block>
  );
});
