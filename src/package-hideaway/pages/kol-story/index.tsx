import { HIDEAWAY } from '@app.config';
import Header from '@components/Basic/Header';
import Navbar from '@components/Basic/Navbar';
import { View, Image, Text, Canvas, Video } from '@tarojs/components';
import Taro, { useLoad, useShareAppMessage } from '@tarojs/taro';
import { goto } from '@utils';
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
      <Navbar transparent holdPlace>
        <Header title='brand_logo'></Header>
      </Navbar>
      <Video
        autoplay={false}
        controls={false}
        src={
          'http://tr-media-cdn.fresh-cn.com/f0c618ee0c2171efbfea5017e1e90102/39aa383261874230ae078436ff993357.m3u8'
        }
      ></Video>
      <View
        className='pill-button primary'
        onClick={() =>
          goto({
            url: `${HIDEAWAY.POSTER}`,
            // url: `${HIDEAWAY.POSTER}?template=${'tmp2'}`,
          })
        }
      >
        定制您的专属卡片
      </View>
    </View>
  );
}
