module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {
    TRANSLATE_API: 'true',
    ENABLE_LANG: 'true',
    // API_URL:
    //   "'http://ec2-3-0-43-2.ap-southeast-1.compute.amazonaws.com/freshtrBackend'",
    // CMS_API_URL:
    //   "'http://ec2-3-0-43-2.ap-southeast-1.compute.amazonaws.com:8000/api'",
    // CMS_TOKEN:
    //   "'d08e849184cb8a64c70ed9788096d0b9bc8624d3d8c756ea3ce00f8dd9411256f1499be10457e2ebb114d42a97987560ce7dc5280a276ee6daadf07219bd0ab517e0f4b00aeba24c6601ca15ef98897ba2bc46987ee8b3d9b18bef77d46c8d43123e6dfea704bb3755bbc07b1628b96e9c41d532ac8b37572275ecb4ed6a206f'",
    // BUCKET_URL:
    //   "'http://ec2-3-0-43-2.ap-southeast-1.compute.amazonaws.com/freshcms'",
    // CMS_URL: "'http://ec2-3-0-43-2.ap-southeast-1.compute.amazonaws.com:8000'",

    API_URL: "'https://tr-mp.fresh-cn.com/backend'",
    CMS_API_URL: "'https://tr-mp.fresh-cn.com/api'",
    CMS_TOKEN:
      "'b1696e4508f08f507ab2b68bbdf567cc538c8564dc9d26fcd1346744ec6fa59a7f1a007ee3740df53326e84a42f5d86fbb123109077e7256b90bf92fae85a9c713d4ef58ebc5fac19b599600913c1ba5cfeed3f607c476e6b4e9e6dd5bb3a8462b005e9f6a241692bcd8fec16730357db349c537886cd9facd9585d13dbc4725'",
    BUCKET_URL: "'https://tr-cdn.fresh-cn.com'",
    CMS_URL: "'https://tr-cdn.fresh-cn.com'",
    TASK_URL: "'https://wz-api.todreamer.com'",
    SHARE_IMAGE: "'https://tr-cdn.fresh-cn.com/uploads/mnp_9211ca1a36.jpg'",
    ENV_VERSION: "'release'",

    TRACKING: JSON.stringify({
      gio: {
        dataSourceId: 'b8c483c83e463b5a',
      },
    }),

    DEFAULT_LOCATION: JSON.stringify({
      LNG: '109.75065',
      LAT: '18.37201',
    }),
    H5_CAMPAIGN: JSON.stringify({
      cnyar: "'https://tr-game.fresh-cn.com/cnyar2024/'",
      argarden: "'https://tr-game.fresh-cn.com/argarden2024/'",
    }),

    HIDEAWAY_ASSETS: JSON.stringify({
      campaignQrCode: '/uploads/qr_prod_dd9bfd537f.jpg', // todo
      shareTitle: '感官逸游 馥已焕新',
      shareImage: '/uploads/2_c82be04c8f_bcf8fe57dc.jpg',
      templates: [
        {
          bg: '/uploads/1_1_99fe7ebef7_24c99a5d97.png',
          photo1: '/uploads/Mask_group_6_9e68c19185_3e5249b3ba.jpg',
          photo2: '/uploads/Mask_group_3_1b458d0d9d_6dba3cdead.jpg',
          photo3: '/uploads/Mask_group_10b1e5dfb4_73a416483d.jpg',
        },
        {
          bg: '/uploads/2_e7170dc9d0_4b2e6b6939.png',
          photo1: '/uploads/Mask_group_1_ee76ed0378_ab5cfe5655.jpg',
          photo2: '/uploads/Mask_group_7_415c88f094_d57b38e729.jpg',
          photo3: '/uploads/Mask_group_4_9160c96d17_6efd27427c.jpg',
          photo4: '/uploads/mp4_00_00_02_06_1_40cfd648e7_ae2194a795.png',
        },
        {
          bg: '/uploads/3_a151fe5041_8926cdd89e.png',
          photo1: '/uploads/Mask_group_2_4468b2569c_ec0ad30470.jpg',
          photo2: '/uploads/Mask_group_1_05c5ff260e_756913aa41.jpg',
          photo3: '/uploads/Mask_group_c1ea166f38_87d025e1b2.jpg',
        },
      ],
    }),
  },
  mini: {},
  h5: {},
};
