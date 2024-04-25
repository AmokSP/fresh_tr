import { useState, useEffect } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { useDidShow } from '@tarojs/taro';
import { useTranslation } from 'react-i18next';
import CustomNav from '@components/CustomNav';
import LogoImage from '@assets/logo-large.png';
import { Tracking } from '@utils/tracking';

import useStore from '@stores';
import { showToast, goto } from '@utils';
import { PointService } from '@api/point.services';
import { TASK } from '@constants/index';

import Tabs from './components/Tabs';
import Checkin from './components/Checkin';
import TaskCard from './components/TaskCard';
import PopupRule from './components/PopupRule';
import PopupConfirm from './components/PopupConfirm';
import Empty from './components/Empty';

import styles from './index.module.scss';

export default function MyPoint() {
  const [showRule, setShowRule] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [checkinList, setCheckinList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [active, setActive] = useState(null);
  const [points, setPoints] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(0);

  const userInfo = useStore((state) => state.userInfo);
  const isLogin = useStore((state) => state.isLogin);
  const { t } = useTranslation();

  useEffect(() => {
    if (isLogin) {
      _getPoints();
      setPoints(userInfo?.summaryPoints);
    }
  }, [isLogin]);

  useDidShow(() => {
    if (isLogin) {
      _getPoints();
      setPoints(userInfo?.summaryPoints);
    }
  });

  useEffect(() => {
    if (refresh) {
      _getPoints();
    }
  }, [refresh]);

  useEffect(() => {
    if (taskList.length > 0) {
      _setFilterList(taskList);
    }
  }, [type]);

  const _getPoints = async () => {
    setLoading(true);
    const result = await PointService.getPoints();
    setCheckinList(result?.checkinList);
    setTaskList(result?.taskStatus);
    setPoints(result.points);
    setRefresh(false);
    _setFilterList(result?.taskStatus);
    setLoading(false);
  };

  const _setFilterList = (_data) => {
    const data = _data.filter((item) => {
      if (type === 0) {
        return item.resetPeriod === 'oneTime';
      } else {
        return item.resetPeriod === 'everyday';
      }
    });
    setFilterList(data);
  };

  const handleCheckIn = async () => {
    const result = await PointService.dailyCheckIn();
    showToast({
      title: t('point.checkInSuccess'),
    });
    setPoints(result?.points);
    setRefresh(true);
  };

  const handleClick = (item) => {
    setActive(item);
    setShowConfirm(true);
  };

  const handleChangeType = (_type) => {
    setType(_type);
  };

  return (
    <View className='page'>
      <CustomNav title='' backgroundColor='transparent' collapsed />
      <View className={styles['point']}>
        <View className={styles['point__header']}>
          <View className={styles['point__header__logo']}>
            <Image src={LogoImage} mode='aspectFill'></Image>
          </View>
          <View className={styles['point__header__point']}>
            <View className={styles['point__header__point__label']}>
              <Text>{t('point.currentPoint')}</Text>
            </View>
            <View
              className={styles['point__header__point__tip']}
              onClick={() => {
                setShowRule(true);
              }}
            >
              ?
            </View>
            <View className={styles['point__header__point__value']}>{points}</View>
          </View>
        </View>
        <View className={styles['point__checkin']}>
          <Checkin data={checkinList} onCheckIn={handleCheckIn} />
        </View>
        <View className={styles['point__tabs']}>
          <Tabs onChange={handleChangeType} />
        </View>
        <View className={styles['point__task']}>
          {/* <View className={styles["point__label"]}>{t("point.getPoint")}</View> */}
          {filterList?.length > 0 && (
            <View className={styles['point__task__list']}>
              {filterList?.map((item, index) => {
                return (
                  <View className={styles['point__task__list__item']} key={index}>
                    <TaskCard onClick={handleClick} data={item} />
                  </View>
                );
              })}
            </View>
          )}
          {filterList?.length === 0 && !loading && (
            <View className={styles['point__task__empty']}>
              <Empty />
            </View>
          )}
        </View>
      </View>
      {showRule && (
        <PopupRule
          onClose={() => {
            setShowRule(false);
          }}
        />
      )}
      {showConfirm && (
        <PopupConfirm
          data={active}
          onConfirm={(item) => {
            if (item.name === TASK.Play_GAME) {
              PointService.fireTask({ name: TASK.Play_GAME });
              Tracking.trackEvent('o_game');
            }
            setShowConfirm(false);
            if (item?.link) {
              goto({
                url: item.link,
                type: item.name === TASK.Play_GAME ? 'reLaunch' : null,
              });
            }
          }}
          onClose={() => {
            setShowConfirm(false);
          }}
        />
      )}
    </View>
  );
}
