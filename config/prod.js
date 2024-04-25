module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {
    TRANSLATE_API: true,
    ENABLE_LANG: true,
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

    TRACKING: {
      gio: {
        dataSourceId: "'b8c483c83e463b5a'",
      },
    },

    DEFAULT_LOCATION: {
      LNG: '109.75065',
      LAT: '18.37201',
    },
    H5_CAMPAIGN: {
      cnyar: "'https://tr-game.fresh-cn.com/cnyar2024/'",
      argarden: "'https://tr-game.fresh-cn.com/argarden2024/'",
    },
  },
  mini: {},
  h5: {},
};
