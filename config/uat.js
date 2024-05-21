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
          bg: '/uploads/bg11_c953a4a1e6.png',
          photo1: '/uploads/Mask_group_6_9e68c19185.jpg',
          photo2: '/uploads/Mask_group_3_1b458d0d9d.jpg',
          photo3: '/uploads/Mask_group_10b1e5dfb4.jpg',
          // stickers: [
          //   '/uploads/Group_48007_66727223fd.png',
          //   '/uploads/Heart_Print030_1_8357743d1f.png',
          //   '/uploads/image_400_9b1c616946.png',
          //   '/uploads/Group_48004_f5c7cae0a0.png',
          //   '/uploads/Mask_group_b44a978929.png',
          //   '/uploads/Mask_group_2_ce863784f2.png',
          //   '/uploads/image_596_3a8785865c.png',
          //   '/uploads/Group_48006_3307827b70.png',
          //   '/uploads/Group_48020_aac31a5df6.png',
          //   '/uploads/Mask_group_1_feca089a4b.png',
          //   '/uploads/image_373_7c52ccfb5e.png',
          //   '/uploads/Group_48012_a0ccce0efc.png',
          //   '/uploads/image_572_6e02ec3dc4.png',
          //   '/uploads/Group_48005_d7d3942fa1.png',
          //   '/uploads/image_296_9d849f48f8.png',
          // ],
        },
        {
          bg: '/uploads/bg2_653ca48264.png',
          photo1: '/uploads/Mask_group_1_ee76ed0378.jpg',
          photo2: '/uploads/Mask_group_7_415c88f094.jpg',
          photo3: '/uploads/Mask_group_4_9160c96d17.jpg',
          // stickers: [
          //   '/uploads/Group_48008_d5b147e298.png?updatedAt=2024-05-16T04%3A26%3A22.490Z',
          //   '/uploads/image_661_4c80d2fcd8.png?updatedAt=2024-05-16T04%3A26%3A12.632Z',
          //   '/uploads/image_670_c6cbc96a23.png?updatedAt=2024-05-16T04%3A26%3A00.869Z',
          //   '/uploads/image_786_d84c024a40.png?updatedAt=2024-05-16T04%3A25%3A52.192Z',
          //   '/uploads/Unlock_nature_s_potential_8526408ea2.png?updatedAt=2024-05-16T04%3A25%3A37.683Z',
          //   '/uploads/Kind_to_yourself_ac201a7d21.png?updatedAt=2024-05-16T04%3A25%3A26.385Z',
          //   '/uploads/IG_Stickers_Fresh_Journeys2_2_5dd1b2e5a9.png?updatedAt=2024-05-16T04%3A25%3A16.618Z',
          //   '/uploads/Tea_eb4a525740.png?updatedAt=2024-05-16T04%3A25%3A07.660Z',
          // ],
        },
        {
          bg: '/uploads/20240513151942_3b75ac3b29.png',
          photo1: '/uploads/Mask_group_2_4468b2569c.jpg',
          photo2: '/uploads/Mask_group_1_05c5ff260e.jpg',
          photo3: '/uploads/Mask_group_c1ea166f38.jpg',
          // stickers: [
          //   '/uploads/image_892_29a935a85c.png',
          //   '/uploads/image_890_4d6b9a191a.png',
          //   '/uploads/IG_Sticker_Instant_Mask_55f6f21377.png',
          //   '/uploads/image_891_7813adc298.png',
          //   '/uploads/image_893_8dfa5d9cd7.png',
          //   '/uploads/Group_48011_222a894d3f.png',
          //   '/uploads/Group_48013_031c127824.png',
          //   '/uploads/Group_48010_7d66df3538.png',
          //   '/uploads/Group_48009_253f6b0d26.png',
          // ],
        },
      ],
    }),
  },
  mini: {},
  h5: {},
};
