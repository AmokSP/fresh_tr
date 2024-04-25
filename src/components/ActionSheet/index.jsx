import { View, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import styles from './index.module.scss';

export default function ActionSheet(props) {
  const { children, onClose, showAction } = props;
  const [show, setShow] = useState(showAction);

  useEffect(() => {
    setShow(showAction);
  }, [showAction]);

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <>
      {show && (
        <View className={styles['actionSheet']} catchMove>
          <View className={`${styles['actionSheet__panel']} slideUp`}>
            <View className={styles['actionSheet__panel__close']} onClick={handleClose}>
              <Text
                className={`${styles['actionSheet__panel__close__icon']} iconfont icon-close`}
              ></Text>
            </View>
            <View className={styles['actionSheet__panel__content']}>{children}</View>
          </View>
        </View>
      )}
    </>
  );
}
