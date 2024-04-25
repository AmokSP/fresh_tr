import { View, Image } from '@tarojs/components';
import styles from './index.module.scss';

export default function HomeStory({ data }) {
  return (
    <View className={styles['homeStory']}>
      <View className={styles['homeStory__image']}>
        {data && <Image src={`${CMS_URL}${data?.attributes?.url}`} mode='widthFix'></Image>}
      </View>
      {/* <View className={`${styles["homeStory__button"]} button`}>点击查看</View> */}
    </View>
  );
}
