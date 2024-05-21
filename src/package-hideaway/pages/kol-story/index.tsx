import { HIDEAWAY } from '@app.config';
import Header from '@components/Basic/Header';
import Navbar from '@components/Basic/Navbar';
import { View, Image, Text, Canvas, Video } from '@tarojs/components';
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro';
import { goto, hideLoading, showLoading } from '@utils';
import './index.scss';
import useAsync from '@hooks/useAsync';
import HideawayService from '@api/hideaway.service';
import { useState } from 'react';
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
        return {
          'hideawaybookpage.kol-image': (
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
              onClick={() => {
                if (index === (kolData?.data?.[0]?.attributes.content.length ?? 0) - 1) {
                  goto({ url: HIDEAWAY.POSTER });
                }
              }}
            ></Image>
          ),
          'hideawaybookpage.kol-video': (
            <Video
              className='w-100'
              style={{
                height: item.height ?? 211 + 'rpx',
                width: item.width ?? 375 + 'rpx',
              }}
              src={`${item.url}`}
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
