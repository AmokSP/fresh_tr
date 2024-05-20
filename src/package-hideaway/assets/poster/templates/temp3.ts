import { degToRad } from '@hideaway/pages/poster/utils/rotations';
import preview from './3.png';
import AllStickers from '../stickers';
const Temp1: PosterData = {
  id: 'tmp3',
  preview: preview,
  background: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[2].bg}`,
  desc: '这是模板3 的文字哈哈哈',
  textfields: [
    {
      id: 1,
      content: '等风来，不如出发去有风的地方',
      limit: 15,
      x: 93,
      y: 221,
      width: 72,
      height: 30,
      fontSize: 10,
      fontWeight: 'normal',
      rotation: 0,
      textAlign: 'left',
      color: 'black',
      lineHeight: 14,
    },

    {
      id: 2,
      content: `在微风轻拂的季节里，享受旅途的美景
        我喜欢旅行中带上爱用好物Fresh\nBlack Tea
        让我在旅途中也可以保持肌肤活力好状态
        用相机记录每时每刻的精彩`,
      limit: 100,
      x: 211,
      y: 255,
      width: 72,
      height: 122,
      fontSize: 8,
      fontWeight: 'normal',
      rotation: 0,
      textAlign: 'left',
      color: 'black',
      lineHeight: 11,
    },
    {
      id: 3,
      content: `理想的生活需要热爱和心动
        试着倾听河谷里的回响，赴一场与大自然的约会
        拥抱蓝天白云，治愈时间治愈自己`,
      limit: 70,
      x: 306,
      y: 408,
      width: 100,
      height: 53,
      fontSize: 8,
      fontWeight: 'normal',
      rotation: 0,
      textAlign: 'left',
      color: 'black',
      lineHeight: 11,
    },
    {
      id: 4,
      content: `享受慢下来的自在旅行
        不用追赶时间，用心感受美景
        “行到山穷水尽处，坐看风气云卷时”
        静静地品茶赏景，体会生活的诗意
        `,
      limit: 100,
      x: 86,
      y: 586,
      width: 128,
      height: 54,
      fontSize: 8,
      fontWeight: 'normal',
      rotation: 0,
      textAlign: 'left',
      color: 'white',
      lineHeight: 11,
    },
    {
      id: 5,
      content: `Sensorial\nHideaway`,
      limit: 20,
      x: 86,
      y: 533,
      width: 128,
      height: 37,
      fontSize: 16,
      fontWeight: '600',
      rotation: 0,
      textAlign: 'left',
      color: 'white',
      lineHeight: 16,
    },
    {
      id: 6,
      content: '你分享的\ncitywalk\nby: fresh',
      limit: 25,
      x: 310,
      y: 748,
      width: 59,
      height: 45,
      fontSize: 13,
      fontWeight: 'bold',
      rotation: 26.52,
      textAlign: 'left',
      color: 'black',
      lineHeight: 15,
    },
  ],
  photos: [
    {
      id: 1,
      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[2].photo1}`,
      x: 96,
      y: 332,
      width: 147,
      height: 170,
      ratio: '4:5',
      rotation: -10.05,
      touched: false,
      status: 'success',
    },
    {
      id: 2,
      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[2].photo2}`,
      x: 316,
      y: 298,
      width: 116,
      height: 134,
      ratio: '4:5',
      rotation: 0,
      touched: false,
      status: 'success',
    },
    {
      id: 3,
      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[2].photo3}`,
      x: 276,
      y: 576,
      width: 199,
      height: 266,
      ratio: '3:4',
      rotation: 0,
      touched: false,
      status: 'success',
    },
  ],
  stickers: [
    {
      ...AllStickers.tmp3[1],
      width: 103,
      height: 130,
      x: 263,
      y: 124,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp3[0],
      width: 26,
      height: 26,
      x: 140,
      y: 179,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp3[8],
      width: 37,
      height: 104,
      x: 243,
      y: 363,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp3[3],
      width: 53,
      height: 57,
      x: 191,
      y: 407,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp3[7],
      width: 84,
      height: 100,
      x: 53,
      y: 431,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp3[4],
      width: 33,
      height: 59,
      x: 136,
      y: 456,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp3[5],
      width: 134,
      height: 66,
      x: 88,
      y: 680,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp3[2],
      width: 101,
      height: 73,
      x: 171,
      y: 691,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp3[6],
      width: 103,
      height: 42,
      x: 318,
      y: 211,
      rotation: degToRad(0),
    },
  ],
};
export default Temp1;
