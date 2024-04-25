import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

export default function CouponPopup({ onClose, children }) {
  const handleClose = () => {
    onClose && onClose();
  };
  return (
    <View className={styles['popup']} catchMove>
      <View className={`${styles['popup__panel']} slideUp`}>
        <View className={styles['popup__panel__close']} onClick={handleClose}>
          <Text className='iconfont icon-close'></Text>
        </View>
        <View className={styles['popup__panel']}>{children}</View>
      </View>
    </View>
  );
}
