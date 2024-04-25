import { View, Image, Text } from '@tarojs/components';
import useStore from '@stores';
import LangIcon from '@assets/home/icon-lang.png';
import styles from './index.module.scss';

export default function LangSwitch() {
  const store = useStore();

  const handleSwitchLang = () => {
    const language = store.language;
    if (language === 'cn') {
      store.setLanguage('hant');
    } else {
      store.setLanguage('cn');
    }
  };

  return (
    <View className={styles['lang']} onClick={handleSwitchLang}>
      <View className={styles['lang__wrap']}>
        <View className={styles['lang__text']}>
          <Text>{store.language === 'cn' ? '简' : '繁'}</Text>
        </View>
        <View className={styles['lang__icon']}>
          <Image src={LangIcon} mode='aspectFill'></Image>
        </View>
      </View>
    </View>
  );
}
