import { View } from '@tarojs/components';
import Popup from '@components/Popup';
import styles from './index.module.scss';

export default function PopupConfirm({ onConfirm, onClose, data }) {
  return (
    <Popup onClose={onClose}>
      <View className={styles['confirm']}>
        <View className={styles['confirm__content']}>
          <View>{data?.description}</View>
        </View>
        <View
          className={styles['confirm__button']}
          onClick={() => {
            onConfirm && onConfirm(data);
          }}
        >
          去完成
        </View>
      </View>
    </Popup>
  );
}
