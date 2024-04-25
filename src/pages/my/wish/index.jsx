import { useEffect, useState } from 'react';
import useStore from '@stores';

import { View, RootPortal, PageContainer } from '@tarojs/components';
import { useTranslation } from 'react-i18next';
import { useDidShow } from '@tarojs/taro';
import CustomNav from '@components/CustomNav';
import SafeBottom from '@components/Basic/SafeBottom';
import RedirectRetailer from '@components/RedirectRetailer';
import { PAGES } from '@app.config';

import { WishService } from '@api/wish.services';
import { showModal, showToast, showLoading, hideLoading, goto } from '@utils';
import { jumpToStoreMP } from '@utils/methods';
import WishCard from './components/WishCard';
import WishEmpty from './components/WishEmpty';
import styles from './index.module.scss';

export default function WishList() {
  const isLogin = useStore((state) => state.isLogin);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openRetailer, setOpenRetailer] = useState(false);
  const [retailerInfos, setRetailerInfos] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (isLogin && !loaded) {
      _getWishList();
    }
  }, [isLogin]);

  useDidShow(() => {
    if (loaded) {
      _getWishList();
    }
  });

  const handleBuy = (item) => {
    const sku = item?.id;
    goto({
      url: `${PAGES.PRODUCT}?id=${sku}`,
    });
  };

  const handleRetailer = (item) => {
    if (item?.outerSKUs?.length > 0) {
      if (item?.outerSKUs.length === 1) {
        jumpToStoreMP(item?.outerSKUs[0]);
      } else {
        setRetailerInfos(item?.outerSKUs);
        setOpenRetailer(true);
      }
    } else {
      const info = item?.skus?.data[0]?.attributes?.outerSKUs;
      if (info.length > 0) {
        jumpToStoreMP(info[0]);
      }
    }
  };

  const _getWishList = async () => {
    showLoading();
    setLoading(true);
    const result = await WishService.getWishList();
    setListData(result);
    setLoading(false);
    setLoaded(true);
    hideLoading();
  };

  const handleRemove = (item) => {
    showModal({
      success: async (res) => {
        if (res.confirm) {
          await WishService.removeWishList({ name: item.name });
          await _getWishList();
          showToast({
            title: '操作成功',
          });
        }
      },
    });
  };

  const renderList = () => {
    return (
      <View className={styles['wishList__list']}>
        {listData.map((item) => {
          return (
            <View className={styles['wishList__list__card']} key={item.sku}>
              <WishCard
                data={item}
                onRemove={handleRemove}
                onBuy={handleBuy}
                onRetailer={handleRetailer}
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View className='page'>
      <CustomNav title={t('page.title.wish')} />
      <View className={styles['wishList']}>
        {listData.length > 0 && renderList()}
        {!loading && listData.length === 0 && <WishEmpty />}
      </View>
      <RootPortal>
        <PageContainer
          show={openRetailer}
          round
          position='bottom'
          onLeave={() => {
            setRetailerInfos([]);
            setOpenRetailer(false);
          }}
        >
          <SafeBottom className={styles['footer']}>
            <RedirectRetailer
              retailerConfig={retailerInfos || []}
              onChange={() => setOpenRetailer(false)}
            />
          </SafeBottom>
        </PageContainer>
      </RootPortal>
    </View>
  );
}
