import { HIDEAWAY } from '@app.config';
import Header from '@components/Basic/Header';
import Navbar from '@components/Basic/Navbar';
import { View, Image, Text, Canvas, Video } from '@tarojs/components';
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro';
import { goto, hideLoading, showLoading } from '@utils';
import './index.scss';
import useAsync from '@hooks/useAsync';
import HideawayService from '@api/hideaway.service';
import { CSSProperties, useState } from 'react';
import cx from 'classnames';
export default function Index() {
  const { params } = useRouter();
  const { value: kolData, execute: fetchKolData } = useAsync(HideawayService.getKolStoryBySlug);
  const [loading, setLoading] = useState(true);
  useLoad(async () => {
    showLoading();
    await fetchKolData(params.slug!);
  });

  useShareAppMessage(() => {
    return {
      title: HIDEAWAY_ASSETS.shareTitle,
      imageUrl: `${BUCKET_URL}${HIDEAWAY_ASSETS.shareImage}`,
      path: HIDEAWAY.INDEX,
    };
  });
  return (
    <View className={'kol-story'}>
      <Navbar transparent holdPlace={false}>
        <Header title='brand_logo'></Header>
      </Navbar>
      <View className={cx('mask', { loading })}></View>
      {kolData?.data?.[0]?.attributes.content.map((item, index) => {
        const image = item?.image?.data?.attributes;
        const itemStyle: CSSProperties = {
          position: item?.absolute ? 'absolute' : 'relative',
          width: item.width ? Taro.pxTransform(item.width) : undefined,
          height: item.height ? Taro.pxTransform(item.height) : undefined,
          top: item.height ? Taro.pxTransform(item.top) : undefined,
          left: item.height ? Taro.pxTransform(item.left) : undefined,
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
                zIndex: item?.absolute ? 1 : 2 + index,
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
                mode='widthFix'
                src={`${BUCKET_URL}${image?.url}`}
                style={{
                  width: '100%',
                  height: item.height === null ? 'auto' : '100%',
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
              objectFit='fill'
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
