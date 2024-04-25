import { HIDEAWAY } from '@app.config';
import Header from '@components/Basic/Header';
import Navbar from '@components/Basic/Navbar';
import { View, Image, Text, Canvas } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { goto } from '@utils';
export default function Index() {
  useLoad(() => {});
  return (
    <View className={'kol-story'}>
      <Navbar transparent holdPlace>
        <Header title='brand_logo'></Header>
      </Navbar>
      <View
        className='pill-button primary'
        onClick={() =>
          goto({
            url: `${HIDEAWAY.POSTER}?template=${1}`,
          })
        }
      >
        定制您的专属卡片
      </View>
    </View>
  );
}
