import { View, Image, Button, Block, Text } from '@tarojs/components';
import Taro, { useDidHide, useDidShow, useLoad, useRouter } from '@tarojs/taro';
import { getAuthorization } from '../../utils/getAuth';
import Templates from '@hideaway/assets/poster/templates';
import IconDownload from '@hideaway/assets/poster/icons/download.svg';
import IconEdit from '@hideaway/assets/poster/icons/edit.svg';
import IconExplore from '@hideaway/assets/poster/icons/explore.svg';
import useAsync from '@hooks/useAsync';
import './index.scss';
import Navbar from '@components/Basic/Navbar';
import Header from '@components/Basic/Header';
import useBoolean from '@hooks/useBoolean';
import HideawayPopup from '@components/HideawayPopup';
import { goto, hideLoading, showLoading } from '@utils';
import { HIDEAWAY, PAGES } from '@app.config';
import { drawPoster, drawSaveImage } from '../ui/draw';
import HideawayService from '@api/hideaway.service';
import { useEffect } from 'react';
import useStore from '@stores';
import PrivacyAuth from '@components/PrivacyAuth';

export default function Index() {
  // const posterData: PosterData = Taro.getStorageSync('posterData');
  const [savePopup, showSavePopup, hideSavePopup] = useBoolean(false);
  const [expirePopup, showExpirePopup] = useBoolean(false);
  const [errorPopup, showErrorPopup] = useBoolean(false);
  const { params } = useRouter();
  const { isLogin } = useStore((state) => state);

  const {
    value: posterData,
    execute: fetchPoster,
    reset: resetPosterData,
  } = useAsync(async (token) => {
    return HideawayService.readPoster(token);
  });

  useEffect(() => {
    if (isLogin) {
      showLoading();
      fetchPoster(params.token);
    }
  }, [isLogin]);
  useDidShow(() => {
    if (isLogin) {
      showLoading();
      fetchPoster(params.token);
    }
  });
  useDidHide(() => {
    resetPosterData();
  });
  useEffect(() => {
    if (posterData) {
      console.log(posterData);
      switch (posterData.success) {
        case 'expired':
          hideLoading();
          return showExpirePopup();
        case 'invalid_content':
        case 'in_check':
          hideLoading();
          return showErrorPopup();
        default:
          draw(posterData.content).finally(hideLoading);
      }
    }
  }, [posterData]);

  const { value: drawnImageUrl, execute: draw } = useAsync(drawPoster);

  const saveImage = () => {
    getAuthorization(
      'scope.writePhotosAlbum',
      true,
      '需要开启相册授权才能保存图片至相册',
      () => {}
    ).then(async () => {
      Taro.showLoading({ title: '图片保存中...', mask: true });
      try {
        let temp = `${Taro.env.USER_DATA_PATH}/temp_save_${new Date().getTime()}.png`;
        Taro.getFileSystemManager().writeFileSync(temp, drawnImageUrl!.slice(22), 'base64');
        const imageUrl = await drawSaveImage(temp, Templates[posterData!.content.id].desc);
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
    });
  };
  const ctas = (
    <Block>
      <View
        className='pill-button primary'
        onClick={() => {
          goto({ url: HIDEAWAY.POSTER, type: 'redirectTo' });
        }}
      >
        手账制作
      </View>
      <View
        onClick={() => {
          goto({ url: HIDEAWAY.CITY_MAP, type: 'redirectTo' });
        }}
        className='underline'
      >
        探索更多
      </View>
    </Block>
  );
  return (
    <View className={'poster-share'}>
      <Navbar transparent holdPlace={true}>
        <Header
          title='brand_logo'
          buttonHome={true}
          buttonBack={false}
          onClickHome={() => {
            goto({ url: HIDEAWAY.INDEX, type: 'redirectTo' });
          }}
        ></Header>
      </Navbar>
      {posterData && (
        <Block>
          <View className='block'>
            <Image className='preview' mode='aspectFill' src={drawnImageUrl ?? ''}></Image>
            <View className='desc'>{Templates[posterData.content.id]?.desc}</View>
            <View className='hint'>{'扫码制作海报分享好友获得优惠券'}</View>{' '}
            <Image
              className='qr-code'
              src={`${BUCKET_URL}${HIDEAWAY_ASSETS.campaignQrCode}`}
            ></Image>
          </View>

          <View className='buttons'>
            <Button onClick={saveImage}>
              <Image src={IconDownload}></Image>
              <Text>下载到相册</Text>
            </Button>
            <Button
              onClick={() => {
                goto({ url: HIDEAWAY.POSTER, type: 'redirectTo' });
              }}
            >
              <Image src={IconEdit}></Image>
              <Text>前往制作</Text>
            </Button>
            <Button
              onClick={() => {
                goto({ url: HIDEAWAY.INDEX, type: 'redirectTo' });
              }}
            >
              <Image src={IconExplore}></Image>
              <Text>即刻探索</Text>
            </Button>
          </View>
        </Block>
      )}
      <HideawayPopup show={savePopup} onClose={hideSavePopup}>
        <View className='save-popup'>
          <View className='title'>保存成功</View>
          <View className='text'>
            图片已保存至相册，请前往您的手机相册查看或制作一张您心仪的海报分享给好友把~
          </View>
          {ctas}
        </View>
      </HideawayPopup>
      <HideawayPopup
        show={errorPopup}
        onClose={() => {
          goto({ url: HIDEAWAY.CITY_MAP, type: 'redirectTo' });
        }}
      >
        <View className='save-popup'>
          <View className='title'>安全提醒</View>
          <View className='text'>
            很抱歉，您的好友分享的内容因涉及
            违规暂不可查看。您可以前往制作心仪的海报或探索更多其他内容。
          </View>
          {ctas}
        </View>
      </HideawayPopup>
      <HideawayPopup
        show={expirePopup}
        onClose={() => {
          goto({ url: HIDEAWAY.INDEX, type: 'redirectTo' });
        }}
      >
        <View className='save-popup'>
          <View className='title'>提醒</View>
          <View className='text'>
            很抱歉，您的好友分享的内容已过期。您可以前往制作心仪的海报或探索更多其他内容。
          </View>
          {ctas}
        </View>
      </HideawayPopup>
      <PrivacyAuth init></PrivacyAuth>
    </View>
  );
}
