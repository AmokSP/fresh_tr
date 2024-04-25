import { useState, useEffect } from 'react';
import { View, Image, ScrollView, Block } from '@tarojs/components';
import CustomNav from '@components/CustomNav';
import HeadImage from '@assets/points/head.png';
import { useTranslation } from 'react-i18next';

import { GiftService } from '@api/gift.services';
import useStore from '@stores';

import { showLoading, hideLoading, showToast } from '@utils';

import GiftCard from './components/GiftCard';
import PopupConfirm from './components/PopupConfirm';
import PopupSuccess from './components/PopupSuccess';
import styles from './index.module.scss';

export default function Gift() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [current, setCurrent] = useState(null);
  const [points, setPoints] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [listData, setListData] = useState([]);
  const [orderId, setOrderId] = useState('');

  const userInfo = useStore((state) => state.userInfo);
  const isLogin = useStore((state) => state.isLogin);

  const { t } = useTranslation();

  const _getGifts = async () => {
    showLoading();
    const result = await GiftService.getGifts({
      page,
      pageSize,
    });
    if (result.data.length > 0) {
      setListData([...listData, ...result.data]);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    hideLoading();
  };

  useEffect(() => {
    if (isLogin) {
      _getGifts();
      setPoints(userInfo?.summaryPoints);
    }
  }, [isLogin, page]);

  const handleClick = (item) => {
    setCurrent(item);
    setShowConfirm(true);
  };

  const handleRedeem = async () => {
    const result = await GiftService.redeemGift({ sku: current.sku });
    if (result.success == false) {
      showToast({
        title: t('gift.runOut'),
      });
      return;
    }
    setOrderId(result?.orderId);
    setPoints(result?.currentPoints);
    setShowConfirm(false);
    setShowSuccess(true);
    _getGifts();
  };

  const handleScrollToLower = () => {
    if (hasMore) setPage(page + 1);
  };

  return (
    <View className='page'>
      <CustomNav title='' collapsed backgroundColor='transparent' />

      <View className={styles['points']} catchMove>
        <ScrollView
          scrollY
          lowerThreshold={30}
          className={styles['points__scroll']}
          onScrollToLower={handleScrollToLower}
        >
          <View className={styles['points__head']}>
            <View className={styles['points__head__image']}>
              <Image src={HeadImage} mode='aspectFit'></Image>
            </View>
            {/* <View className={styles["points__head__info"]}>
              <View className={styles["points__head__info__points"]}>
                <Text>{points}</Text>积分可用
              </View>
              <View
                className={styles["points__head__info__rule"]}
                onClick={() => {
                  setShowRule(true);
                }}
              >
                积分使用规则
              </View>
            </View> */}
          </View>
          <View className={styles['points__list']}>
            {listData.map((item) => {
              return (
                <View className={styles['points__list__item']} key={item.id}>
                  <GiftCard
                    data={item.attributes}
                    onClick={() => {
                      handleClick(item.attributes);
                    }}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <Block>
        {showSuccess && (
          <PopupSuccess
            orderId={orderId}
            onClose={() => {
              setShowSuccess(false);
            }}
          />
        )}
        {showConfirm && (
          <PopupConfirm
            data={current}
            onClose={() => {
              setShowConfirm(false);
            }}
            onConfirm={handleRedeem}
          />
        )}
      </Block>
    </View>
  );
}
