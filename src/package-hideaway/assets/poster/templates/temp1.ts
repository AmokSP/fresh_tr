import { degToRad } from '@hideaway/pages/poster/utils/rotations';
import preview from './1.png';
import AllStickers from '../stickers';
const Temp1: PosterData = {
  id: 'tmp1',
  preview: preview,
  background: 'https://develop-env.valtech.com.cn/freshcms/uploads/bg1_2d6990422c.png',
  desc: '这是模板1的文字',
  textfields: [
    {
      id: 1,
      content: `仓木繁叶将热烈与喧嚣阻挡\n无数生命在此蔓延生长\n青苔在寂静、潮湿的空气中\n为大地盛开一片柔软湿凉\n微小又顽强的力量`,
      limit: 60,
      x: 78,
      y: 518,
      width: 84,
      height: 75,
      fontSize: 7,
      fontWeight: 'normal',
      lineHeight: 15,
      rotation: 8.44,
      textAlign: 'center',
      color: '#292726',
    },
    {
      id: 2,
      content: `一路走来都是绿色的风景`,
      limit: 11,
      x: 219,
      y: 305,
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
      content: `仓木繁叶将热烈与喧嚣阻挡\n无数生命在此蔓延生长`,
      limit: 24,
      x: 205,
      y: 490,
      width: 84,
      height: 20,
      fontSize: 7,
      fontWeight: 'normal',
      lineHeight: 10,
      rotation: -0.94,
      textAlign: 'center',
      color: '#292726',
    },
    {
      id: 4,
      content: `仓木繁叶将热烈与喧嚣阻挡\n无数生命在此蔓延生长`,
      limit: 24,
      x: 90,
      y: 666,
      width: 84,
      height: 70,
      fontSize: 7,
      fontWeight: 'normal',
      lineHeight: 12,
      rotation: 0,
      textAlign: 'center',
      color: '#292726',
    },
    {
      id: 5,
      content: `我们有多久没有和大自然拥抱啦！`,
      limit: 15,
      x: 352,
      y: 570,
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
      content: `小闲即欢 小清即静`,
      limit: 15,
      x: 250,
      y: 651,
      width: 70,
      height: 28,
      fontSize: 7,
      fontWeight: 'normal',
      lineHeight: 9,
      rotation: -4.58,
      textAlign: 'center',
      color: '#292726',
    },
    {
      id: 7,
      content: `你分享的城市？\nby: fresh`,
      limit: 24,
      x: 296,
      y: 712,
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
      src: 'https://develop-env.valtech.com.cn/freshcms/uploads/Rectangle_5321_db9ea8c02d.png',

      x: 294,
      y: 382,
      width: 128,
      height: 128,
      rotation: 12,
    },
    {
      id: 2,
      src: 'https://develop-env.valtech.com.cn/freshcms/uploads/Rectangle_5322_c7cd8fac15.png',

      x: 251,
      y: 575,
      width: 100,
      height: 108,
      rotation: -4.58,
    },
    {
      id: 3,
      src: 'https://develop-env.valtech.com.cn/freshcms/uploads/Rectangle_5322_c7cd8fac15.png',

      x: 59,
      y: 235,
      width: 123,
      height: 123,
      rotation: 9.8,
    },
  ],

  stickers: [
    {
      ...AllStickers[1],
      width: 256 / 3,
      height: 136 / 3,
      x: 110,
      y: 230,
      rotation: degToRad(-10),
    },
  ],
};
export default Temp1;
