import { View, Image } from '@tarojs/components';
import DestImage from '@assets/home/bg-dest.jpg';
import styles from './index.module.scss';

export default function DestPopup() {
  return (
    <View className={styles['dest']} catchMove>
      <View className={styles['dest__wrap']}>
        <View className={styles['dest__content']}>
          <View className={styles['dest__content__title']}>旅行目的地</View>
        </View>
        <View className={styles['dest__bg']}>
          <Image src={DestImage} mode='aspectFill'></Image>
        </View>
      </View>
    </View>
  );
}
