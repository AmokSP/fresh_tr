module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {
    TRANSLATE_API: 'true',
    ENABLE_LANG: 'true',
    API_URL: "'https://develop-env.valtech.com.cn/freshtrBackend'",
    CMS_API_URL: "'https://develop-env.valtech.com.cn/freshcms/api'",
    CMS_TOKEN:
      "'3af0e1d4c97ff5811eee7d2f3ee456e990c868a6cf8cb164de4c688cf6f2ed516b7ef23c85c1ef051a2afebb174816badb10795340310ad13299d3b92993449a22d9f0b829d363e8d348ef559004441ee9314a61662984bb600f5122765c514d95cd8b9413ac64609fddd9cd188dc13a7e6d4ec84412dc4277990fd48f2c6440'",
    BUCKET_URL: "'https://develop-env.valtech.com.cn/freshcms'",
    CMS_URL: "'https://develop-env.valtech.com.cn/freshcms'",
    TASK_URL: "'https://wz-api-test.todreamer.com'",
    SHARE_IMAGE: "'https://tr-cdn-uat.fresh-cn.com/uploads/mnp_e8de521d07.jpg'",
    ENV_VERSION: "'trial'",

    TRACKING: JSON.stringify({
      gio: {
        dataSourceId: '8bba6f312f66cbd8',
      },
    }),
    DEFAULT_LOCATION: JSON.stringify({
      LNG: '109.75065',
      LAT: '18.37201',
    }),
    H5_CAMPAIGN: JSON.stringify({
      cnyar: 'https://tr-game.fresh-cn.com/cnyar2024/',
      argarden: 'https://develop-env.valtech.com.cn/argarden2024/',
    }),
    HIDEAWAY_ASSETS: JSON.stringify({
      book: {
        cover: 'https://develop-env.valtech.com.cn/freshcms/uploads/cover_68df9288e8.png',
        back: 'https://develop-env.valtech.com.cn/freshcms/uploads/back_7d6982bfb5.png',
        pages: [
          {
            bg: 'https://develop-env.valtech.com.cn/freshcms/uploads/bg_da316590ad.png',
            layer1: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer1_408a76cba9.png',
            layer2: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer2_040a9e2ea3.png',
            layer3: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer3_847adc1bb1.png',
            layer4: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer4_18a365b1a7.png',
            layer5: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer5_bb9709632c.png',
          },
          {
            bg: 'https://develop-env.valtech.com.cn/freshcms/uploads/bg_8b05dc848a.png',
            layer1: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer1_939a116d54.png',
            layer2: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer2_347d780661.png',
            layer3: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer3_c5be7927c1.png',
            layer4: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer4_ae97a40174.png',
            layer5: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer5_5728f469b5.png',
          },
          {
            bg: 'https://develop-env.valtech.com.cn/freshcms/uploads/bg_9c9f748a2a.png',
            layer1: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer1_8962a53b8b.png',
            layer2: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer2_135b772e45.png',
            layer3: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer3_c7302313c8.png',
            layer4: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer4_bb9d8b1866.png',
            layer5: 'https://develop-env.valtech.com.cn/freshcms/uploads/layer5_f75d8e4700.png',
          },
        ],
      },
    }),
  },
  mini: {},
  h5: {},
};
