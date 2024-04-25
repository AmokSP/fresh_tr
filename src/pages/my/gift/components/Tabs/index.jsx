import { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.scss';

export default function Tabs({ tabsData = [], onChange, status }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = tabsData.findIndex((item) => item.status === status);
    setCurrentIndex(index);
  }, [status]);

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    onChange && onChange(item);
  };

  return (
    <View className={styles['tabs']}>
      {tabsData.map((item, index) => {
        const itemClass = classNames([
          styles['tabs__item'],
          {
            [styles['tabs__item__active']]: index === currentIndex,
          },
        ]);
        return (
          <View
            className={itemClass}
            key={item.id}
            onClick={() => {
              handleClick(item, index);
            }}
          >
            {item.label}
          </View>
        );
      })}
    </View>
  );
}
