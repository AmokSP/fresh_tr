import { useState } from 'react';
import { View } from '@tarojs/components';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import styles from './index.module.scss';

export default function Tabs({ onChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();
  const tabData = [
    {
      id: 1,
      label: t('point.tabs.oneTimeTask'),
    },
    {
      id: 2,
      label: t('point.tabs.everydayTask'),
    },
  ];

  const handleClick = (index) => {
    setCurrentIndex(index);
    onChange && onChange(index);
  };
  return (
    <View className={styles['tabs']}>
      {tabData.map((item, index) => {
        const itemClass = cx([
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
              handleClick(index);
            }}
          >
            {item.label}
          </View>
        );
      })}
    </View>
  );
}
