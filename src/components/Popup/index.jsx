import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

export default function Popup({ children, onClose }) {
  return (
    <View className={styles['popup']} catchMove>
      <View className={`${styles['popup__panel']} slideUp`}>
        <View className={styles['popup__panel__content']}>{children}</View>
        <View
          className={styles['popup__panel__close']}
          onClick={() => {
            onClose && onClose();
          }}
        >
          <Text className='iconfont icon-close'></Text>
        </View>
      </View>
    </View>
  );
}
