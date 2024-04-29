import { View, Image, Button, Block, Text } from '@tarojs/components';
import Taro, { useDidHide, useDidShow, useLoad, useRouter } from '@tarojs/taro';
import { getAuthorization } from '../../utils/getAuth';
import Templates from '@hideaway/assets/poster/templates';
import IconDownload from '@hideaway/assets/poster/icons/download.svg';
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

export default function Index() {
  // const posterData: PosterData = Taro.getStorageSync('posterData');
  const [savePopup, showSavePopup, hideSavePopup] = useBoolean(false);
  const [errorPopup, showErrorPopup, hideErrorPopup] = useBoolean(false);
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
    console.log(params.token);
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
      if (posterData.success !== 'success') {
        hideLoading();
        return showErrorPopup();
      }
      draw(posterData.content).finally(hideLoading);
    }
  }, [posterData]);

  const { value: drawnImageUrl, execute: draw } = useAsync(drawPoster);

  const saveImage = () => {
    getAuthorization('scope.writePhotosAlbum', '需要开启相册授权才能保存至相册', () => {}).then(
      async () => {
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
      }
    );
  };
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
            <View className='hint'>{'扫码制作海报分享好友获得优惠券'}</View>
          </View>

          <View className='buttons'>
            <Button onClick={saveImage}>
              <Image src={IconDownload}></Image>
              <Text>下载到相册</Text>
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
          <View
            className='pill-button primary'
            onClick={() => {
              goto({ url: HIDEAWAY.POSTER, type: 'redirectTo' });
            }}
          >
            前往制作
          </View>
          <View
            onClick={() => {
              goto({ url: HIDEAWAY.CITY_MAP, type: 'redirectTo' });
            }}
            className='underline'
          >
            继续探索
          </View>
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
          <View
            className='pill-button primary'
            onClick={() => {
              goto({ url: HIDEAWAY.POSTER, type: 'redirectTo' });
            }}
          >
            前往制作
          </View>
          <View
            onClick={() => {
              goto({ url: HIDEAWAY.CITY_MAP, type: 'redirectTo' });
            }}
            className='underline'
          >
            继续探索
          </View>
        </View>
      </HideawayPopup>
    </View>
  );
}
