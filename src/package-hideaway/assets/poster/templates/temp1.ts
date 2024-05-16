import { degToRad } from '@hideaway/pages/poster/utils/rotations';
import preview from './1.png';
import AllStickers from '../stickers';
const Temp1: PosterData = {
  id: 'tmp1',
  preview: preview,
  background: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[0].bg}`,
  desc: '这是模板1的文字',
  textfields: [
    {
      id: 2,
      content: `这里收藏小众兴趣\n也把青春的热爱释放\n伴着微风饮一壶清茶\n感受慢节奏的烟火人间`,
      limit: 50,
      x: 78,
      y: 478,
      width: 86,
      height: 75,
      fontSize: 7,
      fontWeight: 'normal',
      lineHeight: 15,
      rotation: 8.44,
      textAlign: 'center',
      color: '#292726',
    },
    {
      id: 1,
      content: `逸游茶境 赏景悦己`,
      limit: 10,
      x: 220,
      y: 266,
      width: 90,
      height: 18,
      fontSize: 8,
      fontWeight: 'normal',
      lineHeight: 15,
      rotation: -5.64,
      textAlign: 'center',
      color: '#000000',
    },
    {
      id: 3,
      content: `出发永远比向往有意义\n享受闲适优雅的慢生活`,
      limit: 30,
      x: 184,
      y: 471,
      width: 86,
      height: 20,
      fontSize: 7,
      fontWeight: 'normal',
      lineHeight: 10,
      rotation: -0.94,
      textAlign: 'left',
      color: '#292726',
    },
    {
      id: 5,
      content: `从繁忙的生活中抽离\n给自然来个大大拥抱\n唤醒肌肤光彩活力\n享受旅途美好时光`,
      limit: 50,
      x: 93,
      y: 645,
      width: 86,
      height: 70,
      fontSize: 7,
      fontWeight: 'normal',
      lineHeight: 12,
      rotation: 0,
      textAlign: 'center',
      color: '#292726',
    },
    {
      id: 4,
      content: `漫游街头小巷，\n走走停停`,
      limit: 15,
      x: 349,
      y: 529,
      width: 26,
      height: 72,
      fontSize: 7,
      fontWeight: 'normal',
      lineHeight: 9,
      rotation: 0,
      textAlign: 'left',
      color: '#292726',
    },
    {
      id: 6,
      content: `感官逸游，治愈身心`,
      limit: 10,
      x: 259,
      y: 628,
      width: 80,
      height: 28,
      fontSize: 7,
      fontWeight: 'normal',
      lineHeight: 9,
      rotation: -4.58,
      textAlign: 'left',
      color: '#292726',
    },
    {
      id: 7,
      content: `你分享的citywalk\nby: fresh`,
      limit: 25,
      x: 298,
      y: 690,
      width: 98,
      height: 32,
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 18,
      rotation: -6.83,
      textAlign: 'left',
      color: '#292726',
    },
  ],
  photos: [
    {
      id: 1,
      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[0].photo1}`,

      x: 298,
      y: 364,
      width: 128,
      height: 128,
      rotation: 12,
      touched: false,
      status: 'success',
    },
    {
      id: 2,

      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[0].photo2}`,
      x: 255,
      y: 554,
      width: 100,
      height: 108,
      rotation: -4.58,
      touched: false,
      // status: 'invalid_content',
      status: 'success',
    },
    {
      id: 3,
      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[0].photo3}`,

      x: 59,
      y: 193,
      width: 123,
      height: 123,
      rotation: 9.8,
      touched: false,
      // status: 'in_check',
      status: 'success',
    },
  ],

  stickers: [
    {
      ...AllStickers.tmp1[12],
      width: 92,
      height: 49,
      x: 179,
      y: 131,
      rotation: 0,
      // rotation: degToRad(-10),
    },

    {
      ...AllStickers.tmp1[5],
      width: 69,
      height: 72,
      x: 238,
      y: 203,
      rotation: 0,
      // rotation: degToRad(-10),
    },
    {
      ...AllStickers.tmp1[10],
      width: 33,
      height: 28,
      x: 356,
      y: 183,
      rotation: degToRad(-22.3),
    },

    {
      ...AllStickers.tmp1[4],
      width: 57,
      height: 89,
      x: 341,
      y: 241,
      rotation: 0,
    },

    {
      ...AllStickers.tmp1[2],
      width: 76,
      height: 95,
      x: 91,
      y: 308,
      rotation: 0,
    },

    {
      ...AllStickers.tmp1[11],
      width: 120,
      height: 105,
      x: 151,
      y: 391,
      rotation: 0,
    },

    {
      ...AllStickers.tmp1[3],
      width: 85,
      height: 102,
      x: 37,
      y: 398,
      rotation: 0,
    },
    {
      ...AllStickers.tmp1[0],
      width: 92,
      height: 73,
      x: 150,
      y: 559,
      rotation: 0,
    },

    {
      ...AllStickers.tmp1[8],
      width: 75,
      height: 42,
      x: 311,
      y: 451,
      rotation: 0,
    },

    {
      ...AllStickers.tmp1[6],
      width: 24,
      height: 26,
      x: 31,
      y: 623,
      rotation: degToRad(9.33),
    },
    {
      ...AllStickers.tmp1[9],
      width: 35,
      height: 46,
      x: 29,
      y: 668,
      rotation: degToRad(-12),
    },

    {
      ...AllStickers.tmp1[13],
      width: 60,
      height: 29,
      x: 196,
      y: 434,
      rotation: degToRad(-9.33),
    },

    {
      ...AllStickers.tmp1[1],
      width: 63,
      height: 56,
      x: 212,
      y: 690,
      rotation: degToRad(-6.83),
    },
    {
      ...AllStickers.tmp1[7],
      width: 68,
      height: 68,
      x: 43,
      y: 111,
      rotation: 0,
    },
  ],
};
export default Temp1;
