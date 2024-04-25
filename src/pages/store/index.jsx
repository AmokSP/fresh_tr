import { useState, useEffect } from 'react';
import { View, Text, Map, ScrollView } from '@tarojs/components';
import Taro, { useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro';

import CustomNav from '@components/CustomNav';
import PrivacyAuth from '@components/PrivacyAuth';
import useLocation from '@hooks/useLocation';
import MarkerIcon from '@assets/loc.png';

import { StoreService } from '@api/store.services';
import { getDistances, showLoading, hideLoading } from '@utils';

import useStore from '@stores';
import { useTranslation } from 'react-i18next';

import StoreCard from './components/StoreCard';
import styles from './index.module.scss';

export default function Store() {
  const [listData, setListData] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [current, setCurrent] = useState('');
  const [isMove, setIsMove] = useState(false);
  const [scale, setScale] = useState(15);
  const language = useStore((state) => state.language);
  const { result: location, run } = useLocation({ manual: true });
  const { t } = useTranslation();
  const router = useRouter();
  const { couponRedeem } = router.params;

  const _getList = async () => {
    showLoading();
    const result = await StoreService.getStores();
    let data = result?.data;
    if (couponRedeem) {
      data = result?.data.filter((item) => item?.attributes?.couponRedeem === true);
    }
    createMarkers(data);
    _setListData(data);
    hideLoading();
  };

  const handleAuthComplete = () => {
    run();
  };

  const _setListData = (data) => {
    const _listData = data?.map((item) => {
      item.distance = getDistances(
        item?.attributes?.latitude,
        item?.attributes?.longitude,
        location?.LAT,
        location?.LNG
      ).km;
      return item;
    });
    _listData.sort((a, b) => {
      return a?.distance - b?.distance;
    });

    setListData(_listData);
    // moveTo(
    //   _listData[0]?.attributes?.latitude,
    //   _listData[0]?.attributes?.longitude
    // );
  };

  useEffect(() => {
    if (location) {
      _getList();
    }
  }, [location]);

  useEffect(() => {
    _getList();
  }, [language]);

  const createMarkers = (data) => {
    const markerData = data?.map((item) => {
      return {
        id: item.id,
        latitude: item?.attributes?.latitude,
        longitude: item?.attributes?.longitude,
        width: 35,
        height: 42,
        iconPath: MarkerIcon,
      };
    });
    setMarkers(markerData);
  };

  const moveTo = (latitude, longitude) => {
    const map = Taro.createMapContext('map');
    map.moveToLocation({
      longitude,
      latitude,
    });
    map.getScale({
      success: (res) => {
        setScale(res.scale);
        setIsMove(true);
      },
    });
  };

  // useEffect(() => {
  //   if (isMove) {
  //     setScale(15);
  //     setIsMove(false);
  //   }
  // }, [isMove]);

  const handleClick = (item) => {
    moveTo(item?.attributes?.latitude, item?.attributes?.longitude);
  };

  const handleMarkerTap = (e) => {
    const { markerId } = e.detail;
    const marker = markers.find((item) => item.id === markerId);
    moveTo(marker?.latitude, marker?.longitude);
    setCurrent(`store${marker.id}`);
  };

  const handleScrollToLower = () => {};
  const handleOpenMap = (data) => {
    const map = Taro.createMapContext('map');
    map.openMapApp({
      longitude: data?.attributes?.longitude,
      latitude: data?.attributes?.latitude,
      destination: data?.attributes?.name,
    });
  };

  useShareAppMessage(() => {
    return {
      title: t('common.shareTitle'),
      imageUrl: `${SHARE_IMAGE}?${+new Date()}`,
    };
  });

  useShareTimeline(() => {
    return {
      title: t('common.shareTitle'),
    };
  });

  return (
    <View className='page'>
      <CustomNav title={t('page.title.store')} showNav={false} />
      <View className={styles['store']}>
        <View className={styles['store__map']}>
          <Map
            longitude={location?.LNG}
            latitude={location?.LAT}
            markers={markers}
            scale={scale}
            showLocation
            onMarkerTap={handleMarkerTap}
            id='map'
          ></Map>
        </View>
        <View className={styles['store__dock']}>
          <ScrollView
            scrollX
            lowerThreshold={30}
            className={styles['store__scroll']}
            onScrollToLower={handleScrollToLower}
            scrollIntoView={current}
          >
            <View className={styles['store__list']}>
              {listData?.map((item) => {
                return (
                  <View
                    className={styles['store__list__item']}
                    key={item.id}
                    id={`store${item.id}`}
                  >
                    <StoreCard data={item} onClick={handleClick} onOpenMap={handleOpenMap} />
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View className={styles['store__tip']}>
            <Text className='iconfont icon-arrow-left'></Text>
            <Text className={styles['store__tip__text']}>左滑</Text>
          </View>
        </View>
      </View>
      <PrivacyAuth init onAuth={handleAuthComplete} />
    </View>
  );
}
