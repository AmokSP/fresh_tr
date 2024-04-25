import { useEffect, useMemo, useState } from 'react';
import useStore from '@stores';
import { useTranslation } from 'react-i18next';
import { View, ScrollView } from '@tarojs/components';
import Taro, { usePullDownRefresh, useRouter } from '@tarojs/taro';
import { GiftService } from '@api/gift.services';
import { UserService } from '@api/user.services';

import { showLoading, hideLoading, showToast, delay } from '@utils';
import storage from '@utils/storage';

import CustomNav from '@components/CustomNav';
import Tabs from './components/Tabs';
import GiftCard from './components/GiftCard';
import Empty from './components/Empty';
import styles from './index.module.scss';

export default function MyGift() {
  const router = useRouter();
  const defaultStatus = router?.params?.status || 'create';
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(defaultStatus);
  const [pageSize, setPageSize] = useState(6);
  const [listData, setListData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const isLogin = useStore((state) => state.isLogin);
  const { t } = useTranslation();

  const TABS_DATA = useMemo(() => {
    return [
      {
        id: 1,
        label: t('myGift.tabs.create'),
        status: 'create',
      },
      {
        id: 2,
        label: t('myGift.tabs.submit'),
        status: 'submit',
      },
      {
        id: 3,
        label: t('myGift.tabs.shipping'),
        status: 'shipping',
      },
      {
        id: 4,
        label: t('myGift.tabs.expired'),
        status: 'expired',
      },
    ];
  });

  const handleTabChange = (e) => {
    setPage(1);
    setListData([]);
    setStatus(e.status);
  };

  const _getList = async () => {
    showLoading();
    setIsLoading(true);

    const result = await GiftService.getMyGifts({
      page,
      status,
      pageSize,
    });
    if (result.length > 0) {
      setListData([...listData, ...result]);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    hideLoading();
    setIsLoading(false);
    setRefresh(false);
  };

  useEffect(() => {
    if (isLogin) {
      _getList();
      _getUserInfo();
    }
  }, [isLogin, page, status, refresh]);

  usePullDownRefresh(async () => {
    setPage(1);
    setListData([]);
    setRefresh(true);
    Taro.stopPullDownRefresh();
  });

  const handleScrollToLower = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  const _getUserInfo = async () => {
    const result = await UserService.getUserInfo();
    const giftCount = result?.giftCount ?? 0;
    storage.setItem('giftCount', giftCount);
    // store.setUserInfo(result);
  };

  const handleSubmit = (data) => {
    Taro.chooseAddress({
      success: async (e) => {
        const params = {
          giftId: data?.orderId,
          address: e.detailInfo,
          city: e.cityName,
          name: e.userName,
          phone: e.telNumber,
          province: e.provinceName,
          region: e.countyName,
        };
        const _listData = listData.map((item) => {
          if (data.orderId === item.orderId) {
            item.orderStatus = 'submit';
          }
          return item;
        });
        setListData(_listData);
        await GiftService.submitGift(params);
        showToast({
          title: t('myGift.submitSuccess'),
        });
        await delay(1000);
        setPage(1);
        setListData([]);
        setStatus('submit');
        _getUserInfo();
      },
    });
  };

  const renderList = () => {
    return (
      <ScrollView
        scrollY
        lowerThreshold={30}
        className={styles['gift__scroll']}
        onScrollToLower={handleScrollToLower}
      >
        <View className={styles['gift__list']}>
          {listData.map((item) => {
            return (
              <View className={styles['gift__list__item']} key={item.orderId}>
                <GiftCard data={item} onSubmit={handleSubmit} status={status} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  return (
    <View className='page'>
      <CustomNav title={t('page.title.mygift')} />
      <View className={styles['gift']}>
        <View className={styles['gift__tabs']}>
          <Tabs tabsData={TABS_DATA} onChange={handleTabChange} status={status} />
        </View>
        {listData.length > 0 && renderList()}
        {listData.length === 0 && !isLoading && <Empty />}
      </View>
    </View>
  );
}
