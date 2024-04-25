import { View } from '@tarojs/components';
import styles from './index.module.scss';

export default function LoadMore({ hasMore = false }) {
  return (
    <View className={styles['loadmore']}>
      {hasMore ? (
        <View className={styles['loadmore__hasmore']}>加载更多...</View>
      ) : (
        <View className={styles['loadmore__hasmore']}>没有更多啦...</View>
      )}
    </View>
  );
}
