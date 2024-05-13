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
      shareTitle: '感官逸游 馥已焕新',
      templates: [
        {
          bg: '/uploads/bg1_2d6990422c.png',
          photo1: '/uploads/Rectangle_5321_db9ea8c02d.png',
          photo2: '/uploads/Rectangle_5322_c7cd8fac15.png',
          photo3: '/uploads/Rectangle_5322_c7cd8fac15.png',
        },
        {
          bg: '/uploads/bg2_64299e7ee2.png',
          photo1: '/uploads/Rectangle_5321_db9ea8c02d.png',
          photo2: '/uploads/Rectangle_5322_c7cd8fac15.png',
          photo3: '/uploads/Rectangle_5322_c7cd8fac15.png',
        },
        {
          bg: '/uploads/20240513150044_213f27b722.png',
          photo1: '/uploads/Rectangle_5321_db9ea8c02d.png',
          photo2: '/uploads/Rectangle_5322_c7cd8fac15.png',
          photo3: '/uploads/Rectangle_5322_c7cd8fac15.png',
        },
      ],
      stickers: {
        sticker1: '/uploads/1_70d9eaae45.png',
        sticker2: '/uploads/2_0e58348f14.png',
        sticker3: '/uploads/3_96af641c16.png',
        sticker4: '/uploads/4_6b62418b0f.png',
        sticker5: '/uploads/5_de83439451.png',
        sticker6: '/uploads/6_6518aa51e0.png',
        sticker7: '/uploads/7_9a738502fd.png',
        sticker8: '/uploads/8_da6f82ea9b.png',
        sticker9: '/uploads/9_c0b21459f2.png',
        sticker10: '/uploads/10_e8043bbe97.png',
        sticker11: '/uploads/11_86a8deee61.png',
        sticker12: '/uploads/12_73069327a5.png',
        sticker13: '/uploads/13_32ddcdf761.png',
        sticker14: '/uploads/14_dea407ce3e.png',
        sticker15: '/uploads/15_0af6fdf0c2.png',
        sticker16: '/uploads/16_c6155f668a.png',
        sticker17: '/uploads/17_ab7d2012fd.png',
        sticker18: '/uploads/18_5875a93dde.png',
        sticker19: '/uploads/19_0367aca1db.png',
      },
      stories: [
        {
          video:
            'http://tr-media-cdn.fresh-cn.com/f0c618ee0c2171efbfea5017e1e90102/39aa383261874230ae078436ff993357.m3u8',
        },
      ],
    }),
  },
  mini: {},
  h5: {},
};
