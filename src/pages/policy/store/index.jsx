import { useState, useEffect } from 'react';

import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { View, RichText } from '@tarojs/components';
import CustomNav from '@components/CustomNav';
import { GlobalService } from '@api/global.services';

import { showLoading, hideLoading, filterRichText } from '@utils';
import styles from './index.module.scss';

export default function Index() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const tabsData = [
    {
      id: 1,
      label: t('policy.store.tabs.tab1'),
    },
    {
      id: 2,
      label: t('policy.store.tabs.tab2'),
    },
    {
      id: 3,
      label: t('policy.store.tabs.tab3'),
    },
  ];

  const _getDefaultData = async () => {
    showLoading();
    const result = await GlobalService.getGlobal();
    const _data = result.data.attributes;
    setTitle(_data?.dfsPurchaseRulesTitle);
    setContent(filterRichText(_data?.dfsPurchaseRules));
    hideLoading();
  };

  const handleChange = (index) => {
    if (index === 0) {
      _getDefaultData();
    } else if (index === 1) {
      setContent(t('store.hongkong'));
    } else if (index === 2) {
      setContent(t('store.macao'));
    }
    setCurrentIndex(index);
  };

  useEffect(() => {
    _getDefaultData();
  }, []);

  return (
    <View className='page'>
      <CustomNav title={title} />
      <View className={styles['policy']}>
        <View className={styles['policy__tabs']}>
          {tabsData?.map((item, index) => {
            const itemClass = cx([
              styles['policy__tabs__item'],
              {
                [styles['policy__tabs__item__active']]: index === currentIndex,
              },
            ]);
            return (
              <View
                className={itemClass}
                key={item.id}
                onClick={() => {
                  handleChange(index);
                }}
              >
                {item?.label}
              </View>
            );
          })}
        </View>
        <View className={styles['policy__content']}>
          <RichText nodes={content}></RichText>
        </View>
      </View>
    </View>
  );
}
