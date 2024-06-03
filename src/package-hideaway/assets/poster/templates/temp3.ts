import { degToRad } from '@hideaway/pages/poster/utils/rotations';
import preview from './3.png';
let stickerId = 0;
const Temp1: PosterData = {
  id: 'temp3',
  preview: preview,
  background: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[2].bg}`,
  desc: '这是模板3 的文字哈哈哈',
  textfields: [
    {
      id: 4,
      content: `享受慢下来的自在旅行\n不用追赶时间，用心感受美景\n静静地品茶赏景，体会生活的诗意\n`,
      limit: 100,
      x: 13 + 134 * 0.5,
      y: 503 + 86 * 0.5,
      width: 134,
      height: 86,
      fontSize: 12,
      fontWeight: 'normal',
      rotation: 0,
      textAlign: 'left',
      color: 'white',
      lineHeight: 16.8,
    },
    {
      id: 6,
      content: '成都松弛之旅\nfresh’s\nPLOG',
      limit: 25,
      x: 311,
      y: 700,
      width: 46,
      height: 50,
      fontSize: 10,
      fontWeight: 'bold',
      rotation: 20.57,
      textAlign: 'left',
      color: 'black',
      lineHeight: 12,
    },
  ],
  photos: [
    {
      id: 1,
      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[2].photo1}`,
      x: 94,
      y: 324,
      width: 158,
      height: 182,
      ratio: '4:5',
      rotation: -10.05,
      touched: false,
      status: 'success',
    },
    {
      id: 2,
      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[2].photo2}`,
      x: 230 + 147 * 0.5,
      y: 219 + 168 * 0.5,
      width: 147,
      height: 168,
      ratio: '4:5',
      rotation: 0,
      touched: false,
      status: 'success',
    },
    {
      id: 3,
      src: `${BUCKET_URL}${HIDEAWAY_ASSETS.templates[2].photo3}`,
      x: 266,
      y: 539,
      width: 208,
      height: 256,
      ratio: '3:4',
      rotation: 0,
      touched: false,
      status: 'success',
    },
  ],
  stickers: [
    {
      id: stickerId++,
      name: 'tc6',
      width: 119,
      height: 59,
      x: 63 + 119 * 0.5,
      y: 152 + 59 * 0.5,
      rotation: degToRad(0),
    },
    {
      id: stickerId++,
      name: 'tcbs (14).png',
      width: 82,
      height: 82,
      x: 285 + 82 * 0.5,
      y: 137 + 82 * 0.5,
      rotation: degToRad(0),
    },
    {
      id: stickerId++,
      name: 'tc9',
      width: 56,
      height: 155.21,
      x: 180 + 56 * 0.5,
      y: 170 + 155 * 0.5,
      rotation: degToRad(0),
    },
    {
      id: stickerId++,
      name: 'tc8',
      width: 83.66,
      height: 100.17,
      x: 10 + 83.66 * 0.5,
      y: 379 + 100.17 * 0.5,
      rotation: degToRad(0),
    },
    {
      id: stickerId++,
      name: 'tc4',
      width: 53,
      height: 57,
      x: 162 + 53 * 0.5,
      y: 377 + 57 * 0.5,
      rotation: degToRad(0),
    },
    {
      id: stickerId++,
      name: 'tc5',
      width: 33,
      height: 59,
      x: 120 + 33 / 2,
      y: 425 + 59 / 2,
      rotation: degToRad(0),
    },
    {
      id: stickerId++,
      name: 'tcbs (22).png',
      width: 127,
      height: 84,
      x: 5 + 127 / 2,
      y: 599 + 84 / 2,
      rotation: degToRad(0),
    },
    {
      id: stickerId++,
      name: 'tc3',
      width: 101,
      height: 65,
      x: 134 + 101 / 2,
      y: 650 + 65 / 2,
      rotation: degToRad(0),
    },
    {
      id: stickerId++,
      name: 'tcbs (16).png',
      width: 61,
      height: 26,
      x: 211 + 61 / 2,
      y: 687 + 26 / 2,
      rotation: degToRad(0),
    },
  ],
};
export default Temp1;
