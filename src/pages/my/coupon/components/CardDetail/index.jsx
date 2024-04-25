import { View } from '@tarojs/components';
import CouponCard from '../CouponCard';
import styles from './index.module.scss';

export default function CardDetail() {
  return (
    <View className={styles['cardDetail']}>
      <View className={styles['cardDetail__coupon']}>
        <CouponCard />
      </View>
      <View className={styles['cardDetail__content']}>
        <View className={styles['cardDetail__content__due']}>有效期：2023.07.01 至 2023.07.30</View>
        <View className={styles['cardDetail__content__rule']}>
          <View className={styles['cardDetail__content__rule__label']}>使用规则：</View>
          <View className={styles['cardDetail__content__rule__content']}>
            <View>该礼券仅限在fresh 馥蕾诗官方小程序兑换；</View>
            <View>该礼券过期自动作废； </View>
            <View>每个ID仅限领取1张礼券；</View>
          </View>
        </View>
      </View>
    </View>
  );
}
