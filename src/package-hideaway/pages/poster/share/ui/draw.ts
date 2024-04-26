import Taro, { useLoad, useShareAppMessage } from '@tarojs/taro';
import { POSTER_HEIGHT, POSTER_WIDTH } from '../../utils/scale';
import { degToRad } from '../../utils/rotations';
import { drawImage } from '../../utils/drawImageToCanvas';
import { fillTextarea } from '../../utils/fillTextarea';
import Templates from '@hideaway/assets/poster/templates';
const dpr = Math.max(Taro.getWindowInfo().pixelRatio, 3);
export async function drawPoster(posterData: PosterData) {
  return new Promise<string>(async (resolve, reject) => {
    const canvas: any = Taro.createOffscreenCanvas({
      type: '2d',
      width: POSTER_WIDTH * dpr,
      height: POSTER_HEIGHT * dpr,
    });
    const context: any = canvas.getContext('2d');

    context.scale(dpr, dpr);

    for (const item of posterData.photos) {
      context.save();
      context.translate(item.x, item.y);
      context.rotate(degToRad(item.rotation));
      try {
        console.warn('drawing',item.id)
        await drawImage({
          canvas,
          url: item.src,
          x: 0 - item.width / 2,
          y: 0 - item.height / 2,
          width: item.width,
          height: item.height,
          mode: 'aspectFill',
        });
      } catch (e) {
        console.error('PHOTO ERROR');
        reject('photo error');
      }
      context.restore();
    }
    try {
      await drawImage({
        canvas,
        url: Templates[posterData.id].background,
        x: 0,
        y: 0,
        width: POSTER_WIDTH,
        height: POSTER_HEIGHT,
      });
    } catch (e) {
      console.error('bg error');
      reject('bg error');
    }
    for (const item of posterData.textfields) {
      context.save();
      context.translate(item.x, item.y);
      context.rotate(degToRad(item.rotation));

      context.font = `${item.fontWeight} ${item.fontSize}px PingFang SC`;
      context.textBaseline = 'top';
      context.fillStyle = item.color;
      fillTextarea({
        canvas: canvas,
        content: item.content,
        x: 0 - item.width * 0.5,
        y: 0 - item.height * 0.5 + item.fontSize * 0.3,
        width: item.width,
        height: 0,
        textAlign: item.textAlign,
        lineHeight: item.lineHeight ?? item.fontSize * 1.5,
      });
      context.restore();
    }
    for (const item of posterData.stickers) {
      context.save();
      context.translate(item.x, item.y);
      context.rotate(item.rotation);
      try {
        await drawImage({
          canvas,
          url: item.src,
          x: 0 - item.width / 2,
          y: 0 - item.height / 2,
          width: item.width,
          height: item.height,
        });
      } catch (e) {
        console.error('sticker');
        reject('sticker error');
      }
      context.restore();
    }

    try {
      const data = canvas.toDataURL();
      resolve(data);
    } catch (error) {
      console.error('saving temp');
      reject('saving temp error');
    }
  });
}

export async function drawSaveImage(url: string, title: string) {
  const canvas: any = Taro.createOffscreenCanvas({
    type: '2d',
    width: 314 * dpr,
    height: 700 * dpr,
  });
  const context: any = canvas.getContext('2d');

  context.scale(dpr, dpr);
  context.fillStyle = '#fff';
  context.fillRect(0, 0, 314, 700);

  await drawImage({
    canvas,
    url: url,
    x: 8,
    y: 11,
    width: 298,
    height: 587,
    mode: 'aspectFill',
  });
  context.fillStyle = '#323d47';
  context.font = `500 18px PingFang SC`;
  context.textBaseline = 'top';
  fillTextarea({
    canvas: canvas,
    content: title,
    x: 13,
    y: 629,
    width: 160,
    height: 22,
    lineHeight: 21,
  });
  context.font = `300 12px PingFang SC`;
  context.textBaseline = 'top';
  fillTextarea({
    canvas: canvas,
    content: '扫码制作海报分享好友获得优惠券',
    x: 13,
    y: 656,
    width: 185,
    height: 22,
    lineHeight: 21,
  });

  const data = canvas.toDataURL();
  let temp = `${Taro.env.USER_DATA_PATH}/temp_save.png`;
  Taro.getFileSystemManager().writeFileSync(temp, data.slice(22), 'base64');
  return temp;
}
