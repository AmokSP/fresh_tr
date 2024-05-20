import { HIDEAWAY } from '@app.config';
import Header from '@components/Basic/Header';
import Navbar from '@components/Basic/Navbar';
import { View, Image, Text, Canvas, Video } from '@tarojs/components';
import Taro, { useLoad, useShareAppMessage } from '@tarojs/taro';
import { goto } from '@utils';
import './index.scss';
import useAsync from '@hooks/useAsync';
import HideawayService from '@api/hideaway.service';
export default function Index() {
  const { value: kolData, execute: fetchKolData } = useAsync(HideawayService.getKolStory);
  useLoad(() => {
    fetchKolData('hangzhou2');
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
      {kolData?.data?.attributes.content.map((item) => {
        console.log(item);
        return {
          'hideawaybookpage.kol-image': (
            <Image
              className='w-100'
              mode='widthFix'
              src={`${BUCKET_URL}${item?.url?.data?.attributes?.url}`}
            ></Image>
          ),
          'hideawaybookpage.kol-video': (
            <Video
              className='w-100'
              style={{
                height: item.height ?? 350 + 'rpx',
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
