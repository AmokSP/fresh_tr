import { degToRad } from '@hideaway/pages/poster/utils/rotations';
import preview from './3.png';
import AllStickers from '../stickers';
const Temp1: PosterData = {
  id: 3,
  preview: preview,
  background: 'https://develop-env.valtech.com.cn/freshcms/uploads/bg1_2d6990422c.png',
  desc: '这是模板3 的文字哈哈哈',
  textfields: [
    {
      id: 3,
      content: '这是测试字体',
      limit: 100,
      x: 20,
      y: 300,
      width: 65,
      height: 28,
      fontSize: 48,
      fontWeight: 'bold',
      rotation: 10,
      textAlign: 'left',
      color: 'white',
    },
  ],
  photos: [
    {
      id: 2,
      src: 'https://ts1.cn.mm.bing.net/th/id/R-C.16772d9f53053d1b4fd634ef849748c2?rik=A%2fLly4dMRIWEQw&riu=http%3a%2f%2fnwzimg.wezhan.cn%2fcontents%2fsitefiles2002%2f10013195%2fimages%2f16873206.jpg&ehk=DWYUFHkCG2JhZx59eiTodVI8cRoZUISDCrsEWsrjO8U%3d&risl=&pid=ImgRaw&r=0',

      x: 300,
      y: 335,
      width: 123,
      height: 123,
      rotation: -10,
    },
  ],
  stickers: [
    {
      ...AllStickers[1],
      width: 78,
      height: 78,
      x: 240,
      y: 530,
      rotation: degToRad(-10),
    },
    {
      ...AllStickers[3],
      width: 78,
      height: 78,
      x: 24,
      y: 53,
      rotation: degToRad(-10),
    },
  ],
};
export default Temp1;
