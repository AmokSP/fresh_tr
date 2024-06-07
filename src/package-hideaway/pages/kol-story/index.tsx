import { HIDEAWAY } from '@app.config';
import Header from '@components/Basic/Header';
import Navbar from '@components/Basic/Navbar';
import { View, Image, Button, Canvas, Video } from '@tarojs/components';
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro';
import { goto, hideLoading, showLoading } from '@utils';
import './index.scss';
import useAsync from '@hooks/useAsync';
import HideawayService from '@api/hideaway.service';
import { CSSProperties, useState, useEffect } from 'react';
import HideawaySharePanel from '@hideaway/components/HideawaySharePanel';
import BtnShare from './share.svg';
import { COUPON_STATUS } from '@constants/coupon';
import PanelCta from '@hideaway/assets/panel-cta.png';
import Plane from '@assets/plane.png';
import cx from 'classnames';
import { PAGES } from '@app.config';
import useBoolean from '@hooks/useBoolean';
import useShareStatusQuery from '@hideaway/useShareStatusQuery';
import useStore from '@stores';
export default function Index() {
  const { params } = useRouter();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { receivedCount, giftCount } = useShareStatusQuery();
  const [sharePanelFlag, showSharePanel, hideSharePanel] = useBoolean(false);
  const { value: kolData, execute: fetchKolData } = useAsync(HideawayService.getKolStoryBySlug);
  const [loading, setLoading] = useState(true);
  const { execute: checkIn } = useAsync(HideawayService.checkIn);
  const { userInfo, isLogin } = useStore((state) => state);
  useLoad(async () => {
    showLoading();
    await fetchKolData(params.slug!);
  });
  useEffect(() => {
    if (isLogin && params.accountId && params.accountId !== userInfo.accountId) {
      checkIn(params.accountId);
    }
  }, [isLogin, params.accountId]);

  useShareAppMessage((e) => {
    return {
      title: HIDEAWAY_ASSETS.shareTitle,
      imageUrl: `${BUCKET_URL}${HIDEAWAY_ASSETS.shareImage}`,
      path: `${HIDEAWAY.KOL_STORY}?slug=${params.slug}&accountId=${userInfo.accountId}`,
    };
  });
  return (
    <View className={'kol-story'}>
      <Navbar transparent holdPlace={false}>
        <Header
          title='brand_logo'
          buttonBack
          onClickBack={() => {
            Taro.navigateBack({
              delta: 1,

              fail: () => {
                goto({ url: HIDEAWAY.INDEX, type: 'redirectTo' });
              },
            });
          }}
        ></Header>
      </Navbar>
      <Image onClick={showSharePanel} className='btn-plane' src={Plane}></Image>
      <View className={cx('mask', { loading })}></View>
      {/* <Button className='btn-share' openType='share'>
        <Image src={BtnShare}></Image>
      </Button> */}
      {kolData?.data?.[0]?.attributes.content.map((item, index) => {
        const image = item?.image?.data?.attributes;
        const itemStyle: CSSProperties = {
          position: item?.absolute ? 'absolute' : 'relative',
          width: item.width ? Taro.pxTransform(item.width) : undefined,
          height: item.height
            ? Taro.pxTransform(item.height)
            : image
            ? Taro.pxTransform(image.height / (image.width / 750))
            : undefined,
          top: item.top ? Taro.pxTransform(item.top) : undefined,
          left: item.left ? Taro.pxTransform(item.left) : undefined,
          transformOrigin: 'center',
          transform: `rotate(${item.rotation ?? 0}deg)`,
        };
        return {
          'hideawaybookpage.kol-image': (
            <View
              className='kol-image'
              style={{
                ...itemStyle,
                pointerEvents: item.path ? 'all' : 'none',
                zIndex: item?.absolute ? 1 : 20 + index,
                lineHeight: 0,
              }}
            >
              <Image
                lazyLoad
                className='w-100'
                onLoad={() => {
                  if (index == 0) {
                    hideLoading();
                    setLoading(false);
                  }
                }}
                mode='scaleToFill'
                src={`${BUCKET_URL}${image?.url}`}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                onClick={() => {
                  goto({
                    url: item.path,
                  });
                }}
              ></Image>
              {item.description === 'is_frame' && <View className='explore'>点击探索</View>}
              <View className='product-title'>{item.title}</View>
            </View>
          ),
          'hideawaybookpage.kol-video': (
            <Video
              className='w-100'
              style={{
                ...itemStyle,
                zIndex: 1,
              }}
              src={`${item.url}`}
              objectFit={isFullScreen ? 'contain' : 'fill'}
              showFullscreenBtn={params.slug !== 'chengdu2'}
              onFullScreenChange={(e) => {
                console.log(e.detail);
                setIsFullScreen(e.detail.fullScreen);
              }}
            ></Video>
          ),
        }[item.__component];
      })}

      <HideawaySharePanel
        giftCount={giftCount}
        receivedCount={receivedCount}
        show={sharePanelFlag}
        onClose={hideSharePanel}
      >
        <View className='ctas'>
          <Button className='pill-button primary' openType='share'>
            <Image className='scratch' src={PanelCta}></Image>
            立即分享
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
      {/* <Image
        src={`${BUCKET_URL}${HIDEAWAY_ASSETS.stories[0].gif}`}
        className='w-100 gif'
        mode='widthFix'
      ></Image>
      <Image
        className='w-100'
        src={`${BUCKET_URL}${HIDEAWAY_ASSETS.stories[0].longPic}`}
        mode='widthFix'
        onClick={() =>
          goto({
            url: `${HIDEAWAY.POSTER}`,
            // url: `${HIDEAWAY.POSTER}?template=${'tmp2'}`,
          })
        }
      ></Image> */}
      {/* <View className='pill-button primary'>定制您的专属卡片</View> */}
    </View>
  );
}
