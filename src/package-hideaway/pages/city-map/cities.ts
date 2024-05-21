import city0 from '@hideaway/assets/city0.svg';
import city1 from '@hideaway/assets/city1.svg';
import city2 from '@hideaway/assets/city2.svg';

import hz1 from '@hideaway/assets/kol-hz1.jpg';
import hz2 from '@hideaway/assets/kol-hz2.jpg';
import cd1 from '@hideaway/assets/kol-cd1.jpg';
import cd2 from '@hideaway/assets/kol-cd1.jpg';
import yn1 from '@hideaway/assets/kol-yn1.jpg';
import yn2 from '@hideaway/assets/kol-yn2.jpg';
export default [
  {
    title: city2,
    left: 310 * 2,
    top: 50 * 2,
    // 杭州
    story: [
      {
        text: '逃离城市喧嚣，和我一起探寻杭州茶饮文化之旅',
        image: hz1,
        slug: 'hangzhou1',
      },
      {
        text: '让心灵去旅行，逸游杭州山水，开启茶香漫旅',
        image: hz2,
        slug: 'hangzhou2',
      },
    ],
  },
  {
    title: city1,
    left: 144 * 2,
    top: 14 * 2,
    //cd
    story: [
      {
        text: '漫游安逸成都，悠享巴适慢生活',
        image: cd1,
        slug: 'chengdu1',
      },
      {
        text: '成都古镇踏青采茶，逸游自然野趣生机',

        image: cd2,
        slug: 'chengdu2',
      },
    ],
  },
  {
    title: city0,
    left: 10 * 2,
    top: 64 * 2,
    //yn
    story: [
      {
        text: '置身云南世外桃源，探寻千年古茶树的生命力',
        image: yn1,
        slug: 'yunnan1',
      },
      {
        text: '与大理不期而遇，拥抱山海和自由',
        image: yn2,
        slug: 'yunnan2',
      },
    ],
  },
];
