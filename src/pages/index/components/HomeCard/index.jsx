import { View, Image } from '@tarojs/components';
import { goto } from '@utils';
import { Tracking } from '@utils/tracking';
import { PointService } from '@api/point.services';
import { useTranslation } from 'react-i18next';
import { TASK } from '@constants/index';
import styles from './index.module.scss';

export default function HomeCard({ data, index }) {
  const { t } = useTranslation();

  const handleClick = () => {
    const task = data?.attributes?.task;
    task === 'live' && PointService.fireTask({ name: TASK.Subscribe_LS });
    task === 'game' && PointService.fireTask({ name: TASK.Play_GAME });
    Tracking.trackEvent('h_other' + index, {
      button_id: data?.attributes?.title,
    });
    task === 'live' && Tracking.trackEvent('n_webinar');
    task === 'game' && Tracking.trackEvent('o_game');
    goto({ url: data.attributes.link });
  };
  return (
    <View className={styles['homeCard']}>
      <View className={styles['homeCard__image']}>
        {data && (
          <Image
            src={`${CMS_URL}${data?.attributes?.image?.data?.attributes?.url}`}
            mode='aspectFill'
          ></Image>
        )}
      </View>
      <View className={styles['homeCard__title']}>{data?.attributes?.title}</View>
      <View className={styles['homeCard__subtitle']}>{data?.attributes?.subTitle}</View>
      <View
        className={`${styles['homeCard__button']} button`}
        onClick={handleClick}
        data-id='button'
      >
        {t('common.clickToCheck')}
      </View>
    </View>
  );
}
