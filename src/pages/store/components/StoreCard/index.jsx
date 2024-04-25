import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

export default function StoreCard({ data, onClick, onOpenMap }) {
  const handleOpenMap = (e) => {
    e.stopPropagation();
    onOpenMap && onOpenMap(data);
  };

  return (
    <View
      className={styles['storeCard']}
      onClick={() => {
        onClick && onClick(data);
      }}
    >
      <View className={styles['storeCard__name']}>{data?.attributes?.name}</View>
      <View className={styles['storeCard__info']}>
        <View className={styles['storeCard__address']}>{data?.attributes?.address}</View>
        <View className={styles['storeCard__opentime']}>{data?.attributes?.businessInfo}</View>
        <View className={styles['storeCard__icon']} onClick={handleOpenMap}>
          <Text className='iconfont icon-location-fill'></Text>
        </View>
      </View>
      {data?.distance && (
        <View className={styles['storeCard__distance']}>
          <Text>{parseInt(data?.distance || 0)}km</Text>
        </View>
      )}
    </View>
  );
}
