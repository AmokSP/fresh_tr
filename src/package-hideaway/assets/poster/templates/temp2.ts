import { degToRad } from '@hideaway/pages/poster/utils/rotations';
import preview from './2.png';
import AllStickers from '../stickers';
const Temp1: PosterData = {
  id: 'tmp2',
  preview: preview,
  background: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[1].bg}`,
  desc: '这是模板2 的文字',
  textfields: [
    {
      id: 1,
      content: `逸游茶境 赏景悦己\n旅行的意义是沉浸美景之中\n与更美好的自己不期而遇`,
      limit: 40,
      x: 87,
      y: 334,
      width: 134,
      height: 50,
      fontSize: 11,
      fontWeight: 'normal',
      rotation: 0,
      textAlign: 'left',
      color: '#323D47',
      lineHeight: 16,
    },
    {
      id: 2,
      content: `享受旅途中的悠然惬意\n和每一棵树握手，和每一株草私语\n方知宇宙浩瀚，自然可畏`,
      limit: 45,
      x: 92,
      y: 424,
      width: 140,
      height: 60,
      fontSize: 9,
      fontWeight: '300',
      rotation: 0,
      textAlign: 'left',
      lineHeight: 15,
      color: '#292726',
    },
    {
      id: 3,
      content: `漫游古镇，小桥流水\n手捧一杯热茶，享受安逸时光\n在风光旖旎的风景中，感受生活的美好向往`,
      limit: 50,
      x: 315,
      y: 560,
      width: 100,
      height: 85,
      fontSize: 10,
      lineHeight: 14,
      fontWeight: '300',
      rotation: 0,
      textAlign: 'left',
      color: '#000',
    },
    {
      id: 4,
      content: '你分享的\ncitywalk\nby: fresh',
      limit: 25,
      x: 300,
      y: 714,
      width: 72,
      height: 41,
      fontSize: 12,
      lineHeight: 14,
      fontWeight: '600',
      rotation: 12,
      textAlign: 'left',
      color: '#292726',
    },
  ],
  photos: [
    {
      id: 1,
      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[1].photo1}`,

      x: 291,
      y: 326,
      width: 134,
      height: 100,
      ratio: '5:4',
      rotation: 7,
      touched: false,
      status: 'success',
    },
    {
      id: 2,
      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[1].photo2}`,

      x: 276,
      y: 446,
      width: 134,
      height: 100,
      ratio: '5:4',
      rotation: 7,
      touched: false,
      status: 'success',
    },
    {
      id: 3,
      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[1].photo3}`,

      x: 121,
      y: 576,
      width: 231,
      ratio: '4:3',
      height: 157,
      rotation: -1.44,
      touched: false,
      status: 'success',
    },
  ],
  stickers: [
    {
      ...AllStickers.tmp2[4],
      width: 196,
      height: 23,
      x: 111,
      y: 111,
      rotation: degToRad(-2.03),
    },
    {
      ...AllStickers.tmp2[0],
      width: 110,
      height: 74,
      x: 306,
      y: 231,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp2[1],
      width: 67,
      height: 49,
      x: 175,
      y: 286,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp2[6],
      width: 157,
      height: 43,
      x: 88,
      y: 381,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp2[3],
      width: 52,
      height: 34,
      x: 221,
      y: 341,
      rotation: degToRad(0),
    },
    {
      ...AllStickers.tmp2[5],
      width: 124,
      height: 27,
      x: 139,
      y: 469,
      rotation: degToRad(-7.8),
    },
    {
      ...AllStickers.tmp2[7],
      width: 64,
      height: 40,
      x: 213,
      y: 628,
      rotation: degToRad(17.8),
    },
    {
      ...AllStickers.tmp2[2],
      width: 74,
      height: 44,
      x: 65,
      y: 674,
      rotation: degToRad(-5.57),
    },
  ],
};
export default Temp1;
