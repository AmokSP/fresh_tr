import { HIDEAWAY } from '@app.config';
import Header from '@components/Basic/Header';
import Navbar from '@components/Basic/Navbar';
import { View, Image, Text, Canvas, Video } from '@tarojs/components';
import Taro, { useLoad, useShareAppMessage } from '@tarojs/taro';
import { goto } from '@utils';
import './index.scss';
export default function Index() {
  useLoad(() => {});
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
      {/* <Video autoplay={false} controls={false} src={HIDEAWAY_ASSETS.stories[0].video}></Video> */}

      <Image
        src={`${BUCKET_URL}/uploads/123_d2fedb6827.gif`}
        className='w-100 gif'
        mode='widthFix'
      ></Image>
      <Image
        className='w-100'
        src={`${BUCKET_URL}/uploads/Chengdu_KOL_1_9c3a640305.png`}
        mode='widthFix'
        onClick={() =>
          goto({
            url: `${HIDEAWAY.POSTER}`,
            // url: `${HIDEAWAY.POSTER}?template=${'tmp2'}`,
          })
        }
      ></Image>
      {/* <View className='pill-button primary'>定制您的专属卡片</View> */}
    </View>
  );
}
