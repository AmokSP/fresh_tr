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
      campaignQrCode: '',
      shareTitle: '感官逸游 馥已焕新',
      templates: [
        {
          bg: '/uploads/bg1_2d6990422c.png',
          photo1: '/uploads/Mask_group_6_417b8839df.png',
          photo2: '/uploads/Mask_group_3_0ed1f36e0b.png',
          photo3: '/uploads/Mask_group_2e05abf259.png',
        },
        {
          bg: '/uploads/bg2_64299e7ee2.png',
          photo1: '/uploads/Mask_group_1_3183d46ed9.png',
          photo2: '/uploads/Mask_group_7_8fc666496a.png',
          photo3: '/uploads/Mask_group_4_6314554f34.png',
        },
        {
          bg: '/uploads/20240513150044_213f27b722.png',
          photo1: '/uploads/Mask_group_2_a7cd699f4f.png',
          photo2: '/uploads/Mask_group_8_d5773d1b6e.png',
          photo3: '/uploads/Mask_group_5_8269f75bd7.png',
        },
      ],
    }),
  },
  mini: {},
  h5: {},
};
