module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {
    TRANSLATE_API: 'true',
    ENABLE_LANG: 'true',

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
      campaignQrCode: '/uploads/freshqr_465001d3a9.png',
      shareTitle: '感官逸游 馥已焕新',
      templates: [
        {
          bg: '/uploads/1_1_99fe7ebef7.png',
          photo1: '/uploads/Mask_group_6_9e68c19185.jpg',
          photo2: '/uploads/Mask_group_3_1b458d0d9d.jpg',
          photo3: '/uploads/Mask_group_10b1e5dfb4.jpg',
        },
        {
          bg: '/uploads/2_cc9eba19fb.png',
          photo1: '/uploads/Mask_group_1_ee76ed0378.jpg',
          photo2: '/uploads/Mask_group_7_415c88f094.jpg',
          photo3: '/uploads/Mask_group_4_9160c96d17.jpg',
          photo4: '/uploads/mp4_00_00_02_06_1_40cfd648e7.png',
        },
        {
          bg: '/uploads/3_a151fe5041.png',
          photo1: '/uploads/Mask_group_2_4468b2569c.jpg',
          photo2: '/uploads/Mask_group_1_05c5ff260e.jpg',
          photo3: '/uploads/Mask_group_c1ea166f38.jpg',
        },
      ],
    }),
  },
  mini: {},
  h5: {},
};
