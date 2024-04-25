import React, { useState } from 'react';
import { View } from '@tarojs/components';
import cx from 'classnames';
import styles from './index.module.scss';

export default React.memo(({ onChange = undefined, tabsList = [], currentIndex = 0 }: any) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  const handleClick = (index) => {
    setActiveIndex(index);
    onChange && onChange(index);
  };

  return (
    <View className={styles['tabs']}>
      {tabsList.map(
        (item, index) =>
          item?.visible && (
            <View
              className={cx([
                styles['tabs__item'],
                { [styles['tabs__item__active']]: activeIndex === index },
              ])}
              key={item.id}
              onClick={() => handleClick(index)}
            >
              {item.label}
            </View>
          )
      )}
    </View>
  );
});
