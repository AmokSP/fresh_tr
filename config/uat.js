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
      shareTitle: '感官逸游 馥已焕新',
      templates: [
        {
          bg: '/uploads/bg1_63530b508b.png',
          photo1: '/uploads/Rectangle_5321_27b98b7384.png',
          photo2: '/uploads/Rectangle_5322_171c6410a5.png',
          photo3: '/uploads/Rectangle_5322_171c6410a5.png',
        },
        {
          bg: '/uploads/bg2_ae6254e92d.png',
          photo1: '/uploads/Rectangle_5321_27b98b7384.png',
          photo2: '/uploads/Rectangle_5321_27b98b7384.png',
          photo3: '/uploads/Rectangle_5321_27b98b7384.png',
        },
      ],
      stickers: {
        sticker1: '/uploads/1_5c77b0ff11.png',
        sticker2: '/uploads/2_35e9238741.png',
        sticker3: '/uploads/3_99e7a2ec2c.png',
        sticker4: '/uploads/4_503a6c5d41.png',
        sticker5: '/uploads/5_8fc1fed79e.png',
        sticker6: '/uploads/6_da3e3ebe70.png',
        sticker7: '/uploads/7_9cb8b514d8.png',
        sticker8: '/uploads/8_7b461f10a6.png',
        sticker9: '/uploads/9_2ec06f5c0b.png',
        sticker10: '/uploads/10_b3eaf9e12f.png',
        sticker11: '/uploads/11_3d0987d94f.png',
        sticker12: '/uploads/12_ac6abe4cdb.png',
        sticker13: '/uploads/13_8c13ca0212.png',
        sticker14: '/uploads/14_15f91add15.png',
        sticker15: '/uploads/15_46a0c698bd.png',
        sticker16: '/uploads/16_de07b59e80.png',
        sticker17: '/uploads/17_ac49c965d1.png',
        sticker18: '/uploads/18_75f98b2c67.png',
        sticker19: '/uploads/19_74985ba876.png',
      },
    }),
  },
  mini: {},
  h5: {},
};
