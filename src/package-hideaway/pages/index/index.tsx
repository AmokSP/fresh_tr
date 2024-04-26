import { View, Image, Text, Canvas } from '@tarojs/components';
import Taro, { useDidHide, useDidShow, useLoad, useUnload } from '@tarojs/taro';
import gsap from 'gsap';
import './index.scss';
import { useRef, useState } from 'react';
import cx from 'classnames';
import FressBook, { PAGE_WIDTH } from './ui/FreshBook';
import Orient from '@hideaway/assets/book/orient.svg';
import Title from '@hideaway/assets/book/title.png';
import LoadingTitle from '@hideaway/assets/book/loading-title.svg';
import LoadingText from '@hideaway/assets/book/loading-text.svg';
import Cta from '@hideaway/assets/book/cta.png';
import Background from '@hideaway/assets/book/background.jpg';
import { PLATFORM } from 'three-platformize';
import HideawaySharePanel from '@hideaway/components/HideawaySharePanel';
import { WechatPlatform } from 'three-platformize/src/WechatPlatform';
import Navbar, { NAVBAR_HEIGHT } from '@components/Basic/Navbar';
import { delay, goto } from '@utils';
import SwipeGuide from '@hideaway/components/SwipeGuide';
import useBoolean from '@hooks/useBoolean';
import useShareStatusQuery from '@hideaway/useShareStatusQuery';
import Plane from '@assets/plane.png';
import PlaneLoad from '@hideaway/assets/plane-load.png';
import { HIDEAWAY, PAGES } from '@app.config';
import { COUPON_STATUS } from '@constants/coupon';
import Header from '@components/Basic/Header';
const { windowWidth, windowHeight } = Taro.getSystemInfoSync();
let prevTouch = 0;
let animating = false;
let platform: any;
let assetLoaded = 0;
export default function Index() {
  const freshBook = useRef<any>();
  const [sharePanelFlag, showSharePanel, hideSharePanel] = useBoolean(false);
  const { receivedCount, summary } = useShareStatusQuery();
  const [swipeGuideFlag, showSwipeGuide] = useBoolean(false);
  const [isLandscape, setLandscape] = useState(false);
  const [cityIndex, setCityIndex] = useState(0);
  const [phase, setPhase] = useState<
    'idle' | 'load-start' | 'load-done' | 'book-ready' | 'cover' | 'cover-out' | 'book-out' | ''
  >('idle');
  useLoad(async () => {
    Taro.createSelectorQuery()
      .select('#webgl')
      .node()
      .exec((res) => {
        const canvas = res[0].node;
        if (!canvas) return;
        platform = new WechatPlatform(canvas, windowWidth, windowHeight);

        PLATFORM.set(platform);

        freshBook.current = new FressBook(canvas);
      });
    await delay(100);
    setPhase('load-start');
    await delay(2500);
    Taro.eventCenter.on('asset-loaded', async () => {
      assetLoaded++;
      if (assetLoaded >= 20) {
        setPhase('load-done');
        await delay(2000);
        startIntro();
      }
    });
  });
  useDidShow(() => {
    freshBook.current?.startRender();
    if (phase === 'book-out') {
      animating = true;
      setPhase('book-ready');
      gsap.to(freshBook.current.camera.position, {
        x: 0,
        z: 45,
        duration: 2,
        delay: 0,
        ease: 'power1.out',
        onComplete: () => {
          animating = false;
        },
      });
    }
  });
  useDidHide(() => {
    freshBook.current.stopRender();
  });
  useUnload(() => {
    assetLoaded = 0;
    Taro.eventCenter.off('asset-loaded');
    freshBook.current.stopRender();
  });
  const touchBeginHandler = (e) => {
    if (phase != 'book-ready') return;
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
    prevTouch = isLandscape ? pageY : pageX;
  };
  const touchEndHandler = (e) => {
    if (phase != 'book-ready') return;
    const { pageX, pageY } = e.changedTouches[0];
    const delta = isLandscape ? pageY - prevTouch : pageX - prevTouch;
    freshBook.current.progress.current += delta * -0.15;
    const pageProgress = freshBook.current.progress.current % 50;
    let targetProgress = 0;
    if (pageProgress < 25) {
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
    if (freshBook.current.progress.current >= 25) {
      gsap.to(freshBook.current.camera.position, {
        x: 0,
      });
    } else {
      gsap.to(freshBook.current.camera.position, {
        x: PAGE_WIDTH * 0.5,
      });
    }
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
        duration: transitDuration,
        onComplete: () => {
          animating = false;
        },
      });
    }
    setLandscape(!isLandscape);
  };
  const flipTo = (index) => {
    setCityIndex(index);
    gsap.to(freshBook.current.progress, {
      delay: 0,
      current: 50 + index * 50,
      duration: 1,
      ease: 'power2.inOut',
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
      { z: 32, y: 0.5 },
      {
        y: 2.5,
        z: 40,
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
      y: -0.5,
      duration: 1.5,
      ease: 'power1.inOut',
      onComplete: () => {
        freshBook.current.parallax = true;
        freshBook.current.interactive = true;
        setPhase('book-ready');
      },
    });
    gsap.to(freshBook.current.camera.position, {
      x: 0,
      z: 45,
      duration: 3,
      delay: 1.5,
      ease: 'power1.inOut',
      onComplete: () => {
        animating = false;
        showSwipeGuide();
      },
    });
  };
  const bookOut = (index=cityIndex) => {
    if (animating) return;
    animating = true;
    setPhase('book-out');
    gsap.to(freshBook.current.camera.position, {
      x: 0,
      z: 25,
      duration: 2,
      delay: 0,
      ease: 'power1.in',
      onComplete: () => {
        animating = false;
        goto({
          url: `${HIDEAWAY.CITY_MAP}?city=${index}`,
        });
      },
    });
  };
  const onCanvasClick = (e) => {
    switch (phase) {
      case 'idle':
        return startIntro();
      case 'book-ready':
        const result = freshBook.current.raycastCheck(e.detail.x, e.detail.y);
        if (result && cityIndex >= 0) {
          bookOut(cityIndex);
        }
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
      <View className='mask'>
        {phase !== 'book-out' && <Image className='bg' src={Background}></Image>}
        {phase !== 'book-out' && <Image className='plane-load' src={PlaneLoad}></Image>}
        {phase !== 'book-out' && (
          <Image src={LoadingTitle} className='loading-title' mode='widthFix'></Image>
        )}
        {phase !== 'book-out' && (
          <Image src={LoadingText} className='loading-text' mode='widthFix'></Image>
        )}
        {/* {phase !== 'book-out' && <View className='loading'></View>} */}
      </View>
      <Image onClick={showSharePanel} src={Plane} className={'btn-plane'}></Image>
      <Image className='title' src={Title}></Image>
      <Image
        onClick={()=>{
          phase === 'cover'
            ? coverOut()
            : bookOut()
          }
        }
        className='cta'
        src={Cta}
      ></Image>
      <Image src={Orient} onClick={toggleOrient} className='orient-toggle'></Image>
      <View style={{ paddingTop: `${NAVBAR_HEIGHT}px` }} className='slogan'>
        <View>亲近自然世界</View>
        <View className='sub'>短暂的与主线生活“脱轨”放空自己</View>
      </View>
      <View className='paginator'>
        <View
          className={cx('page-item', {
            active: cityIndex === 0,
          })}
          style={{ transitionDelay: '0.1s' }}
          onClick={() => flipTo(0)}
        >
          杭州
        </View>
        <View
          className={cx('page-item', {
            active: cityIndex === 1,
          })}
          style={{ transitionDelay: '0.2s' }}
          onClick={() => flipTo(1)}
        >
          云南
        </View>
        <View
          className={cx('page-item', {
            active: cityIndex === 2,
          })}
          style={{ transitionDelay: '0.3s' }}
          onClick={() => flipTo(2)}
        >
          成都
        </View>
      </View>
      <Image className='bg' src={Background}></Image>
      <Canvas
        onClick={onCanvasClick}
        onTouchStart={touchBeginHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
        type='webgl'
        id='webgl'
        className='canvas'
        width={`${windowWidth}px`}
        height={`${windowHeight}px`}
        style='width: 100%; height: 100vh;'
      ></Canvas>
      <SwipeGuide show={swipeGuideFlag}></SwipeGuide>

      <HideawaySharePanel
        summary={summary}
        receivedCount={receivedCount}
        show={sharePanelFlag}
        onClose={hideSharePanel}
      >
        <View className='ctas'>
          <View
            className='pill-button primary'
            onClick={() => {
              hideSharePanel();
              goto({ url: `${HIDEAWAY.POSTER}?id=${1}` });
            }}
          >
            制作海报
          </View>
          <View
            className={cx('underline', {
              disabled: receivedCount === 0,
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
