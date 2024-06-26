import { View, Image, Button, Canvas, Block } from '@tarojs/components';
import Taro, {
  useRouter,
  useDidHide,
  useDidShow,
  useLoad,
  useShareAppMessage,
  useUnload,
} from '@tarojs/taro';
import gsap from 'gsap';
import './index.scss';
import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import FressBook, { PAGE_WIDTH } from './ui/FreshBook';
import Title from '@hideaway/assets/book/title.png';
import Background from '@hideaway/assets/book/background';
import { PLATFORM, Vector3 } from 'three-platformize';
import HideawaySharePanel from '@hideaway/components/HideawaySharePanel';
import { WechatPlatform } from 'three-platformize/src/WechatPlatform';
import Navbar, { NAVBAR_HEIGHT } from '@components/Basic/Navbar';
import { delay, goto } from '@utils';
import SwipeGuide from '@hideaway/components/SwipeGuide';
import useBoolean from '@hooks/useBoolean';
import useShareStatusQuery from '@hideaway/useShareStatusQuery';
import Plane from '@assets/plane.png';
import Bell from '@hideaway/assets/book/bell.png';
import PlaneLoad from '@hideaway/assets/plane-load.png';
import { HIDEAWAY, PAGES } from '@app.config';
import { COUPON_STATUS } from '@constants/coupon';
import Header from '@components/Basic/Header';
import { degToRad } from '../poster/utils/rotations';
import PanelCta from '@hideaway/assets/panel-cta.png';
import { showToast } from '@utils';
import subscribeMessage from './ui/SubscribeCampaignMessage';
import HideawayService from '@api/hideaway.service';
import useAsync from '@hooks/useAsync';
import useStore from '@stores';
const { screenWidth: windowWidth, screenHeight: windowHeight } = Taro.getWindowInfo();
const CAMERA_READY_POS = {
  x: PAGE_WIDTH * 0.5,
  z: 24,
  y: 1,
};
let prevTouch = 0;
let animating = false;
let assetLoaded = 0;
const PhaseSeq = [
  'idle',
  'load-start',
  'load-done',
  '',
  'cover',
  'cover-out',
  'book-ready',
  'book-out',
] as const;
const SubscribeKey = 'hideaway_subscribed';
export default function Index() {
  const { params } = useRouter();
  const [subscribed, setSubscribed] = useState<boolean>(Taro.getStorageSync(SubscribeKey) ?? false);
  const freshBook = useRef<any>();
  const platform = useRef<WechatPlatform>();
  const [sharePanelFlag, showSharePanel, hideSharePanel] = useBoolean(false);
  const { receivedCount, giftCount } = useShareStatusQuery();
  const [swipeGuideFlag, showSwipeGuide] = useBoolean(false);
  const [isLandscape, setLandscape] = useState(false);
  const [cityIndex, setCityIndex] = useState(0);
  const [phase, setPhase] = useState<(typeof PhaseSeq)[number]>('idle');
  const { userInfo, isLogin } = useStore((state) => state);
  const { value: hideawayAssets, execute: fetchAsset } = useAsync(HideawayService.getHidewayAsset);
  const { execute: checkIn } = useAsync(HideawayService.checkIn);
  useLoad(async () => {
    await delay(100);
    setPhase('load-start');
    await delay(2500);
    const { data: bookData } = await fetchAsset();

    Taro.eventCenter.on('asset-loaded', async () => {
      assetLoaded++;
      if (assetLoaded >= 20) {
        setPhase('load-done');
        await delay(2000);
        startIntro();
      }
    });
    Taro.createSelectorQuery()
      .select('#webgl')
      .node()
      .exec((res) => {
        const canvas = res[0].node;
        if (!canvas) return;
        platform.current = new WechatPlatform(canvas, windowWidth, windowHeight);

        PLATFORM.set(platform.current);

        freshBook.current = new FressBook(canvas, bookData);
      });
  });
  useShareAppMessage(() => {
    return {
      title: HIDEAWAY_ASSETS.shareTitle,
      imageUrl: `${BUCKET_URL}${HIDEAWAY_ASSETS.shareImage}`,
      path: `${HIDEAWAY.INDEX}?accountId=${userInfo.accountId}`,
    };
  });
  useDidShow(() => {
    freshBook.current?.startRender();
    if (phase === 'book-out') {
      animating = true;
      setPhase('book-ready');
      gsap.to(freshBook.current.camera.position, {
        ...CAMERA_READY_POS,
        duration: 2,
        delay: 0,
        ease: 'power1.out',
        onComplete: () => {
          freshBook.current.interactive = true;
          animating = false;
        },
      });
    }
  });
  useEffect(() => {
    if (isLogin && params.accountId && params.accountId !== userInfo.accountId) {
      checkIn(params.accountId);
    }
  }, [isLogin, params.accountId]);
  useEffect(() => {
    freshBook.current?.bookmarks.forEach((wrapper, index) => {
      gsap.to(wrapper.children[0].position, {
        y: index === cityIndex ? 0.6 : 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    });
  }, [cityIndex]);
  useDidHide(() => {
    freshBook.current.stopRender();
  });
  useUnload(() => {
    animating = false;
    Taro.eventCenter.off('asset-loaded');
    freshBook.current.stopRender();
    PLATFORM.dispose();
  });
  const onBellClick = async () => {
    subscribeMessage(hideawayAssets?.data?.attributes?.templateId, true)
      .then(() => {
        showToast({
          title: '订阅成功',
          icon: 'success',
        });
      })
      .then(() => {
        setSubscribed(true);
      });
  };
  const onCardClick = (slug) => {
    subscribeMessage(hideawayAssets?.data?.attributes?.templateId, false)
      .then(() => {
        setSubscribed(true);
      })
      .finally(() => {
        goto({
          url: `${HIDEAWAY.KOL_STORY}?slug=${slug}`,
        });
      });
  };
  const touchBeginHandler = (e) => {
    if (phase != 'book-ready') return;
    if (animating) animating = false;
    gsap.killTweensOf(freshBook.current.progress, 'current');
    prevTouch = isLandscape ? e.changedTouches[0].pageY : e.changedTouches[0].pageX;
  };
  const touchMoveHandler = (e) => {
    if (phase != 'book-ready') return;
    const { pageX, pageY } = e.changedTouches[0];
    const delta = isLandscape ? pageY - prevTouch : pageX - prevTouch;
    freshBook.current.progress.current += delta * -0.15;
    if (freshBook.current.progress.current > 158) {
      freshBook.current.progress.current = 158;
    }
    if (phase === 'book-ready' && freshBook.current.progress.current < 38) {
      freshBook.current.progress.current = 38;
    }
    prevTouch = isLandscape ? pageY : pageX;
  };
  const touchEndHandler = (e) => {
    if (phase != 'book-ready') return;
    const { pageX, pageY } = e.changedTouches[0];
    const delta = isLandscape ? pageY - prevTouch : pageX - prevTouch;
    freshBook.current.progress.current += delta * -0.15;
    const pageProgress = freshBook.current.progress.current % 50;
    let targetProgress = 0;
    let target = cityIndex;
    if (pageProgress < 25) {
      target = cityIndex - 1;
      targetProgress = Math.floor(freshBook.current.progress.current / 50) * 50;
      gsap.to(freshBook.current.progress, {
        current: targetProgress < 0 ? 0 : targetProgress,
      });
    } else {
      targetProgress = Math.ceil(freshBook.current.progress.current / 50) * 50;
      gsap.to(freshBook.current.progress, {
        current: targetProgress,
      });
    }
    // if (freshBook.current.progress.current >= 25) {
    //   gsap.to(freshBook.current.camera.position, {
    //     x: 0,
    //   });
    // } else {
    //   gsap.to(freshBook.current.camera.position, {
    //     x: PAGE_WIDTH * 0.5,
    //   });
    // }
    setCityIndex(Math.floor((targetProgress - 50) / 50));
  };
  const toggleOrient = () => {
    animating = true;
    const transitDuration = 1;
    if (isLandscape) {
      gsap.to(freshBook.current.camera.rotation, {
        z: 0,
        duration: transitDuration,
      });
      gsap.to(freshBook.current.camera.position, {
        z: 45,
        y: -0.5,
        duration: transitDuration,
        onComplete: () => {
          animating = false;
        },
      });
    } else {
      gsap.to(freshBook.current.camera.rotation, {
        z: Math.PI / 2,
        duration: transitDuration,
      });
      gsap.to(freshBook.current.camera.position, {
        z: 35,
        y: 0,
        duration: transitDuration,
        onComplete: () => {
          animating = false;
        },
      });
    }
    setLandscape(!isLandscape);
  };
  const flipTo = (index) => {
    if (animating) return;
    setCityIndex(index);
    animating = true;
    gsap.to(freshBook.current.progress, {
      delay: 0,
      current: 50 + index * 50,
      duration: 1 + 1 * Math.abs(index - cityIndex),
      ease: 'power2.inOut',
      onComplete: () => {
        animating = false;
      },
    });
  };
  const startIntro = () => {
    if (animating) return;
    const factor = 0.67;
    animating = true;
    setPhase('');
    gsap.fromTo(
      freshBook.current.progress,
      { current: 150 },
      {
        delay: 0.3 * factor,
        current: 0,
        duration: 8 * factor,
        ease: 'power2.inOut',
      }
    );
    let tl = gsap.timeline();
    tl.fromTo(
      freshBook.current.camera.position,
      { x: 5 },
      {
        x: -PAGE_WIDTH * 0.5,
        duration: 3 * factor,
        ease: 'sine.inOut',
      }
    );
    tl.to(freshBook.current.camera.position, {
      x: PAGE_WIDTH * 0.5,
      duration: 3 * factor,
      ease: 'sine.inOut',
      onComplete: () => {
        setPhase('cover');
      },
    });

    gsap.fromTo(
      freshBook.current.camera.position,
      { z: 25, y: 0.5 },
      {
        y: 1.1,
        z: 35,
        duration: 5 * factor,
        ease: 'power1.inOut',
      }
    );
  };
  const coverOut = () => {
    setPhase('cover-out');

    gsap.to(freshBook.current.progress, {
      delay: 1.5,
      current: 50,
      duration: 3,
      ease: 'power2.inOut',
    });

    gsap.to(freshBook.current.camera.position, {
      y: -0,
      duration: 1.5,
      ease: 'power1.inOut',
      onComplete: () => {},
    });
    gsap.to(freshBook.current.camera.position, {
      ...CAMERA_READY_POS,
      duration: 3,
      delay: 1.5,
      ease: 'power1.inOut',
      onComplete: () => {
        animating = false;
        showSwipeGuide();
        freshBook.current.parallax = true;
        freshBook.current.interactive = true;
        setPhase('book-ready');
      },
    });
    gsap.to(freshBook.current.camera.rotation, {
      z: degToRad(-3),
      duration: 3,
      delay: 1.5,
      ease: 'power1.inOut',
    });
    freshBook.current.bookmarks.forEach((wrapper, index) => {
      gsap.to(wrapper.children[0].position, {
        y: index === 0 ? 0.6 : 0,
        duration: 0.5,
        delay: 3.7 + 0.2 * index,
        ease: 'back.out',
      });
    });
  };
  const bookOut = (kolslug, point: Vector3) => {
    if (animating) return;
    animating = true;
    setPhase('book-out');
    console.log('book-out');
    freshBook.current.interactive = false;
    gsap.to(freshBook.current.camera.position, {
      x: point.x,
      y: point.y,
      z: 16,
      duration: 3,
      delay: 0,
      ease: 'power1.inOut',
      onComplete: () => {
        animating = false;
        goto({
          url: `${HIDEAWAY.KOL_STORY}?slug=${kolslug}`,
        });
      },
    });
  };
  const onCanvasClick = (e) => {
    switch (phase) {
      case 'idle':
        return startIntro();
      case 'book-ready':
        if (animating) return;
        const { result, point } = freshBook.current.raycastCheck(e.detail.x, e.detail.y);
        console.log(result);
        switch (result) {
          case 'bookmark0':
            flipTo(0);
            break;
          case 'bookmark1':
            flipTo(1);
            break;
          case 'bookmark2':
            flipTo(2);
            break;
          default:
            if (result !== 'none' && result !== undefined) {
              bookOut(result, point);
            }
            break;
        }
        return;
        break;
      default:
        break;
    }
  };
  return (
    <View
      className={cx('hideaway-book', phase, {
        landscape: isLandscape,
      })}
    >
      <Navbar transparent holdPlace={false}>
        <Header buttonBack title='brand_logo'></Header>
      </Navbar>

      <Canvas
        onClick={onCanvasClick}
        onTouchStart={touchBeginHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
        width={windowWidth + 'px'}
        height={windowHeight + 'px'}
        type='webgl'
        id='webgl'
        className='canvas'
        // width={`${windowWidth}px`}
        // height={`${windowHeight}px`}
      ></Canvas>
      <View className='mask'>
        {PhaseSeq.indexOf(phase) <= 3 && (
          <Block>
            <Image className='bg' src={Background}></Image>
            <Image className='plane-load' src={PlaneLoad}></Image>
            {/* <Image src={LoadingTitle} className='loading-title' mode='widthFix'></Image>
            <Image src={LoadingText} className='loading-text' mode='widthFix'></Image> */}
          </Block>
        )}
      </View>
      {/* <Image onClick={showSharePanel} src={Plane} className={'btn-plane'}></Image> */}
      <Image className='title' src={Title}></Image>
      <View
        onClick={() => {
          coverOut();
        }}
        className='cta'
      >
        {'开启手账'}
      </View>
      {/* <Image src={Orient} onClick={toggleOrient} className='orient-toggle'></Image> */}
      {/* <View style={{ paddingTop: `${NAVBAR_HEIGHT}px` }} className='slogan'>
        <View>逸游茶境 悠然阅己</View>
        <View className='sub'>享一杯悠闲漫时光 寻fresh茶粹的力量</View>
      </View>
      <View className='paginator'>
        <View
          className={cx('page-item', {
            active: cityIndex === 0,
          })}
          onClick={() => flipTo(0)}
        >
          杭州
        </View>
        <View
          className={cx('page-item', {
            active: cityIndex === 1,
          })}
          onClick={() => flipTo(1)}
        >
          成都
        </View>
        <View
          className={cx('page-item', {
            active: cityIndex === 2,
          })}
          onClick={() => flipTo(2)}
        >
          云南
        </View>
      </View>
    */}
      <SwipeGuide show={swipeGuideFlag}></SwipeGuide>
      <Image className='bg' src={Background}></Image>
      <Image
        className={cx('bell', {
          subscribed,
        })}
        style={{ top: NAVBAR_HEIGHT + 34 }}
        src={Bell}
        onClick={onBellClick}
      ></Image>

      <View className='bottom-btns'>
        <View style={{ padding: '24rpx' }}>
          <View className='underline' onClick={() => goto({ url: HIDEAWAY.POSTER })}>
            制作旅行手账
          </View>
        </View>
        <View style={{ padding: '24rpx' }}>
          <View className='underline' onClick={showSharePanel}>
            分享赢好礼
          </View>
        </View>
      </View>
      <HideawaySharePanel
        giftCount={giftCount}
        receivedCount={receivedCount}
        show={sharePanelFlag}
        onClose={hideSharePanel}
      >
        <View className='ctas'>
          <Button className='pill-button primary' openType='share'>
            <Image className='scratch' src={PanelCta}></Image>
            <View>立即分享</View>
          </Button>

          <View className='more'>
            <View
              className={cx('underline', {
                disabled: giftCount === 0,
              })}
              onClick={() => goto({ url: `${PAGES.MY_COUPON}?status=${COUPON_STATUS.COLLECTED}` })}
            >
              查看礼券
            </View>
            <View className='line'></View>
            <View
              onClick={() => {
                // hideSharePanel();
                goto({ url: `${HIDEAWAY.POSTER}` });
              }}
              className='underline'
            >
              制作手账
            </View>
          </View>
        </View>
      </HideawaySharePanel>
    </View>
  );
}
