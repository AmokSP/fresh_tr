import { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import useStore from '@stores';
import classNames from 'classnames';
import styles from './index.module.scss';

export default function Tabs({ tabsData = [], onChange, status }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const userInfo = useStore((state) => state?.userInfo);
  const isRegister = userInfo?.profile?.status === 'Registered';

  useEffect(() => {
    let _index = tabsData.findIndex((item) => item.value === status.value);
    _index = _index === -1 ? 0 : _index;
    setCurrentIndex(_index);
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
            // [styles['tabs__item__disabled']]: !isRegister && index > 0,
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
