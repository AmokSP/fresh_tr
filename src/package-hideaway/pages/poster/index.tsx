import { Text, Image, View, Block, MovableArea, MovableView } from '@tarojs/components';
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro';
import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import getTransformedData from './utils/getTransformedData';
import './index.scss';
import EditableItem from './components/EditableItem';
import EditableText from './components/EditableText';
import EditablePhoto from './components/EditablePhoto';
import TextEditor from './components/TextEditor';
import useBoolean from '@hooks/useBoolean';
import StickerPopup from './components/StickerPopup';
import AllStickers from '@hideaway/assets/poster/stickers';
import Templates from '@hideaway/assets/poster/templates';
import PanelBtn from '@hideaway/assets/poster/icons/panel-btn.png';
import { POSTER_HEIGHT, POSTER_WIDTH, posterToView, viewToPoster } from './utils/scale';
import HideawaySharePanel from '@hideaway/components/HideawaySharePanel';
import useShareStatusQuery from '@hideaway/useShareStatusQuery';
import { goto, hideLoading, showLoading, showToast } from '@utils';
import { HIDEAWAY, PAGES } from '@app.config';
import Header from '@components/Basic/Header';
import Navbar, { NAVBAR_HEIGHT } from '@components/Basic/Navbar';
import EditGuide from './components/Guides/EditGuide';
import HideawayPopup from '@components/HideawayPopup';
import HideawayService from '@api/hideaway.service';
import { COUPON_STATUS } from '@constants/coupon';
import Plane from '@assets/plane.png';
import PrivacyAuth from '@components/PrivacyAuth';

const { windowWidth, windowHeight } = Taro.getSystemInfoSync();
const MoveableSize = { width: posterToView(POSTER_WIDTH), height: posterToView(POSTER_HEIGHT) };
let touches: Map<string, { preX: number; preY: number }> = new Map();
let mode: 'control' | '' = '';
let edited = false;
let tempId = -1;

export default function Editor() {
  const { params } = useRouter();
  const [contentErrorFlag, showContentError, hideContentError] = useBoolean(false);
  const [contentInCheckFlag, showContentIncheck, hideContentIncheck] = useBoolean(false);
  const [templateSwitchPopup, showTempalteSwitch, hideTemplateSwitch] = useBoolean(false);
  const { receivedCount, giftCount } = useShareStatusQuery();
  const [stickerPopupFlag, showStickerPopup, hideStickerPopup, toggleStickerPopup] =
    useBoolean(false);
  const [templateId, setTemplateId] = useState(Taro.getStorageSync('posterData').id ?? 'tmp1');
  // const [templateId, setTemplateId] = useState('tmp1');
  const [focusItemId, setFocusItemId] = useState(-1);
  const [textEditorTarget, setTextEditorTarget] = useState<TextField | undefined>(undefined);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [texts, setTexts] = useState<TextField[]>([]);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [sharePanelFlag, showSharePanel, hideSharePanel] = useBoolean(false);
  useShareAppMessage(() => {
    return {
      title: HIDEAWAY_ASSETS.shareTitle,
      path: HIDEAWAY.INDEX,
    };
  });
  useEffect(() => {
    setFocusItemId(-1);
    const localData = Taro.getStorageSync('posterData');
    let photoArr: Photo[];
    let textArr: TextField[];
    let stickerArr: Sticker[];
    if (localData && templateId === localData?.id) {
      edited = true;
      photoArr = localData.photos;
      textArr = localData.textfields;
      stickerArr = localData.stickers;
    } else {
      edited = false;
      photoArr = JSON.parse(JSON.stringify(Templates[templateId].photos));
      textArr = JSON.parse(JSON.stringify(Templates[templateId].textfields));
      stickerArr = JSON.parse(JSON.stringify(Templates[templateId].stickers));
    }
    textArr.forEach((item) => {
      item.content = item.content.slice(0, item.limit);
    });
    [...photoArr, ...textArr, ...stickerArr].forEach((i) => {
      i.x = posterToView(i.x);
      i.y = posterToView(i.y);
      i.width = posterToView(i.width);
      i.height = posterToView(i.height);
    });
    console.log(stickerArr);
    setPhotos(photoArr);
    setTexts(textArr);
    setStickers(stickerArr);
  }, [templateId]);
  useEffect(() => {
    saveToLocal();
  }, [photos, texts]);
  const canvasTouchStart = (e) => {
    if (touches.size === 1 && focusItemId > 0) {
    } else {
      setFocusItemId(-1);
    }
  };
  const onItemTouch = (e) => {
    if (e.touches.length === 1 && focusItemId !== e.id) {
      setFocusItemId(e.id);
    }
    const { pageX, pageY } = e.changedTouches[0];
    const { target } = e;
    switch (target) {
      case 'body':
        mode = '';
        break;
      case 'ctrl':
        mode = 'control';
        break;
    }
    touches.set(e.changedTouches[0].identifier, {
      preX: pageX,
      preY: pageY,
    });
  };
  const onTouchMove = (e) => {
    if (focusItemId < 0) return;
    const target = stickers.find((i) => i.id === focusItemId);
    const restItems = stickers.filter((i) => i.id !== focusItemId);

    const prevX1 = touches.get(e.touches[0].identifier)?.preX;
    const prevY1 = touches.get(e.touches[0].identifier)?.preY;

    if (prevX1 === undefined || prevY1 === undefined) return;

    const prevX2 =
      e.touches[1] !== undefined
        ? touches.get(e.touches[1].identifier)?.preX
        : mode === 'control'
        ? target!.x
        : prevX1 + 10;
    const prevY2 =
      e.touches[1] !== undefined
        ? touches.get(e.touches[1].identifier)?.preY
        : mode === 'control'
        ? target!.y
        : prevY1;
    const crtX1 = e.touches[0].pageX;
    const crtY1 = e.touches[0].pageY;

    const crtX2 =
      e.touches[1] !== undefined ? e.touches[1].pageX : mode === 'control' ? target!.x : crtX1 + 10;
    const crtY2 =
      e.touches[1] !== undefined ? e.touches[1].pageY : mode === 'control' ? target!.y : crtY1;

    const { x, y, width, height, rotation } = target!;
    const { newX, newY, scale, deltaRotationRad } = getTransformedData(
      x,
      y,
      prevX1,
      prevY1,
      prevX2,
      prevY2,
      crtX1,
      crtY1,
      crtX2,
      crtY2
    );
    setStickers(() => {
      const newItem = {
        ...target,
        x: isNaN(newX) ? x : newX,
        y: isNaN(newY) ? y : newY,
        rotation: isNaN(deltaRotationRad) ? rotation : rotation + deltaRotationRad,
        width: isNaN(scale) ? width : width * scale,
        height: isNaN(scale) ? height : height * scale,
      };
      return [...restItems, newItem] as any;
    });

    edited = true;
    e.touches.forEach((touch) => {
      touches.set(touch.identifier, {
        preX: touch.pageX,
        preY: touch.pageY,
      });
    });
  };
  const canvasTouchEnd = (e) => {
    console.log(e);
    e.changedTouches.forEach((releasedTouch) => {
      touches.delete(releasedTouch.identifier);
    });
    if (e.touches.length === 0) {
      saveToLocal();
    }
  };
  const onTextClick = (e) => {
    hideStickerPopup();
    setFocusItemId(-1);
    setTextEditorTarget(e);
  };
  const onTextConfirm = async (content) => {
    try {
      showLoading();
      const { result } = await HideawayService.checkContent(content);

      hideLoading();
      edited = true;
      setTextEditorTarget(undefined);
      setTexts([
        ...texts.filter((i) => i.id !== textEditorTarget!.id),
        {
          ...textEditorTarget!,
          content,
          error: result?.suggest !== 'pass',
        },
      ]);
    } catch (error) {
      hideLoading();
    }
  };
  const onPhotoClick = async (target) => {
    hideStickerPopup();
    setFocusItemId(-1);
    try {
      const newImage = await Taro.chooseImage({
        count: 1,
        // mediaType: ['image'],
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
      });
      console.log(newImage);
      const { tempFilePath } = await Taro.cropImage({
        src: newImage.tempFilePaths[0],
        cropScale: target.ratio ?? '1:1',
      });
      showLoading({ title: '上传中', mask: true });

      const { accessUrl } = await HideawayService.uploadPhoto(tempFilePath);
      hideLoading();
      console.log(accessUrl);
      if (!accessUrl) {
        return showContentError();
      }
      edited = true;
      setPhotos([
        ...photos.filter((i) => i.id !== target.id),
        {
          ...target,
          src: accessUrl,
          touched: true,
          status: 'success',
        },
      ]);
    } catch (error) {
      console.log(error);
      switch (error.errMsg) {
        case 'chooseImage:fail cancel':
        case 'cropImage:fail cancel':
        case 'chooseImage:fail privacy permission is not authorized':
          return;
        case 'chooseImage:fail privacy permission is not authorized in gap':
          return showToast({
            title: '操作过于频繁，请稍后再试',
          });
        default:
          hideLoading();
          showToast({
            title: '上传失败，请重试',
            mask: true,
            icon: 'error',
          });
      }
    }
  };
  const addSticker = (id) => {
    edited = true;
    const targetSticker = AllStickers[templateId][id];

    setFocusItemId(targetSticker!.id);
    setStickers([...stickers, { ...targetSticker!, rotation: 0, x: windowWidth * 0.5, y: 250 }]);
  };
  const removeSticker = (id) => {
    edited = true;
    console.log(id);
    if (id === focusItemId) {
      setFocusItemId(-1);
    }
    setStickers(stickers.filter((i) => i.id !== id));
  };
  const selectTemplate = (id) => {
    if (id !== templateId) {
      if (edited) {
        showTempalteSwitch();
        tempId = id;
      } else {
        setTemplateId(id);
      }
    }
  };
  const confirmSwitch = () => {
    hideTemplateSwitch();
    setTemplateId(tempId);
  };
  const saveToLocal = () => {
    const template: PosterData = JSON.parse(JSON.stringify(Templates[templateId]));

    const photoArr: Photo[] = JSON.parse(JSON.stringify(photos));

    const textArr: TextField[] = JSON.parse(JSON.stringify(texts));

    const stickerArr: Sticker[] = JSON.parse(JSON.stringify(stickers));

    [...photoArr, ...textArr, ...stickerArr].forEach((i) => {
      i.x = viewToPoster(i.x);
      i.y = viewToPoster(i.y);
      i.width = viewToPoster(i.width);
      i.height = viewToPoster(i.height);
    });

    template.photos = photoArr;
    template.textfields = textArr;
    template.stickers = stickerArr;

    Taro.setStorageSync('posterData', template);
  };
  const handleGenerate = async () => {
    showLoading();
    if (photos.some((i) => i.touched)) {
      Taro.showLoading();
      const checkRres = await HideawayService.checkPhotos(photos.filter((i) => i.touched));
      if (!checkRres.every((i) => i.status === 'success')) {
        if (checkRres.some((i) => i.status === 'invalid_content')) {
          showContentError();
        } else if (checkRres.some((i) => i.status === 'in_check')) {
          showContentIncheck();
        }
        hideLoading();
        return setPhotos((ps) => {
          checkRres.forEach((res) => {
            const target = ps.find((i) => i.id === res.id);
            target!.status = res.status;
          });
          return ps;
        });
      }
      setPhotos((ps) => {
        ps.forEach((photo) => {
          photo.status = 'success';
        });
        saveToLocal();
        return ps;
      });
    }
    if (texts.some((i) => i.error)) {
      return showContentError();
    }
    try {
      const { releaseToken, success } = await HideawayService.createPoster(
        Taro.getStorageSync('posterData')
      );
      hideLoading();
      if (success === 'success') {
        goto({ url: `${HIDEAWAY.POSTER_SHARE}?token=${releaseToken}` });
      } else {
        Taro.showToast({
          title: '生成失败，请重试',
          mask: true,
          icon: 'error',
        });
      }
    } catch (error) {
      hideLoading();
      Taro.showToast({
        title: '生成失败，请重试',
        mask: true,
        icon: 'error',
      });
    }
  };
  // console.log(AllStickers['tmp1']);
  return (
    <View className='hideaway-poster'>
      <Navbar transparent={true} holdPlace={false}>
        <Header
          buttonBack
          onClickBack={() => {
            Taro.navigateBack({
              delta: 1,

              fail: () => {
                goto({ url: HIDEAWAY.CITY_MAP, type: 'redirectTo' });
              },
            });
          }}
          title='brand_logo'
        ></Header>
      </Navbar>
      <Image
        style={{ top: NAVBAR_HEIGHT }}
        className='panel-btn'
        mode='widthFix'
        src={PanelBtn}
        onClick={toggleStickerPopup}
      ></Image>
      <MovableArea scaleArea={false} className='move-area'>
        <MovableView
          direction='vertical'
          disabled={focusItemId > 0}
          scale={false}
          onTouchMove={onTouchMove}
          onTouchStart={canvasTouchStart}
          onTouchEnd={canvasTouchEnd}
          style={MoveableSize}
        >
          <View>
            {photos.map((i) => (
              <EditablePhoto
                key={templateId + 'photo' + i.id}
                {...i}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onPhotoClick(i);
                }}
              ></EditablePhoto>
            ))}
          </View>
          <Image className='poster' mode='widthFix' src={Templates[templateId].background}></Image>
          <View>
            {texts.map((i) => (
              <EditableText
                key={templateId + 'text' + i.id}
                {...i}
                onClick={() => onTextClick(i)}
              ></EditableText>
            ))}
          </View>
          <View>
            {stickers.map((i) => (
              <EditableItem
                {...i}
                key={templateId + 'sticker' + i.id}
                active={i.id === focusItemId}
                onTouchStart={onItemTouch}
                onDelete={removeSticker}
              ></EditableItem>
            ))}
          </View>
          <View onClick={handleGenerate} className='next'>
            预览
          </View>
        </MovableView>
      </MovableArea>
      <View>
        {textEditorTarget && (
          <TextEditor
            target={textEditorTarget}
            onConfirm={onTextConfirm}
            onCancel={() => setTextEditorTarget(undefined)}
          ></TextEditor>
        )}
      </View>
      <EditGuide></EditGuide>
      <StickerPopup
        show={stickerPopupFlag}
        selectedTemplate={templateId}
        selectedStickers={stickers.map((i) => i.id)}
        onAddSticker={addSticker}
        onClose={hideStickerPopup}
        onRemoveSticker={removeSticker}
        onSelectTemplate={selectTemplate}
      ></StickerPopup>
      <HideawayPopup onClose={hideTemplateSwitch} show={templateSwitchPopup}>
        <View className='template-switch-popup'>
          <View className='title'>请注意！</View>
          <View className='text'>切换模板将不再保留之前的所有创作</View>
          <View className='pill-button primary' onClick={confirmSwitch}>
            确认
          </View>
        </View>
      </HideawayPopup>
      <HideawayPopup show={contentErrorFlag} onClose={hideContentError}>
        <View className='template-switch-popup'>
          <View className='title'>安全提醒</View>
          <View className='text'>
            <Text>您的编辑含有违法违规内容，{`\n`} 请重新编辑后再进行分享和下载。</Text>
          </View>
          <View className='pill-button primary' onClick={hideContentError}>
            返回编辑
          </View>
        </View>
      </HideawayPopup>
      <HideawayPopup show={contentInCheckFlag} onClose={hideContentIncheck}>
        <View className='template-switch-popup'>
          <View className='title'>图片审核中</View>
          <View className='text'>
            <Text>
              您上传的图片正在审核中，{'\n'}您可以返回继续编辑海报中{'\n'}其他内容或稍后再试。
            </Text>
          </View>
          <View className='pill-button primary' onClick={hideContentIncheck}>
            返回编辑
          </View>
        </View>
      </HideawayPopup>
      <HideawaySharePanel
        giftCount={giftCount}
        receivedCount={receivedCount}
        show={sharePanelFlag}
        onClose={hideSharePanel}
      >
        <View className='ctas'>
          <View
            className={cx('pill-button primary', {
              disabled: giftCount === 0,
            })}
            onClick={() => {
              hideSharePanel();
              goto({ url: `${PAGES.MY_COUPON}?status=${COUPON_STATUS.COLLECTED}` });
            }}
          >
            查看礼券
          </View>
        </View>
      </HideawaySharePanel>
      <PrivacyAuth></PrivacyAuth>
      <Image onClick={showSharePanel} className='btn-plane' src={Plane}></Image>
    </View>
  );
}
