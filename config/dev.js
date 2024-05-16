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
          bg: '/uploads/bg2_64299e7ee2.png',
          photo1: '/uploads/Mask_group_1_3183d46ed9.png',
          photo2: '/uploads/Mask_group_7_8fc666496a.png',
          photo3: '/uploads/Mask_group_4_6314554f34.png',
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
          bg: '/uploads/20240513150044_213f27b722.png',
          photo1: '/uploads/Mask_group_2_a7cd699f4f.png',
          photo2: '/uploads/Mask_group_8_d5773d1b6e.png',
          photo3: '/uploads/Mask_group_5_8269f75bd7.png',
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
