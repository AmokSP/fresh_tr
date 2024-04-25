import { useEffect, useState } from 'react';
import useStore from '@stores';
import classNames from 'classnames';
import { View, Text, Image } from '@tarojs/components';
import { CommonService } from '@api/common.services';
import Taro, { usePageScroll } from '@tarojs/taro';
import RegionPicker from '@components/RegionPicker';
import storage from '@utils/storage';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import WeahterImage from '@assets/home/weather/weather-bg.png';
import WeahterIcon from '@assets/home/weather/icon.png';
import styles from './index.module.scss';

dayjs.locale('zh-cn');

export default function Weather({ location }) {
  const store = useStore();
  const isLogin = useStore((state) => state.isLogin);
  const regionCode = useStore((state) => state.regionCode);
  const [data, setData] = useState(null);

  const [showRegion, setShowRegion] = useState(false);
  const [regionData, setRegionData] = useState([]);
  const [offsetTop, setOffsetTop] = useState(0);
  const [active, setActive] = useState(false);

  // const date = dayjs().format("M月D日，dddd");

  const locationClass = classNames([
    styles['weather__content__location'],
    {
      ['slideDown']: active,
    },
  ]);

  const tmpClass = classNames([
    styles['weather__content__temp'],
    {
      ['slideDown']: active,
    },
  ]);

  const bottomClass = classNames([
    styles['weather__content__bottom'],
    {
      ['slideUp']: active,
    },
  ]);

  const mainClass = classNames([
    styles['weather__content__main'],
    {
      ['slideUp']: active,
    },
  ]);

  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query.select('#weather').boundingClientRect();
    query.exec((res) => {
      setOffsetTop(res[0]?.top || 0);
    });
  }, []);

  usePageScroll((res) => {
    if (res.scrollTop >= offsetTop - 500 && !active) {
      setActive(true);
    }
    if ((res.scrollTop < 50 || res.scrollTop > 900) && active) {
      setActive(false);
    }
  });

  const _getWeather = async () => {
    const result = await CommonService.getWeather(location);
    setData(result);
    storage.setItem('weather', result);
  };

  const _getWeatherByCode = async () => {
    const result = await CommonService.getWeatherByCode({ code: regionCode });
    setData(result);
    storage.setItem('weather', result);
  };

  const _getRegion = async () => {
    const result = await CommonService.getRegion();
    const _data = result.map((item) => {
      return {
        value: item.adcode,
        text: item.name,
        children: item.districts.map((_item) => ({
          value: _item.adcode,
          text: _item.name,
        })),
      };
    });
    setRegionData(_data);
  };

  useEffect(() => {
    if (isLogin) {
      // _getWeather();
      _getRegion();
    }
  }, [location, isLogin]);

  useEffect(() => {
    if (regionCode) {
      _getWeatherByCode();
    }
  }, [regionCode]);

  const handleRegionChange = (option) => {
    store.setRegionCode(option.value);
  };

  const handleRegionClose = () => {
    setShowRegion(false);
  };

  const handleClick = () => {
    setShowRegion(true);
  };

  return (
    <View className={styles['weather']} id='weather'>
      <View className={styles['weather__content']}>
        <RegionPicker
          showRegion={showRegion}
          regionData={regionData}
          onClose={handleRegionClose}
          onChange={handleRegionChange}
        />
        <View className={styles['weather__content__top']}>
          <View className={tmpClass}>
            {data?.temperature}
            <Text>°C</Text>
          </View>
          <View className={locationClass}>
            <View className={styles['weather__content__location__text']}>
              {data?.province} {data?.city}
            </View>
            <View className={styles['weather__content__location__change']} onClick={handleClick}>
              目的地修改<Text className='iconfont icon-location'></Text>
            </View>
          </View>
        </View>
        <View className={mainClass}>
          <View className={styles['weather__content__main__icon']}>
            <Image src={WeahterIcon} mode='aspectFill'></Image>
          </View>
          <View className={styles['weather__content__main__text']}>{data?.weather}</View>
        </View>
        <View className={bottomClass}>
          <View className={styles['weather__content__bottom__windpower']}>
            风力 {data?.windpower}级
          </View>
          <View className={styles['weather__content__bottom__humidity']}>
            湿度 {data?.humidity}%
          </View>
          <View className={styles['weather__content__bottom__winddirection']}>
            风向 {data?.winddirection}
          </View>
        </View>
      </View>
      <Image src={WeahterImage} mode='aspectFit'></Image>
    </View>
  );
}
