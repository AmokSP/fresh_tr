import { useState, useEffect } from 'react';
import { View } from '@tarojs/components';
import { useTranslation } from 'react-i18next';
import { TASK } from '@constants/index';
import { Tracking } from '@utils/tracking';
import { goto } from '@utils/index';
import styles from './index.module.scss';

export default function TaskCard({ onClick, data }) {
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (data?.currentCount > data?.frequency) {
      data.currentCount = data?.frequency;
    }

    const _progress = (data?.currentCount / data?.frequency) * 100;
    setProgress(Math.min(_progress, 100));
  }, [data]);

  return (
    <View className={styles['task']}>
      <View className={styles['task__info']}>
        <View className={styles['task__info__label']}>
          <View className={styles['task__info__label__text']}>{data?.displayName}</View>
          <View className={styles['task__info__label__point']}>+{data?.points}</View>
        </View>
        <View className={styles['task__progress']}>
          <View className={styles['task__progress__bar']}>
            <View
              className={styles['task__progress__percent']}
              style={{ width: `${progress}%` }}
            ></View>
          </View>
          <View className={styles['task__progress__value']}>
            {data?.points}
            {t('common.point')}
          </View>
        </View>
      </View>
      {progress < 100 && (
        <View
          className={styles['task__button']}
          onClick={() => {
            onClick && onClick(data);
          }}
        >
          {t('point.toComplete')}
        </View>
      )}
      {progress == 100 && data?.name !== TASK.Play_GAME && (
        <View className={`${styles['task__button']} ${styles['task__button__disabled']}`}>
          {t('point.complete')}
        </View>
      )}
      {progress == 100 && data?.name === TASK.Play_GAME && (
        <View
          className={`${styles['task__button']}`}
          onClick={() => {
            Tracking.trackEvent('o_game');
            if (data?.link) {
              goto({
                url: data.link,
                type: 'reLaunch',
              });
            }
          }}
        >
          {t('point.playAgain')}
        </View>
      )}
    </View>
  );
}
