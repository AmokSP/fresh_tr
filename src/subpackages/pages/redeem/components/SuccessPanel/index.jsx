import { View, Image } from '@tarojs/components';
import CouponPopup from '@components/CouponPopup';
import ProductImage from '@assets/redeem/product.png';
import styles from './index.module.scss';

export default function SuccessPanel({ onClose, couponData }) {
  const handleClose = () => {
    onClose && onClose();
  };
  return (
    <CouponPopup onClose={onClose}>
      <View className={styles['success']}>
        <View className={styles['success__message']}>兑换成功</View>
        <View className={styles['success__icon']}>
          <Image
            src={`${CMS_URL}${couponData?.image?.data?.attributes?.url}`}
            // src={ProductImage}
            mode='aspectFit'
          ></Image>
        </View>
        <View className={styles['success__desc']}>{couponData?.description}</View>
        <View className={styles['success__button']} onClick={handleClose}>
          返回
        </View>
      </View>
    </CouponPopup>
  );
}
