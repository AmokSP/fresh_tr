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
      <Video autoplay={false} controls={false} src={HIDEAWAY_ASSETS.stories[0].video}></Video>
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
