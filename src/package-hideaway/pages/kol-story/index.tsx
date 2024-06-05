import { HIDEAWAY } from '@app.config';
import Header from '@components/Basic/Header';
import Navbar from '@components/Basic/Navbar';
import { View, Image, Button, Canvas, Video } from '@tarojs/components';
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro';
import { goto, hideLoading, showLoading } from '@utils';
import './index.scss';
import useAsync from '@hooks/useAsync';
import HideawayService from '@api/hideaway.service';
import { CSSProperties, useState } from 'react';
import BtnShare from './share.svg';
import cx from 'classnames';
export default function Index() {
  const { params } = useRouter();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { value: kolData, execute: fetchKolData } = useAsync(HideawayService.getKolStoryBySlug);
  const [loading, setLoading] = useState(true);
  useLoad(async () => {
    showLoading();
    await fetchKolData(params.slug!);
  });

  useShareAppMessage((e) => {
    if (e.from === 'button') {
      return {
        title: HIDEAWAY_ASSETS.shareTitle,
        imageUrl: `${BUCKET_URL}${HIDEAWAY_ASSETS.shareImage}`,
        path: `${HIDEAWAY.KOL_STORY}?slug=${params.slug}`,
      };
    } else {
      return {
        title: HIDEAWAY_ASSETS.shareTitle,
        imageUrl: `${BUCKET_URL}${HIDEAWAY_ASSETS.shareImage}`,
        path: HIDEAWAY.INDEX,
      };
    }
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
      <View className={cx('mask', { loading })}></View>
      <Button className='btn-share' openType='share'>
        <Image src={BtnShare}></Image>
      </Button>
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
