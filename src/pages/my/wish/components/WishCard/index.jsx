import { View, Text, Image } from '@tarojs/components';
import styles from './index.module.scss';

export default function WishCard({ data, onRemove, onBuy, onRetailer }) {
  const headerImg =
    data?.headerImg?.data?.attributes?.url ||
    data?.skus?.data[0]?.attributes?.headerImg?.data?.attributes?.url;

  return (
    <View className={styles['wishCard']}>
      <View className={styles['wishCard__image']}>
        <Image
          src={`${CMS_URL}${headerImg}`}
          mode='aspectFill'
          onClick={() => {
            onBuy && onBuy(data);
          }}
        ></Image>
      </View>
      <View className={styles['wishCard__info']}>
        <View
          className={styles['wishCard__info__text']}
          onClick={() => {
            onBuy && onBuy(data);
          }}
        >
          {data.title}
        </View>
        <View className={styles['wishCard__info__spliter']}></View>
        <View
          className={styles['wishCard__info__buy']}
          onClick={() => {
            onRetailer && onRetailer(data);
          }}
        >
          立即购买
          <Text className='iconfont icon-prev'></Text>
        </View>
      </View>
      <View
        className={styles['wishCard__remove']}
        onClick={() => {
          onRemove && onRemove(data);
        }}
      >
        <Text className='iconfont icon-remove'></Text>
      </View>
    </View>
  );
}
