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
      shareTitle: '感官逸游 馥已焕新',
      templates: [
        {
          bg: '/uploads/bg1_63530b508b.png',
          photo1: '/uploads/Rectangle_5321_27b98b7384.png',
          photo2: '/uploads/Rectangle_5322_171c6410a5.png',
          photo3: '/uploads/Rectangle_5322_171c6410a5.png',
          stickers: [
            '/uploads/Group_48007_899d6ccfae.png',
            '/uploads/Heart_Print030_1_f8f876d4c5.png',
            '/uploads/image_400_a0141b49bd.png',
            '/uploads/Group_48004_1dd7d80e23.png',
            '/uploads/Mask_group_00dbe3e96d.png',
            '/uploads/Mask_group_2_c619461028.png',
            '/uploads/image_596_1d169c7b86.png',
            '/uploads/Group_48006_6548733ce3.png',
            '/uploads/image_751_d0e391f2c9.png',
            '/uploads/Mask_group_1_05d9f623c2.png',
            '/uploads/image_373_629ab4d84e.png',
            '/uploads/Group_48012_8e6f89839b.png',
            '/uploads/image_572_75c6a1a216.png',
            '/uploads/Group_48005_e8faecb9b5.png',
            '/uploads/image_296_33af2cc401.png',
          ],
        },
        {
          bg: '/uploads/bg2_ae6254e92d.png',
          photo1: '/uploads/Rectangle_5321_27b98b7384.png',
          photo2: '/uploads/Rectangle_5321_27b98b7384.png',
          photo3: '/uploads/Rectangle_5321_27b98b7384.png',
          stickers: [
            '/uploads/Group_48008_b84807c548.png',
            '/uploads/image_661_6c625594e4.png',
            '/uploads/image_670_efdba5422a.png',
            '/uploads/image_786_739b5e4bc0.png',
            '/uploads/Unlock_nature_s_potential_ee6d0cbe16.png',
            '/uploads/Kind_to_yourself_8644ba73e2.png',
            '/uploads/IG_Stickers_Fresh_Journeys2_2_5e608ed02e.png',
            '/uploads/Tea_fb05271ff9.png',
          ],
        },
        {
          bg: '/uploads/20240513151942_3b75ac3b29.png',
          photo1: '/uploads/Rectangle_5321_27b98b7384.png',
          photo2: '/uploads/Rectangle_5322_171c6410a5.png',
          photo3: '/uploads/Rectangle_5322_171c6410a5.png',
          stickers: [
            '/uploads/image_892_d95ad2a0c5.png',
            '/uploads/image_890_cdeee7f57a.png',
            '/uploads/IG_Sticker_Instant_Mask_0fd4e780c8.png',
            '/uploads/image_891_4cf4b26415.png',
            '/uploads/image_893_050559b769.png',
            '/uploads/Group_48011_ccff06a817.png',
            '/uploads/Group_48013_ae0458ceec.png',
            '/uploads/Group_48010_9ebeeda490.png',
            '/uploads/Group_48009_63e3d76373.png',
          ],
        },
      ],
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
