import { View, Text } from '@tarojs/components';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import styles from './index.module.scss';

export default function Checkin({ data, onCheckIn }) {
  let day = dayjs().day();
  day = day === 0 ? 7 : day;
  const { t } = useTranslation();

  return (
    <View className={styles['checkin']}>
      <View className={styles['checkin__header']}>{t('point.checkInTitle')}</View>
      <View className={styles['checkin__list']}>
        {data.map((item, index) => {
          const isToday = item.seq == day;
          const isBefore = item.seq < day;
          const isAfter = item.seq > day;

          return (
            <View className={styles['checkin__list__item']} key={index}>
              {isBefore && !item.completed && (
                <View
                  className={`${styles['checkin__status']} ${styles['checkin__status__expired']}`}
                >
                  {t('point.expired')}
                </View>
              )}

              {item.completed && (
                <View
                  className={`${styles['checkin__status']} ${styles['checkin__status__checked']}`}
                >
                  <Text className='iconfont icon-right-light'></Text>
                </View>
              )}
              {isToday && !item.completed && (
                <View
                  className={`${styles['checkin__status']} ${styles['checkin__status__unchecked']}`}
                  onClick={() => {
                    onCheckIn && onCheckIn(item);
                  }}
                >
                  +{item.points}
                </View>
              )}

              {isAfter && !item.completed && (
                <View className={`${styles['checkin__status']}`}>+{item.points}</View>
              )}

              <View className={styles['checkin__list__item__label']}>{item?.displayName}</View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
