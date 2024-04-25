import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

export default function Tabs({ onChange, tabList, textSize = 28, slideColor, slideThickness = 2 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideStyle = {
    width: `${100 / tabList.length}%`,
    transform: `translateX(${currentIndex * 100}%) scaleX(0.5)`,
    backgroundColor: slideColor,
    height: Taro.pxTransform(slideThickness),
  };

  const handleClick = (index) => {
    setCurrentIndex(index);
    onChange && onChange(index);
  };

  return (
    <View className={styles['tabs']} style={{ fontSize: Taro.pxTransform(textSize) }}>
      <View className={styles['tabs__wrap']}>
        {tabList.map((item, index) => {
          const tabClass = classNames([
            styles['tabs__tab'],
            {
              [styles['tabs__tab__active']]: currentIndex === index,
            },
          ]);
          return (
            <View
              className={tabClass}
              key={item.id}
              onClick={() => {
                handleClick(index);
              }}
            >
              {item.label}
            </View>
          );
        })}
        <View className={styles['tabs__slider']} style={slideStyle}></View>
      </View>
    </View>
  );
}
