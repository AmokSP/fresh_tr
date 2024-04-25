import { useState, useEffect } from 'react';

import { View, RichText } from '@tarojs/components';
import CustomNav from '@components/CustomNav';
import { GlobalService } from '@api/global.services';
import { useRouter } from '@tarojs/taro';
import { showLoading, hideLoading, filterRichText } from '@utils';
import styles from './index.module.scss';

export default function Index() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();
  const { name } = router.params;

  const _getData = async () => {
    showLoading();
    const result = await GlobalService.getGlobal();
    const _data = result.data.attributes;
    console.log('__data', _data);
    hideLoading();
    if (name === 'dutyfreeStorePolicy') {
      setTitle(_data?.dfsPurchaseRulesTitle);
      setContent(filterRichText(_data?.dfsPurchaseRules));
    } else if (name === 'termsAndConditions') {
      setTitle(_data?.termsOfUseTitle);
      setContent(filterRichText(_data?.termsOfUse));
    } else if (name === 'private') {
      setTitle(_data?.privacyStatementTitle);
      setContent(filterRichText(_data?.privacyStatement));
    } else {
      setTitle('条款标题');
      setContent('条款内容');
    }
  };

  useEffect(() => {
    _getData();
  }, []);

  return (
    <View className='page'>
      <CustomNav title={title} />
      <View className={styles['policy']}>
        {/* <View className={styles["policy__title"]}>{data?.title}</View> */}
        <View className={styles['policy__content']}>
          <RichText nodes={content}></RichText>
        </View>
      </View>
    </View>
  );
}
