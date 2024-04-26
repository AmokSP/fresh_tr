import path from 'path';

const config = {
  projectName: 'freshTR',
  date: '2023-6-26',
  // designWidth: 750,
  designWidth(input) {
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375;
    }
    return 750;
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {
    LANGUAGE: "'cn'",
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@api': path.resolve(__dirname, '..', 'src/api'),
    '@assets': path.resolve(__dirname, '..', 'src/assets'),
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@constants': path.resolve(__dirname, '..', 'src/constants'),
    '@fonts': path.resolve(__dirname, '..', 'src/fonts'),
    '@hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@lang': path.resolve(__dirname, '..', 'src/lang'),
    '@pages': path.resolve(__dirname, '..', 'src/pages'),
    '@stores': path.resolve(__dirname, '..', 'src/stores'),
    '@styles': path.resolve(__dirname, '..', 'src/styles'),
    '@subpackages': path.resolve(__dirname, '..', 'src/subpackages'),
    '@hideaway': path.resolve(__dirname, '..', 'src/package-hideaway'),
    '@tracking': path.resolve(__dirname, '..', 'src/tracking'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@app.config': path.resolve(__dirname, '..', 'src/app.config.ts'),
    '@i18n': path.resolve(__dirname, '..', 'src/i18n.js'),

    // "@api": path.resolve(__dirname, "..", "src/api"),
    // "@app.config": path.resolve(__dirname, "..", "src/app.config.ts"),
    // "@assets": path.resolve(__dirname, "..", "src/assets"),
    // "@components": path.resolve(__dirname, "..", "src/components"),
    // "@hooks": path.resolve(__dirname, "..", "src/hooks"),
    // "@utils": path.resolve(__dirname, "..", "src/utils"),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: { type: 'webpack5', prebundle: { enable: false } },
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    runtime: {
      enableInnerHTML: true,
    },
    miniCssExtractPluginOption: { ignoreOrder: true },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          mediaQuery: false,
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      },
    },
  },
};

module.exports = function (merge) {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'dev') {
    return merge({}, config, require('./dev'));
  } else if (process.env.NODE_ENV === 'uat') {
    return merge({}, config, require('./uat'));
  }
  return merge({}, config, require('./prod'));
};
