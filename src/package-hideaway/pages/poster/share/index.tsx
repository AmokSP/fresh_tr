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
import PrivacyAuth from '@components/PrivacyAuth';
import PanelCta from '@hideaway/assets/panel-cta.png';

export default function Index() {
  const posterData: PosterData = Taro.getStorageSync('posterData');
  const [savePopup, showSavePopup, hideSavePopup] = useBoolean(false);
  const [sharePopup, showSharePopup, hideSharePopup] = useBoolean(false);
  const [guideRead, setGuideRead] = useBoolean(Taro.getStorageSync('share_guide_read') ?? false);
  const { params } = useRouter();
  const { receivedCount, giftCount } = useShareStatusQuery();
  useLoad(async () => {
    try {
      showLoading();
      await draw(posterData);
      hideLoading();
    } catch (e) {
      hideLoading();
    }
  });
  useShareAppMessage(() => {
    showSharePopup();
    return {
      title: '收到一封来自好友的旅行手账，点击查看',
      imageUrl: `${BUCKET_URL}${HIDEAWAY_ASSETS.shareImage}`,
      path: `${HIDEAWAY.POSTER_VIEW}?token=${params.token}`,
    };
  });
  const { value: drawnImageUrl, execute: draw } = useAsync(drawPoster);

  const saveImage = () => {
    getAuthorization('scope.writePhotosAlbum', true, '需要开启相册授权才能保存图片至相册', () => {})
      .then(async () => {
        Taro.showLoading({ title: '图片保存中...', mask: true });
        try {
          let temp = `${Taro.env.USER_DATA_PATH}/temp_save_${new Date().getTime()}.png`;
          Taro.getFileSystemManager().writeFileSync(temp, drawnImageUrl!.slice(22), 'base64');
          const imageUrl = await drawSaveImage(temp, Templates[posterData.id].desc);
          const saveRes = await Taro.saveImageToPhotosAlbum({
            filePath: imageUrl!,
          });

          if (saveRes.errMsg === 'saveImageToPhotosAlbum:ok') {
            Taro.hideLoading();
            showSavePopup();
            Taro.getFileSystemManager().removeSavedFile({
              filePath: temp,
            });
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
      })
      .catch();
  };
  const backToMap = () => {
    const pages = Taro.getCurrentPages();
    const target = pages.findIndex((i) => i.route === HIDEAWAY.INDEX.slice(1));
    if (target === -1) {
      goto({ url: HIDEAWAY.INDEX, type: 'reLaunch' });
    } else {
      Taro.navigateBack({
        delta: pages.length - target - 1,
      });
    }
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
        <View className='hint'>
          <Text>{Templates[posterData.id].subTitle}</Text>
        </View>
        <Image className='qr-code' src={`${BUCKET_URL}${HIDEAWAY_ASSETS.campaignQrCode}`}></Image>
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
          <View className='text'>图片已经保存到相册，快和好友一同分享精彩吧~</View>
          <View className='pill-button primary' onClick={() => Taro.navigateBack({ delta: 1 })}>
            返回制作
          </View>
          <View className='underline' onClick={backToMap}>
            继续探索
          </View>
        </View>
      </HideawayPopup>
      <View>{!guideRead && <ShareGuide></ShareGuide>}</View>
      <HideawaySharePanel
        receivedCount={receivedCount}
        giftCount={giftCount}
        show={sharePopup}
        onClose={hideSharePopup}
      >
        <View className='share-popup-ctas'>
          <View
            onClick={() => goto({ url: `${PAGES.MY_COUPON}?status=${COUPON_STATUS.COLLECTED}` })}
            className={cx('pill-button primary', { disabled: giftCount === 0 })}
          >
            <Image className='scratch' src={PanelCta}></Image>
            查看礼券
          </View>
          <View className='more'>
            <View className='underline' onClick={backToMap}>
              继续探索
            </View>
            <View className='line'></View>
            <Button openType='share' className='underline'>
              分享好友
            </Button>
          </View>
        </View>
      </HideawaySharePanel>
      <PrivacyAuth></PrivacyAuth>
    </View>
  );
}
