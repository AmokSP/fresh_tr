import Header from '@components/Basic/Header';
import Navbar from '@components/Basic/Navbar';
import cx from 'classnames';
import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components';
import Taro, { useDidShow, useLoad, useRouter, useShareAppMessage } from '@tarojs/taro';
import Bell from '@hideaway/assets/book/bell.svg';
import './index.scss';
import HideawaySharePanel from '@hideaway/components/HideawaySharePanel';
import useBoolean from '@hooks/useBoolean';
import { goto, hideLoading, showLoading, showToast } from '@utils';
import { HIDEAWAY, PAGES } from '@app.config';
import { COUPON_STATUS } from '@constants/coupon';
import useShareStatusQuery from '@hideaway/useShareStatusQuery';
import Plane from '@assets/plane.png';
import Route from '@hideaway/assets/route.svg';
import Map from '@hideaway/assets/map.svg';
import Pin from '@hideaway/assets/pin.svg';
import Arrow from '@hideaway/assets/swiper-arrow.svg';
import CardBG from '@hideaway/assets/card.png';
import Info from '@hideaway/assets/info.svg';
import { useEffect, useRef, useState } from 'react';
import Cities from './cities';
import gsap from 'gsap';
import useAsync from '@hooks/useAsync';
import HideawayService from '@api/hideaway.service';
const { windowWidth } = Taro.getSystemInfoSync();
const SWIPETHRESHOLD = windowWidth * 0.5;
const scale = windowWidth / 375;
let path =
  'm-38.5,95.5c75.0075,-14.5112 68.8425,-39.06861 95.5575,-45.76609c26.715,-6.69748 68.8425,15.62745 89.3925,-1.11625c20.55,-16.74369 3.0825,-50.23107 46.2375,-49.11483c43.155,1.11625 96.585,65.85852 179.81251,60.27729M-15,-25L25,-25';

const pathValues = path.match(/[0-9][0-9]*([\.][0-9]{1,10})?/g);
let newPath = '';
while (pathValues!.length) {
  const start = path.indexOf(pathValues![0]);
  newPath += path.slice(0, start) + Number(pathValues![0]) * scale;
  path = path.slice(start + pathValues![0].length);
  pathValues?.shift();
}
newPath += path;

const KolData = Cities.flatMap((i) => i.story);
let prevX = 0;

const SubscribeKey = 'hideaway_subscribed';
export default function Index() {
  const { value: hideawayAssets, execute: fetchAsset } = useAsync(HideawayService.getHidewayAsset);
  const progress = useRef(0);
  const [sharePanelFlag, showSharePanel, hideSharePanel] = useBoolean(false);
  const { receivedCount, giftCount } = useShareStatusQuery();
  const {
    params: { city = '0' },
  } = useRouter();
  const [currentKol, setCurrentKol] = useState(parseInt(city) * 2);
  const [transition, setTransition] = useState(0);
  const [subscribed, setSubscribed] = useState<boolean>(Taro.getStorageSync(SubscribeKey) ?? false);
  useShareAppMessage(() => {
    return {
      title: HIDEAWAY_ASSETS.shareTitle,
      path: HIDEAWAY.INDEX,
    };
  });

  useLoad(() => {
    showLoading();
    fetchAsset().then(hideLoading);
    gsap.fromTo(
      progress,
      { current: -currentKol * windowWidth + windowWidth * 0.2 },
      {
        current: -currentKol * windowWidth,
        duration: 1.5,
        onUpdate: () => {
          setTransition(progress.current);
        },
      }
    );
  });

  const onTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    prevX = e.touches[0].clientX;
    gsap.killTweensOf(progress);
  };
  const onTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { clientX } = e.touches[0];

    setTransition(transition + clientX - prevX);
    prevX = clientX;
  };
  const onTouchEnd = (e) => {
    let target = 0;
    const blockProgress = transition % windowWidth;

    if (-blockProgress < SWIPETHRESHOLD) {
      console.log(1);
      target = Math.floor(transition / windowWidth) * windowWidth;
    } else {
      console.log(2);
      target = Math.ceil(transition / windowWidth) * windowWidth;
    }
    if (-target > (KolData.length - 1) * windowWidth) {
      target = -(KolData.length - 1) * windowWidth;
    }
    if (-target < 0) {
      target = 0;
    }
    console.log('target', target / windowWidth);
    setCurrentKol(Math.abs(target / windowWidth));
    gsap.fromTo(
      progress,
      { current: transition },
      {
        current: target,
        duration: 1,
        onUpdate: () => {
          setTransition(progress.current);
        },
      }
    );
  };
  const moveTo = (index) => {
    gsap.killTweensOf(progress);

    setCurrentKol(index);
    gsap.to(progress, {
      current: -index * windowWidth,
      duration: 1,
      onUpdate: () => {
        setTransition(progress.current);
      },
    });
  };
  const movePrev = () => {
    moveTo(currentKol - 1);
  };
  const moveNext = () => {
    moveTo(currentKol + 1);
  };
  const onBellClick = async () => {
    subscribeMessage(true).then(() => {
      showToast({
        title: '订阅成功',
        icon: 'success',
      });
    });
  };
  const onCardClick = (index) => {
    subscribeMessage(false).finally(() => {
      goto({
        url: `${HIDEAWAY.KOL_STORY}?id=${index}`,
      });
    });
  };

  const subscribeMessage = async (force: boolean) => {
    return new Promise((resolve, reject) => {
      const tid: string = hideawayAssets?.data?.attributes?.templateId;
      if (tid) {
        if (force) {
          Taro.getSetting({
            withSubscriptions: true,
            success: (res) => {
              console.log(res);
              if (
                !res.subscriptionsSetting?.mainSwitch ||
                res.subscriptionsSetting?.itemSettings?.[tid] === 'reject'
              ) {
                Taro.showModal({
                  title: '提示',
                  content: '您已关闭消息订阅，请在设置中打开',
                  showCancel: true,
                  confirmText: '去打开',
                  success: (res) => {
                    if (res.confirm) {
                      Taro.openSetting();
                    }
                  },
                });
                return reject('rejected');
              }
            },
          });
        }
        Taro.requestSubscribeMessage({ tmplIds: [tid] }).then((res) => {
          console.log(res);
          if (res[tid] === 'accept') {
            HideawayService.subscribeNotification(tid);
            setSubscribed(true);
            Taro.setStorageSync(SubscribeKey, true);
            resolve(null);
          } else {
            reject('reject');
          }
        });
      }
    });
  };

  return (
    <View className={'city-map'}>
      <Navbar transparent holdPlace>
        <Header
          buttonBack
          onClickBack={() => {
            Taro.navigateBack({
              delta: 1,
              fail: () => {
                goto({ url: HIDEAWAY.INDEX, type: 'redirectTo' });
              },
            });
          }}
          title='brand_logo'
        ></Header>
      </Navbar>
      <View className='texts'>
        <View className='title'>挖掘每个城市的茶萃之力</View>
        <View>
          <View className='desc1'>解锁小众打卡点</View>
          <View className='desc2'>
            {/* 每分享3位
            <Text>好友即可</Text>
            获得优惠券 */}
            参与互动体验，赢取惊喜豪礼
            <Image onClick={() => goto({ url: HIDEAWAY.GAME_RULE })} src={Info}></Image>
          </View>
        </View>
        <Image
          src={Bell}
          onClick={onBellClick}
          className={cx('bell', {
            subscribed,
          })}
        ></Image>
      </View>
      <View className='swiper-wrapper'>
        <Image
          src={Arrow}
          className={cx('arrow left', {
            disabled: currentKol <= 0,
          })}
          onClick={movePrev}
        ></Image>
        <Image
          src={Arrow}
          className={cx('arrow right', {
            disabled: currentKol >= KolData.length - 1,
          })}
          onClick={moveNext}
        ></Image>
        <View className='paginator'>
          {KolData.map((i, index) => (
            <View className={cx('paginator-item', { active: index === currentKol })}></View>
          ))}
        </View>
        <View
          className='kol-swiper'
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          catchMove={true}
          onTouchEnd={onTouchEnd}
          style={{
            transform: `translateX(${transition}px)`,
          }}
        >
          {KolData.map((i, index) => {
            const offset = -transition - index * windowWidth;
            return (
              <View
                className='kol-item'
                style={{
                  left: index * windowWidth + 'px',
                  opacity: (windowWidth - Math.abs(offset)) / windowWidth,
                }}
              >
                <Image
                  style={{
                    transform: `translateX(${-offset * 0.6}px)`,
                  }}
                  className='image'
                  src={i.image}
                  mode='aspectFit'
                  onClick={() => onCardClick(index)}
                ></Image>
                <View
                  className='kol-body'
                  style={{
                    transform: `translateX(${-offset * 2}px)`,
                  }}
                >
                  <View className='kol-desc'>{i.text}</View>
                  <View className='pill-button primary outline' onClick={() => onCardClick(index)}>
                    点击查看
                  </View>
                  <Image src={CardBG} className='bg'></Image>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View className='fly-anime'>
        <View
          className='path'
          style={{
            offsetPath: `path('${newPath}')`,
          }}
        >
          <Image onClick={showSharePanel} className='plane' src={Plane}></Image>
        </View>
        <Image className='route' src={Route} mode='widthFix'></Image>
        <View className='points'>
          {Cities.map((i, index) => {
            const active = Math.floor(currentKol / 2) === index;
            return (
              <View
                key={'city' + index}
                className={cx('point', {
                  active,
                })}
                style={{
                  left: `${i.left}rpx`,
                  top: `${i.top}rpx`,
                }}
                onClick={() => {
                  !active && moveTo(index * 2);
                }}
              >
                <Image src={Pin} className='pin'></Image>
                <Image src={i.title} className='city-title' mode='heightFix'></Image>
              </View>
            );
          })}
        </View>
        <Image src={Map} className='bg' mode='aspectFit'></Image>
      </View>
      <HideawaySharePanel
        giftCount={giftCount}
        receivedCount={receivedCount}
        show={sharePanelFlag}
        onClose={hideSharePanel}
      >
        <View className='ctas'>
          <View
            className='pill-button primary'
            onClick={() => {
              hideSharePanel();
              goto({ url: `${HIDEAWAY.POSTER}` });
            }}
          >
            制作手账
          </View>
          <View
            className={cx('underline', {
              disabled: giftCount === 0,
            })}
            onClick={() => goto({ url: `${PAGES.MY_COUPON}?status=${COUPON_STATUS.COLLECTED}` })}
          >
            查看礼券
          </View>
        </View>
      </HideawaySharePanel>
    </View>
  );
}
