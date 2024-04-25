import { View, Image, Button, Block, Text } from '@tarojs/components';
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro';
import { getAuthorization } from '../utils/getAuth';
import Templates from '@hideaway/assets/poster/templates';
import IconShare from '@hideaway/assets/poster/icons/share.svg';
import IconDownload from '@hideaway/assets/poster/icons/download.svg';
import useAsync from '@hooks/useAsync';
import './index.scss';
import Navbar from '@components/Basic/Navbar';
import Header from '@components/Basic/Header';
import useBoolean from '@hooks/useBoolean';
import HideawayPopup from '@components/HideawayPopup';
import ShareGuide from '../components/Guides/ShareGuide';
import { goto, hideLoading, showLoading } from '@utils';
import HideawaySharePanel from '@hideaway/components/HideawaySharePanel';
import { HIDEAWAY, PAGES } from '@app.config';
import { drawPoster, drawSaveImage } from './ui/draw';
import { COUPON_STATUS } from '@constants/coupon';
import useShareStatusQuery from '@hideaway/useShareStatusQuery';
import cx from 'classnames';

export default function Index() {
  const posterData: PosterData = Taro.getStorageSync('posterData');
  const [savePopup, showSavePopup, hideSavePopup] = useBoolean(false);
  const [sharePopup, showSharePopup, hideSharePopup] = useBoolean(false);
  const [guideRead, setGuideRead] = useBoolean(Taro.getStorageSync('share_guide_read') ?? false);
  const { params } = useRouter();
  const { receivedCount, summary } = useShareStatusQuery();
  useLoad(async () => {
    showLoading();
    await draw(posterData);
    hideLoading();
  });
  useShareAppMessage(() => {
    showSharePopup();
    return {
      title: '感官逸游 馥已焕新',
      path: `${HIDEAWAY.POSTER_VIEW}?token=${params.token}`,
    };
  });
  const { value: drawnImageUrl, execute: draw } = useAsync(drawPoster);

  const saveImage = () => {
    getAuthorization('scope.writePhotosAlbum', '需要开启相册授权才能保存至相册', () => {}).then(
      async () => {
        Taro.showLoading({ title: '图片保存中...', mask: true });
        try {
          const imageUrl = await drawSaveImage(drawnImageUrl!, Templates[posterData.id].desc);
          const saveRes = await Taro.saveImageToPhotosAlbum({
            filePath: imageUrl!,
          });

          if (saveRes.errMsg === 'saveImageToPhotosAlbum:ok') {
            Taro.hideLoading();
            showSavePopup();
          } else {
            Taro.hideLoading();
            Taro.showToast({
              icon: 'error',
              title: '图片保存失败',
              duration: 1000,
            });
          }
        } catch (error) {
          Taro.hideLoading();
        }
      }
    );
  };
  return (
    <View
      className={'poster-share'}
      onTouchStart={() => {
        setGuideRead();
        Taro.setStorageSync('share_guide_read', true);
      }}
    >
      <Navbar transparent holdPlace={true}>
        <Header title='brand_logo'></Header>
      </Navbar>
      <View className='block'>
        <Image className='preview' mode='aspectFill' src={drawnImageUrl ?? ''}></Image>
        <View className='desc'>{Templates[posterData.id].desc}</View>
        <View className='hint'>{'扫码制作海报分享好友获得优惠券'}</View>
      </View>

      <View className='buttons'>
        <Button onClick={saveImage}>
          <Image src={IconDownload}></Image>
          <Text>下载到相册</Text>
        </Button>
        <Button openType={'share'}>
          <Image src={IconShare}></Image>
          <Text>分享给好友</Text>
        </Button>
      </View>
      <HideawayPopup show={savePopup} onClose={hideSavePopup}>
        <View className='save-popup'>
          <View className='title'>保存成功</View>
          <View className='text'>图片已保存到相册，赶紧分享给朋友吧~</View>
          <View className='pill-button primary' onClick={() => Taro.navigateBack({ delta: 1 })}>
            返回制作
          </View>
          <View className='underline' onClick={() => Taro.navigateBack({ delta: 3 })}>
            继续探索
          </View>
        </View>
      </HideawayPopup>
      <View>{!guideRead && <ShareGuide></ShareGuide>}</View>
      <HideawaySharePanel
        receivedCount={receivedCount}
        summary={summary}
        show={sharePopup}
        onClose={hideSharePopup}
      >
        <View className='share-popup-ctas'>
          <View
            onClick={() => goto({ url: `${PAGES.MY_COUPON}?status=${COUPON_STATUS.COLLECTED}` })}
            className={cx('pill-button primary', { disabled: receivedCount === 0 })}
          >
            查看礼券
          </View>
          <View className='more'>
            <View
              className='underline'
              onClick={() => {
                const pages = Taro.getCurrentPages();
                console.log(pages);
                const target = pages.findIndex((i) => i.route === HIDEAWAY.CITY_MAP.slice(1));
                if (target === -1) {
                  goto({ url: HIDEAWAY.INDEX, type: 'reLaunch' });
                } else {
                  Taro.navigateBack({
                    delta: pages.length - target - 1,
                  });
                }
                console.log(target);
              }}
            >
              继续探索
            </View>
            <View className='line'></View>
            <Button openType='share' className='underline'>
              分享好友
            </Button>
          </View>
        </View>
      </HideawaySharePanel>
    </View>
  );
}
