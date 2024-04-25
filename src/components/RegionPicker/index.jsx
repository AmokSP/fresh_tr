import { View } from '@tarojs/components';
import { Picker } from '@nutui/nutui-react-taro';
import styles from './index.module.scss';

export default function RegionPicker({ showRegion, regionData, onChange, onClose }) {
  const _regionData = regionData.map((region) => {
    if (region.children.length === 0) {
      region.children.push({
        value: region.value,
        text: region.text,
      });
    }
    return region;
  });

  const handleConfirm = (options) => {
    const data = options.length > 1 ? options[1] : options[0];
    onChange && onChange(data);
  };

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <View className={styles['regionPicker']}>
      <Picker
        options={_regionData}
        onConfirm={handleConfirm}
        visible={showRegion}
        onClose={handleClose}
      />
    </View>
  );
}
