module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {
    TRANSLATE_API: 'true',
    ENABLE_LANG: 'true',

    // API_URL: "'https://develop-env.valtech.com.cn/freshtruat'",
    // CMS_API_URL: "'https://develop-env.valtech.com.cn:8443/api'",
    // CMS_TOKEN:
    //   "'627e458428078b4b35ce7d66b68031ba78ef47554c5dab1c5ec08490c46358af4130a2c9b0f7fcaec82824fcbad82d02303e817a77ce060c2573f5900f5fba20bc2fefcb1e9fd1589e3de2d6ddad64cd79c6f6635bea25b21ff82da79ba6ffc036c60c4f55ad0dd4c5d1d792a93227a9671d2dc201de06cfdb70024521ceb3bd'",
    // BUCKET_URL: "'https://develop-env.valtech.com.cn/freshcmsuat'",
    // CMS_URL: "'https://develop-env.valtech.com.cn:8443'",

    API_URL: "'https://tr-mp-uat.fresh-cn.com/backend'",
    CMS_API_URL: "'https://tr-mp-uat.fresh-cn.com/api'",
    CMS_TOKEN:
      "'d50f11122231874bc1106b6b42662153f1c3c87f31907162074ee3e54eb6ff99d69c2ae69b28987217bf9c18be4c7e964d4c868a44f47b466e336dc93ee6069094085ed36c7e926a5624a347a95192a2a2a2911c8da54eddf72d48c1282b89298140c73e889eb98130eb6787e78ac2d17621cf8eddaa1fdc4dc66a4f857d468a'",
    BUCKET_URL: "'https://tr-cdn-uat.fresh-cn.com'",
    CMS_URL: "'https://tr-cdn-uat.fresh-cn.com'",
    TASK_URL: "'https://wz-api.todreamer.com'",
    SHARE_IMAGE: "'https://tr-cdn.fresh-cn.com/uploads/mnp_9211ca1a36.jpg'",
    ENV_VERSION: "'trial'",

    // API_URL: "'https://tr-mp.fresh-cn.com/backend'",
    // CMS_API_URL: "'https://tr-mp.fresh-cn.com/api'",
    // CMS_TOKEN:
    //   "'b1696e4508f08f507ab2b68bbdf567cc538c8564dc9d26fcd1346744ec6fa59a7f1a007ee3740df53326e84a42f5d86fbb123109077e7256b90bf92fae85a9c713d4ef58ebc5fac19b599600913c1ba5cfeed3f607c476e6b4e9e6dd5bb3a8462b005e9f6a241692bcd8fec16730357db349c537886cd9facd9585d13dbc4725'",
    // BUCKET_URL: "'https://tr-cdn.fresh-cn.com'",
    // CMS_URL: "'https://tr-cdn.fresh-cn.com'",
    // TASK_URL: "'https://wz-api.todreamer.com'",
    // SHARE_IMAGE: "'https://tr-cdn.fresh-cn.com/uploads/mnp_9211ca1a36.jpg'",
    // ENV_VERSION: "'release'",

    TRACKING: JSON.stringify({
      gio: {
        dataSourceId: '98632e70b9958ea9',
      },
    }),

    DEFAULT_LOCATION: JSON.stringify({
      LNG: '109.75065',
      LAT: '18.37201',
    }),
    H5_CAMPAIGN: JSON.stringify({
      cnyar: 'https://tr-game.fresh-cn.com/cnyar2024/',
      argarden: 'https://tr-game-uat.fresh-cn.com/argarden2024/',
      // argarden: 'https://develop-env.valtech.com.cn/argarden2024/',
      // argarden: 'https://amoksp.fun/argarden2024/',
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
