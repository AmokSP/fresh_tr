import { View, Text } from '@tarojs/components';
import CouponPopup from '@components/CouponPopup';
import styles from './index.module.scss';

export default function ErrorPanel({ onClose }) {
  const handleClose = () => {
    onClose && onClose();
  };
  return (
    <CouponPopup onClose={onClose}>
      <View className={styles['error']}>
        <View className={styles['error__message']}>礼券兑换出错</View>
        <View className={styles['error__icon']}>
          <Text className='iconfont icon-exclaim'></Text>
        </View>
        <View className={styles['error__button']} onClick={handleClose}>
          再试一次
        </View>
      </View>
    </CouponPopup>
  );
}
