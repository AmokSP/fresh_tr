const t = {
    autotrack: { type: 'boolean', default: !0 },
    cml: { type: 'object', default: !1 },
    dataCollect: { type: 'boolean', default: !0 },
    debug: { type: 'boolean', default: !1 },
    followShare: { type: 'boolean', default: !0 },
    forceLogin: { type: 'boolean', default: !1 },
    subpackage: { type: 'boolean', default: !1 },
    keepAlive: { type: 'number', default: 3e5 },
    remax: { type: ['object', 'module'], default: !1 },
    taro: { type: ['object', 'module'], default: !1 },
    taroVue: { type: ['object', 'function'], default: !1 },
    tbConfig: {
      type: 'object',
      default: {
        cloudFuncSend: !1,
        cloudFuncName: 'httpTunnel',
        cloudFuncHandler: 'main',
        cloudAppId: void 0,
        path: void 0,
      },
    },
    uniVue: { type: ['object', 'function'], default: !1 },
    version: { type: 'string', default: '1.0.0' },
    wepy: { type: 'function', default: !1 },
  },
  e = {
    compress: { type: 'boolean', default: !0 },
    enableIdMapping: { type: 'boolean', default: !1 },
    extraParams: { type: 'array', default: [] },
    gtouchHost: { type: 'string', default: 'cdp.growingio.com' },
    host: { type: 'string', default: 'cdp-api.growingio.com' },
    ignoreFields: { type: 'array', default: [] },
    scheme: { type: 'string', default: 'https' },
    uploadInterval: { type: 'number', default: 1e3 },
    performance: { type: 'object', default: { monitor: !0, exception: !0 } },
  },
  i = {},
  s = [
    'clearUserId',
    'enableDebug',
    'getGioInfo',
    'getOption',
    'identify',
    'init',
    'setAutotrack',
    'setDataCollect',
    'setOption',
    'setUserId',
    'track',
    'setLocation',
    'setGeneralProps',
    'clearGeneralProps',
    'setPageAttributes',
    'updateImpression',
    'setTrackerHost',
    'setTrackerScheme',
    'setUserAttributes',
    'registerPlugins',
    'getDeviceId',
    'trackTimerStart',
    'trackTimerPause',
    'trackTimerResume',
    'trackTimerEnd',
    'removeTimer',
    'clearTrackTimer',
  ],
  n = ['autotrack', 'dataCollect', 'debug', 'host', 'scheme'],
  o = { autotrack: '无埋点', dataCollect: '数据采集', debug: '调试模式' },
  r = ['setConfig', 'collectImp', 'setPlatformProfile', 'getLocation'],
  a = [
    'deviceBrand',
    'deviceModel',
    'deviceType',
    'networkState',
    'screenHeight',
    'screenWidth',
    'operatingSystem',
  ],
  l = [...a, 'appChannel', 'language', 'platformVersion'],
  g = (t) => ['undefined', 'null'].includes(H(t)),
  u = (t) => 'string' === H(t),
  d = (t) => 'number' === H(t),
  h = (t) => 'boolean' === H(t),
  c = (t) => '[object Object]' === {}.toString.call(t) && !g(t),
  p = (t) => 'function' === H(t),
  v = (t) => Array.isArray(t) && 'array' === H(t),
  m = (t) => {
    try {
      return Array.from(t)[0];
    } catch (t) {
      return;
    }
  },
  f = (t) => {
    try {
      const e = Array.from(t);
      return e[e.length - 1];
    } catch (t) {
      return;
    }
  },
  I = (t, e = 1) => (v(t) && d(e) ? t.slice(e > 0 ? e : 1, t.length) : t),
  y = (t) => {
    if (v(t)) {
      let e = 0;
      const i = [];
      for (const s of t) s && !q(s) && (i[e++] = s);
      return i;
    }
    return t;
  },
  S = (t, e) => {
    if (v(t)) {
      const i = t.findIndex(e);
      return 0 > i ? void 0 : t[i];
    }
  },
  w = (t) => (g(t) ? '' : '' + t),
  O = (t, e) => ('string' === H(t) ? t.split(e) : t),
  b = (t) => {
    if (u(t)) {
      const e = O(t, '');
      return `${m(e).toLowerCase()}${I(e).join('')}`;
    }
    return t;
  },
  T = (t, e) => t.slice(0, e.length) === e,
  _ = (t, e) => {
    const { length: i } = t;
    let s = i;
    s > i && (s = i);
    const n = s;
    return (s -= e.length), s >= 0 && t.slice(s, n) === e;
  },
  P = {}.hasOwnProperty,
  k = (t, e) => !g(t) && P.call(t, e),
  C = (t) => (c(t) ? Object.keys(t) : []),
  E = (t, e) => {
    C(t).forEach((i) => e(t[i], i));
  },
  x = (t, e) => {
    const i = C(t);
    return !(
      !c(t) ||
      !c(e) ||
      i.length !== C(e).length ||
      i.map((i, s) => (c(t[i]) ? x(t[i], e[i]) : t[i] === e[i])).includes(!1)
    );
  },
  A = (t, e, i) => {
    let s = t;
    return c(t)
      ? (e.split('.').forEach((t) => {
          s = s ? s[t] : i;
        }),
        s)
      : i;
  },
  N = (t, e) => {
    if (!c(t)) return !1;
    try {
      if ('string' === H(e)) return delete t[e];
      if ('array' === H(e)) return e.map((e) => delete t[e]);
      'object' === H(e) &&
        e.constructor === RegExp &&
        C(t).forEach((i) => {
          e.test(i) && N(t, i);
        });
    } catch (t) {
      return !1;
    }
  },
  j = (t, e = 250, i, s) => {
    let n,
      o = 0;
    return (
      'boolean' !== H(i) && ((s = t), (t = i), (i = void 0)),
      function (...r) {
        let a = this,
          l = Date.now() - o;
        function g() {
          (o = Date.now()), t.apply(a, r);
        }
        s && !n && g(),
          n && clearTimeout(n),
          void 0 === s && l > e
            ? g()
            : !0 !== i &&
              (n = setTimeout(
                s
                  ? function () {
                      n = void 0;
                    }
                  : g,
                void 0 === s ? e - l : e
              ));
      }
    );
  },
  q = (t) => (v(t) ? 0 === t.length : c(t) ? 0 === C(t).length : !t),
  H = (t) => ({}).toString.call(t).slice(8, -1).toLowerCase();
var L = Object.freeze({
    __proto__: null,
    isNil: g,
    isString: u,
    isNumber: d,
    isBoolean: h,
    isObject: c,
    isRegExp: (t) => '[object RegExp]' === {}.toString.call(t),
    isFunction: p,
    isArray: v,
    isDate: (t) => 'date' === H(t),
    fixed: (t, e) =>
      d(t)
        ? Number(t.toFixed(d(e) ? e : 2))
        : u(t) && 'NaN' !== w(Number(t))
        ? Number(Number(t).toFixed(d(e) ? e : 2))
        : t,
    head: m,
    last: f,
    drop: I,
    dropWhile: (t, e) => (v(t) ? t.filter((t) => !e(t)) : t),
    compact: y,
    find: S,
    toString: w,
    split: O,
    lowerFirst: b,
    upperFirst: (t) => {
      if (u(t)) {
        const e = O(t, '');
        return `${m(e).toUpperCase()}${I(e).join('')}`;
      }
      return t;
    },
    startsWith: T,
    endsWith: _,
    hasOwnProperty: P,
    has: k,
    keys: C,
    forEach: E,
    isEqual: x,
    get: A,
    unset: N,
    throttle: j,
    isEmpty: q,
    typeOf: H,
    formatDate: (t) => {
      function e(t) {
        return 10 > t ? '0' + t : t;
      }
      return (
        t.getFullYear() +
        '-' +
        e(t.getMonth() + 1) +
        '-' +
        e(t.getDate()) +
        ' ' +
        e(t.getHours()) +
        ':' +
        e(t.getMinutes()) +
        ':' +
        e(t.getSeconds()) +
        '.' +
        e(t.getMilliseconds())
      );
    },
  }),
  F = {},
  D = {}.hasOwnProperty;
function B(t) {
  try {
    return decodeURIComponent(t.replace(/\+/g, ' '));
  } catch (t) {
    return null;
  }
}
function R(t) {
  try {
    return encodeURIComponent(t);
  } catch (t) {
    return null;
  }
}
(F.stringify = function (t, e) {
  e = e || '';
  var i,
    s,
    n = [];
  for (s in ('string' != typeof e && (e = '?'), t))
    if (D.call(t, s)) {
      if (
        ((i = t[s]) || (null != i && !isNaN(i)) || (i = ''),
        (s = R(s)),
        (i = R(i)),
        null === s || null === i)
      )
        continue;
      n.push(s + '=' + i);
    }
  return n.length ? e + n.join('&') : '';
}),
  (F.parse = function (t) {
    for (var e, i = /([^=?#&]+)=?([^&]*)/g, s = {}; (e = i.exec(t)); ) {
      var n = B(e[1]),
        o = B(e[2]);
      null === n || null === o || n in s || (s[n] = o);
    }
    return s;
  });
const $ = (t, e) => {
    console.log(
      '%c[GrowingIO]：' + t,
      {
        info: 'color: #3B82F6;',
        error: 'color: #EF4444',
        warn: 'color: #F59E0B',
        success: 'color: #10B981',
      }[e] || ''
    );
  },
  U = (t) => {
    try {
      return t();
    } catch (t) {
      return;
    }
  },
  V = (t) => (u(t) ? t.trim().substring(0, 100) : t),
  K = (t, e) =>
    u(t) && !q(t) && t.match(/^[a-zA-Z_][0-9a-zA-Z_]{0,100}$/)
      ? e()
      : ($(
          '事件名格式不正确，只能包含数字、字母和下划线，且不能以数字开头，字符总长度不能超过100!',
          'error'
        ),
        !1),
  M = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (t) {
      const e = (16 * Math.random()) | 0;
      return ('x' === t ? e : (3 & e) | 8).toString(16);
    }),
  G = (t) => (t.pixelRatio ? Math.round(t.screenHeight * t.pixelRatio) : t.screenHeight),
  Q = (t) => (t.pixelRatio ? Math.round(t.screenWidth * t.pixelRatio) : t.screenWidth),
  W = (t, e) => {
    if (t) {
      const i = t.toLowerCase();
      return -1 !== i.indexOf('android')
        ? e + '-Android'
        : -1 !== i.indexOf('ios')
        ? e + '-iOS'
        : t;
    }
  },
  z = (t) => {
    if (u(t)) {
      const e = t.indexOf('?');
      return -1 !== e ? [t.substring(0, e), t.substring(e + 1)] : [t, ''];
    }
    return ['', ''];
  },
  J = (t) => (u(t) ? (t.startsWith('/') ? t : '/' + t) : ''),
  Z = (t) => {
    const { Current: e, createComponent: i } = t;
    return !(!t || !e || i);
  },
  Y = (t) =>
    U(() => {
      switch (t) {
        case 'wx':
          return wx;
        case 'my':
          return my;
        case 'swan':
          return swan;
        case 'tt':
          return tt;
        case 'qq':
          return qq;
        case 'ks':
          return ks;
        case 'jd':
          return jd;
        default: {
          let t;
          return (
            t || (t = U(() => swan)),
            t || (t = U(() => my)),
            t || (t = U(() => tt)),
            t || (t = U(() => qq)),
            t || (t = U(() => ks)),
            t || (t = U(() => wx)),
            t
          );
        }
      }
    }),
  X = () => {
    let t;
    return (
      !t && U(() => swan) && (t = 'swan'),
      !t && U(() => tt) && (t = 'tt'),
      !t && U(() => qq) && (t = 'qq'),
      !t && U(() => my) && (t = 'my'),
      !t && U(() => ks) && (t = 'ks'),
      !t && U(() => jd) && (t = 'jd'),
      !t && U(() => wx) && (t = 'wx'),
      t || (S(C(global), (t) => w(t).toLowerCase().includes('quickapp')) && (t = 'quickapp')),
      t
    );
  },
  et = (t) =>
    C(t)
      .filter((t) => t.indexOf('__sub') > -1 && t.indexOf('gio__') > -1)
      .sort(),
  it = () => {
    let t = U(() => getApp({ allowDefault: !0 }));
    return t || (t = st()), t;
  },
  st = () => {
    var t;
    return null !== (t = U(() => $global)) && void 0 !== t ? t : global;
  },
  nt = (t) => {
    const e = {};
    return (
      c(t) &&
        E(t, (t, i) => {
          const s = w(i).slice(0, 100);
          c(t)
            ? (e[s] = nt(t))
            : v(t)
            ? ((e[s] = t.slice(0, 100)),
              'cdp' === st().gioEnvironment ? (e[s] = e[s].join('||')) : (e[s] = w(e[s])))
            : (e[s] = g(t) ? '' : w(t).slice(0, 1e3));
        }),
      e
    );
  },
  ot = (t, e) => {
    try {
      return t.minip.batchGetStorageSync(e);
    } catch (i) {
      return e.map((e) => t.getStorageSync(e));
    }
  },
  rt = (t, e) => {
    try {
      return t.minip.batchSetStorageSync(e);
    } catch (i) {
      return e.map(({ key: e, value: i }) => t.setStorageSync(e, i));
    }
  };
var at = Object.freeze({
  __proto__: null,
  consoleText: $,
  niceTry: U,
  limitString: V,
  eventNameValidate: K,
  guid: M,
  getScreenHeight: G,
  getScreenWidth: Q,
  getOS: W,
  compareVersion: (t = '', e = '') => {
    const i = (t) => t.replace(/\s+/g, ''),
      s = (t) => t.replace(/[vV]/g, ''),
      n = i(s(t)),
      o = i(s(e)),
      r = n.split('.'),
      a = o.split('.');
    for (let t = 0; 3 > t; t++) {
      let e = Number(r[t]),
        i = Number(a[t]);
      if (e > i) return 1;
      if (i > e) return -1;
      if (!isNaN(e) && isNaN(i)) return 1;
      if (isNaN(e) && !isNaN(i)) return -1;
    }
    return 0;
  },
  getVueVersion: (t) => {
    if (t) {
      const e = Number.parseInt(m(O(t.version, '.')), 10);
      return Number.isNaN(e) ? 0 : e;
    }
    return 0;
  },
  clearShareQuery: (t) => {
    if (!t) return;
    const e = F.parse(t);
    return delete e.shareId, delete e.contentType, F.stringify(e);
  },
  splitPath: z,
  normalPath: J,
  isTaro3: Z,
  getPlainMinip: Y,
  getPlainPlatform: X,
  getSubKeys: et,
  getAppInst: it,
  getGlobal: st,
  limitObject: nt,
  batchGetStorageSync: ot,
  batchSetStorageSync: rt,
});
const lt = (t) => (u(t) && t.length > 0) || (d(t) && t > 0),
  gt = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/i,
  ut = /^(https?:\/\/)|(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
let dt;
var ht = {
  name: 'gioTaroAdapter',
  method: class {
    constructor(t) {
      var e, i, s, n;
      (this.growingIO = t),
        (this.main = () => {
          var t, e, i, s;
          this.taro ||
            (this.taro =
              null === (e = null === (t = this.growingIO) || void 0 === t ? void 0 : t.vdsConfig) ||
              void 0 === e
                ? void 0
                : e.taro),
            this.vue ||
              (this.vue =
                null ===
                  (s = null === (i = this.growingIO) || void 0 === i ? void 0 : i.vdsConfig) ||
                void 0 === s
                  ? void 0
                  : s.taroVue);
          const { Current: n, createComponent: o } = this.taro;
          !n && o
            ? this.proxyTaro2(this.taro)
            : n && !o
            ? this.proxyTaro3(this.taro, this.vue)
            : dt.consoleText('未获取到Taro实例或不支持的Taro版本，请检查!', 'error');
        }),
        (this.proxyTaro2 = (t) => {
          const e = this,
            i = t.createApp,
            s = t.createComponent;
          i &&
            (t.createApp = function (t) {
              const s = i(t);
              return e.growingIO.dataStore.eventHooks.appOverriding(s), s;
            }),
            s &&
              (t.createComponent = function (t, i) {
                const n = s(t, i);
                return (
                  i
                    ? e.growingIO.dataStore.eventHooks.pageOverriding(
                        ['my', 'tt'].includes(e.growingIO.gioPlatform) ? n : n.methods
                      )
                    : e.growingIO.dataStore.eventHooks.componentOverriding(
                        ['my', 'tt'].includes(e.growingIO.gioPlatform) ? n : n.methods
                      ),
                  n
                );
              });
        }),
        (this.proxyTaro3 = (t, e) => {
          const { eventHooks: i } = this.growingIO.dataStore;
          if (e) {
            console.log('Vue version: ', e.version);
            const t = Number.parseInt(dt.head(dt.split(e.version, '.')), 10);
            i.nativeGrowing(),
              2 === t
                ? this.taro3Vue2Proxy(e)
                : 3 === t
                ? this.taro3Vue3Proxy(e)
                : dt.consoleText('不支持的Vue版本，请使用 Vue2 或 Vue3!', 'error');
          } else i.nativeGrowing(['App']), this.taro3ReactProxy(t);
        }),
        (this.taro3ReactProxy = (t) => {
          var e;
          const i = document.__proto__.__proto__,
            s = this,
            { eventHooks: n } = this.growingIO.dataStore,
            o = null === (e = null == t ? void 0 : t.hooks) || void 0 === e ? void 0 : e.call;
          var r;
          o
            ? s.defineProperty(t.hooks, 'call', function () {
                const t = Array.from(arguments);
                let e = o.apply(this, t);
                if ('getLifecycle' === t[0]) {
                  const i = t[2];
                  if (n.pageHandlers.includes(i)) {
                    let t = dt.isArray(e) ? e[0] : e;
                    (t = n.lifeFcEffects(i, dt.isFunction(t) ? t : () => {}, 'Page')),
                      (e = dt.isArray(e) ? [t] : t);
                  }
                }
                return e;
              })
            : ($('Taro3实例获取失败，请检查初始化逻辑!', 'warn'), n.nativeGrowing(['Page'])),
            s.defineProperty(
              i,
              'addEventListener',
              ((r = i.addEventListener),
              function () {
                const t = arguments[1],
                  e = s.growingIO.dataStore.eventHooks.customFcEffects(t.name, t);
                return r.call(this, arguments[0], e, arguments[2]);
              })
            );
        }),
        (this.taro3Vue2Proxy = (t) => {
          const e = this;
          t.mixin({
            beforeMount: function () {
              const t = this.$options.methods;
              dt.keys(t).forEach((t) => {
                e.defineProperty(this, t, e.proxyMethods(t, this[t]));
              });
              const i = this._setupState;
              dt.isEmpty(i) ||
                dt.keys(i).forEach((t) => {
                  e.defineProperty(i, t, e.proxyMethods(t, i[t]));
                });
            },
          });
        }),
        (this.taro3Vue3Proxy = (t) => {
          const { eventHooks: e } = this.growingIO.dataStore,
            i = this;
          t.mixin({
            beforeMount: function () {
              var t;
              const s = (t) =>
                  dt.keys(t).forEach((t) => {
                    i.defineProperty(this, t, i.proxyMethods(t, this[t]));
                  }),
                n = this.$options.methods;
              n && s(n);
              const o =
                null === (t = null == this ? void 0 : this._) || void 0 === t
                  ? void 0
                  : t.setupState;
              o && s(o);
              const r = this._.emit;
              this._.emit = function () {
                return (
                  (() => {
                    e.customFcEffects(arguments[0], () => {}).apply(this, arguments);
                  })(),
                  r.apply(this, arguments)
                );
              };
            },
            mounted() {
              var t, e;
              const s =
                null !==
                  (e =
                    null === (t = null == this ? void 0 : this._) || void 0 === t
                      ? void 0
                      : t.exposed) && void 0 !== e
                  ? e
                  : {};
              if (((i.exposedNames = {}), !dt.isEmpty(s))) {
                const t = {};
                dt.keys(s).forEach((e) => {
                  dt.isFunction(s[e]) && ((i.exposedNames[s[e].name] = e), (t[s[e].name] = s[e]));
                }),
                  i.traverseHook(this._.vnode.el);
              }
            },
          });
        }),
        (this.proxyMethods = (t, e) => {
          const { eventHooks: i } = this.growingIO.dataStore;
          return dt.isFunction(e) && !i.pageHandlers.includes(t)
            ? function () {
                return i.customFcEffects(t, e).apply(this, arguments);
              }
            : e;
        }),
        (this.defineProperty = (t, e, i) => {
          Object.defineProperty(t, e, { writable: !0, enumerable: !0, configurable: !0, value: i });
        }),
        (this.traverseHook = (t) => {
          this.veiAutoEventHook(t),
            t.childNodes &&
              dt.isArray(t.childNodes) &&
              t.childNodes.forEach((t) => {
                this.traverseHook(t);
              });
        }),
        (this.veiAutoEventHook = (t) => {
          const { eventHooks: e } = this.growingIO.dataStore;
          t._vei &&
            dt.keys(t._vei).forEach((i) => {
              var s;
              if (e.actionEventTypes.includes(i)) {
                const e = t._vei[i].value;
                this.defineProperty(
                  t._vei[i],
                  'value',
                  this.proxyMethods(
                    null !== (s = this.exposedNames[e.name]) && void 0 !== s ? s : e.name,
                    e
                  )
                );
              }
            });
        }),
        (this.saveFullPage = (t) => {
          const e = (t) => {
            t.forEach((t) => {
              var i;
              (null === (i = null == t ? void 0 : t.ctx) || void 0 === i ? void 0 : i.route)
                ? (this.growingIO.taro3VMs || (this.growingIO.taro3VMs = {}),
                  (this.growingIO.taro3VMs[t.ctx.route] = t))
                : dt.isArray(t.childNodes) && e(t.childNodes);
            });
          };
          e(t.childNodes);
        }),
        (dt = this.growingIO.utils),
        (this.taro =
          null === (i = null === (e = this.growingIO) || void 0 === e ? void 0 : e.vdsConfig) ||
          void 0 === i
            ? void 0
            : i.taro),
        (this.vue =
          null === (n = null === (s = this.growingIO) || void 0 === s ? void 0 : s.vdsConfig) ||
          void 0 === n
            ? void 0
            : n.taroVue),
        (this.exposedNames = {});
    }
  },
};
let ct;
const pt = {};
function vt(t, e, i) {
  var s = t;
  e.map(function (t, n) {
    (s[t] = n == e.length - 1 ? i : s[t] || {}), (s = s[t]);
  });
}
vt(pt, ['plugins', 'gioCustomTracking'], {
  name: 'gioCustomTracking',
  method: class {
    constructor(t) {
      (this.growingIO = t),
        (this.getValidResourceItem = (t) => {
          if (t && ct.isObject(t) && t.id && t.key) {
            const e = {
              id: ct.isString(t.id) ? t.id : ct.toString(t.id),
              key: ct.isString(t.key) ? t.key : ct.toString(t.key),
            };
            return t.attributes && (e.attributes = t.attributes), e;
          }
        }),
        (this.getDynamicAttributes = (t) => (
          ct.isNil(t) ||
            ct.keys(t).forEach((e) => {
              ct.isFunction(t[e])
                ? (t[e] = t[e]())
                : ct.isArray(t[e]) || (t[e] = ct.toString(t[e]));
            }),
          t
        )),
        (this.buildCustomEvent = (t, e, i) => {
          ct.eventNameValidate(t, () => {
            var s;
            const {
              dataStore: { eventContextBuilder: n, eventInterceptor: o, eventHooks: r },
            } = this.growingIO;
            o(
              Object.assign(
                {
                  eventType: 'CUSTOM',
                  eventName: t,
                  pageShowTimestamp:
                    null === (s = null == r ? void 0 : r.currentPage) || void 0 === s
                      ? void 0
                      : s.time,
                  attributes: ct.limitObject(
                    this.getDynamicAttributes(ct.isObject(e) && !ct.isEmpty(e) ? e : void 0)
                  ),
                  resourceItem: ct.limitObject(this.getValidResourceItem(i)),
                },
                n()
              )
            );
          });
        }),
        (this.buildUserAttributesEvent = (t) => {
          const {
              dataStore: { eventContextBuilder: e, eventInterceptor: i, lastVisitEvent: s },
            } = this.growingIO,
            n = Object.assign(
              { eventType: 'LOGIN_USER_ATTRIBUTES', attributes: ct.limitObject(t) },
              e()
            );
          n.path || ((n.path = s.path), (n.query = s.query), (n.title = s.title)), i(n);
        }),
        (ct = this.growingIO.utils);
    }
  },
}),
  vt(pt, ['plugins', 'gioTaroAdapter'], ht);
class mt {
  constructor(t) {
    (this.growingIO = t),
      (this.innerPluginInit = () => {
        C(pt.plugins).forEach((t) => {
          const { name: e, method: i } = pt.plugins[t];
          this.pluginItems.find((t) => t.name === e) ||
            this.pluginItems.push({ name: b(e || t), method: i || ((t) => {}) });
        }),
          q(this.pluginItems) || this.installAll();
      }),
      (this.install = (t, e, i) => {
        var s;
        const n = e || this.pluginItems.find((e) => e.name === t);
        if (null === (s = this.growingIO) || void 0 === s ? void 0 : s.plugins[t])
          return $(`重复加载插件 ${t} 或插件重名，已跳过加载!`, 'warn'), !1;
        if (!n) return $(`插件加载失败!不存在名为 ${t} 的插件!`, 'error'), !1;
        try {
          return (
            (this.growingIO.plugins[t] = new n.method(this.growingIO, i)),
            'cdp' === this.growingIO.gioEnvironment && e && $('加载插件：' + t, 'info'),
            !0
          );
        } catch (t) {
          return $('插件加载异常：' + t, 'error'), !1;
        }
      }),
      (this.installAll = (t) => {
        (t || this.pluginItems).forEach((e) => this.install(e.name, t ? e : void 0, e.options));
      }),
      (this.uninstall = (t) => {
        var e;
        N(this.pluginItems, t);
        const i = N(null === (e = this.growingIO) || void 0 === e ? void 0 : e.plugins, t);
        return i || $(`卸载插件 ${t} 失败!`, 'error'), i;
      }),
      (this.uninstallAll = () => {
        this.pluginItems.forEach((t) => this.uninstall(t.name));
      }),
      (this.lifeError = (t, e) => $(`插件执行错误 ${t.name} ${e}`, 'error')),
      (this.onComposeBefore = (t) => {
        this.pluginItems.forEach((e) => {
          var i;
          const s =
            null === (i = this.growingIO.plugins[e.name]) || void 0 === i
              ? void 0
              : i.onComposeBefore;
          if (s && p(s))
            try {
              s(t);
            } catch (t) {
              this.lifeError(e, t);
            }
        });
      }),
      (this.onComposeAfter = (t) => {
        this.pluginItems.forEach((e) => {
          var i;
          const s =
            null === (i = this.growingIO.plugins[e.name]) || void 0 === i
              ? void 0
              : i.onComposeAfter;
          if (s && p(s))
            try {
              s(t);
            } catch (t) {
              this.lifeError(e, t);
            }
        });
      }),
      (this.onSendBefore = (t) => {
        this.pluginItems.forEach((e) => {
          var i;
          const s =
            null === (i = this.growingIO.plugins[e.name]) || void 0 === i ? void 0 : i.onSendBefore;
          if (s && p(s))
            try {
              s(t);
            } catch (t) {
              this.lifeError(e, t);
            }
        });
      }),
      (this.onSendAfter = (t) => {
        this.pluginItems.forEach((e) => {
          var i;
          const s =
            null === (i = this.growingIO.plugins[e.name]) || void 0 === i ? void 0 : i.onSendAfter;
          if (s && p(s))
            try {
              s(t);
            } catch (t) {
              this.lifeError(e, t);
            }
        });
      }),
      (this.pluginItems = []),
      this.growingIO.emitter.on('onComposeBefore', this.onComposeBefore),
      this.growingIO.emitter.on('onComposeAfter', this.onComposeAfter),
      this.growingIO.emitter.on('onSendBefore', this.onSendBefore),
      this.growingIO.emitter.on('onSendAfter', this.onSendAfter);
  }
}
class ft {
  constructor(t) {
    var e;
    (this.growingIO = t),
      (this.initUserInfo = () => {
        const { minipInstance: t } = this.growingIO,
          e = [
            this.uidStorageName,
            this.userIdStorageName,
            this.userKeyStorageName,
            this.gioIdStorageName,
          ],
          i = ot(t, e);
        ['_uid', '_userId', '_userKey', '_gioId'].forEach((t, e) => {
          (this[t] = i[e]), '_uid' !== t || this[t] || (this.uid = M());
        });
      }),
      (this.saveUserInfo = () => {
        const { minipInstance: t } = this.growingIO;
        rt(t, [
          { key: this.uidStorageName, value: this.uid },
          { key: this.userIdStorageName, value: this.userId },
          { key: this.userKeyStorageName, value: this.userKey },
          { key: this.gioIdStorageName, value: this.gioId },
        ]);
      });
    const { inPlugin: i } = this.growingIO;
    (this.uidStorageName = i ? '_growing_plugin_uid_' : '_growing_uid_'),
      (this.userIdStorageName = i ? '_growing_plugin_userId_' : '_growing_userId_'),
      (this.userKeyStorageName = i ? '_growing_plugin_userKey_' : '_growing_userKey_'),
      (this.gioIdStorageName = i ? '_growing_plugin_gioId_' : '_growing_gioId_'),
      (this._sessionId = M()),
      (this._uid = void 0),
      (this._userId = void 0),
      (this._userKey = void 0),
      (this._gioId = void 0),
      'quickapp' !== (null === (e = this.growingIO) || void 0 === e ? void 0 : e.gioPlatform) &&
        this.initUserInfo();
  }
  get sessionId() {
    return this._sessionId || (this._sessionId = M()), this._sessionId;
  }
  set sessionId(t) {
    const e = this._sessionId;
    (this._sessionId = t || M()),
      e !== this._sessionId &&
        this.growingIO.emitter.emit('SESSIONID_UPDATE', {
          newSessionId: this._sessionId,
          oldSessionId: e,
        });
  }
  get uid() {
    return this._uid;
  }
  set uid(t) {
    const e = this._uid;
    (this._uid = t),
      e !== this._uid &&
        (this.growingIO.minipInstance.setStorage(this.uidStorageName, this._uid),
        this.growingIO.emitter.emit('UID_UPDATE', { newUId: t, oldUId: e }));
  }
  get userId() {
    return this._userId;
  }
  set userId(t) {
    const e = this._userId;
    (this._userId = t),
      e !== this._userId &&
        (this.growingIO.minipInstance.setStorage(this.userIdStorageName, this._userId),
        this.growingIO.emitter.emit('USERID_UPDATE', { newUserId: t, oldUserId: e })),
      t && (this.gioId = t);
  }
  get userKey() {
    return this._userKey;
  }
  set userKey(t) {
    const e = this._userKey;
    (this._userKey = t),
      e !== this._userKey &&
        (this.growingIO.minipInstance.setStorage(this.userKeyStorageName, this._userKey),
        this.growingIO.emitter.emit('USERKEY_UPDATE', { newUserKey: t, oldUserKey: e }));
  }
  get gioId() {
    return this._gioId;
  }
  set gioId(t) {
    const e = this._gioId;
    (this._gioId = t),
      e !== this._gioId &&
        (this.growingIO.minipInstance.setStorage(this.gioIdStorageName, this._gioId),
        this.growingIO.emitter.emit('GIOID_UPDATE', { newGioId: t, oldGioId: e }));
  }
}
const It = {
    scnPrefix: '',
    appHandlers: ['onLaunch', 'onShow', 'onHide', 'onError', 'onPageNotFound'],
    pageHandlers: [
      'onLoad',
      'onShow',
      'onReady',
      'onHide',
      'onUnload',
      'onShareAppMessage',
      'onTabItemTap',
    ],
    actionEventTypes: [
      'onclick',
      'tap',
      'onTap',
      'longpress',
      'longTap',
      'blur',
      'change',
      'onChange',
      'submit',
      'confirm',
      'getuserinfo',
      'getphonenumber',
      'contact',
    ],
    originalApp: U(() => App),
    originalPage: U(() => Page),
    originalComponent: U(() => Component),
    originalBehavior: U(() => Behavior),
    canHook: !0,
    hooks: { App: !0, Page: !0, Component: !0, Behavior: !0 },
    listeners: {
      app: { appLaunch: 'onLaunch', appShow: 'onShow', appClose: 'onHide' },
      page: {
        pageLoad: 'onLoad',
        pageShow: 'onShow',
        pageReady: 'onReady',
        pageHide: 'onHide',
        pageUnload: 'onUnload',
        tabTap: 'onTabItemTap',
        shareApp: 'onShareAppMessage',
      },
      actions: {
        click: [
          'onclick',
          'tap',
          'longpress',
          'longTap',
          'getuserinfo',
          'getphonenumber',
          'contact',
        ],
        change: ['blur', 'change', 'confirm'],
        submit: ['submit'],
      },
    },
  },
  yt = Object.assign(Object.assign({}, It), {
    listeners: Object.assign({}, It.listeners),
    name: 'JingDong',
    platform: 'jd',
    scnPrefix: 'jd_',
  }),
  St = Object.assign(Object.assign({}, It), {
    listeners: Object.assign({}, It.listeners),
    name: 'KuaiShou',
    platform: 'kuaishoup',
    scnPrefix: 'ks_',
  }),
  wt = Object.assign(Object.assign({}, It), {
    listeners: Object.assign({}, It.listeners),
    name: 'Alipay',
    platform: 'alip',
    scnPrefix: 'alip_',
    hooks: Object.assign(Object.assign({}, null == It ? void 0 : It.hooks), { Behavior: !1 }),
  }),
  Ot = Object.assign(Object.assign({}, It), {
    listeners: Object.assign({}, It.listeners),
    name: 'QQ',
    platform: 'qq',
    scnPrefix: 'qq_',
  });
(Ot.pageHandlers = [...It.pageHandlers, 'onAddToFavorites']),
  (Ot.listeners.page.addFavorites = 'onAddToFavorites');
const bt = Object.assign(Object.assign({}, It), {
    listeners: Object.assign({}, It.listeners),
    name: 'Baidu',
    platform: 'baidup',
    scnPrefix: 'baidup_',
  }),
  Tt = Object.assign(Object.assign({}, It), {
    listeners: Object.assign({}, It.listeners),
    name: 'Bytedance',
    platform: 'bytedance',
    scnPrefix: 'bytedance_',
  }),
  _t = Object.assign(Object.assign({}, It), {
    listeners: Object.assign({}, It.listeners),
    name: 'Weixin',
    platform: 'MinP',
  });
(_t.pageHandlers = [...It.pageHandlers, 'onShareTimeline', 'onAddToFavorites']),
  (_t.listeners.page = Object.assign(Object.assign({}, It.listeners.page), {
    shareTime: 'onShareTimeline',
    addFavorites: 'onAddToFavorites',
  }));
const Pt = X(),
  kt = U(() => {
    const t = { jd: yt, ks: St, my: wt, qq: Ot, swan: bt, tt: Tt, wx: _t }[Pt];
    return (t.canHook = !1), t;
  });
function Ct(t, e, i, s) {
  return new (i || (i = Promise))(function (n, o) {
    function r(t) {
      try {
        l(s.next(t));
      } catch (t) {
        o(t);
      }
    }
    function a(t) {
      try {
        l(s.throw(t));
      } catch (t) {
        o(t);
      }
    }
    function l(t) {
      var e;
      t.done
        ? n(t.value)
        : ((e = t.value),
          e instanceof i
            ? e
            : new i(function (t) {
                t(e);
              })).then(r, a);
    }
    l((s = s.apply(t, e || [])).next());
  });
}
class Et {
  constructor(t) {
    (this.growingIO = t),
      (this.minip = Y('framework')),
      (this.hookSetTitle = () => {
        var t;
        const e = null === (t = this.minip) || void 0 === t ? void 0 : t.setNavigationBarTitle,
          i = this;
        e &&
          Object.defineProperty(this.minip, 'setNavigationBarTitle', {
            writable: !0,
            enumerable: !0,
            configurable: !0,
            value: function () {
              if (i.growingIO.gioSDKInitialized) {
                const t = i.getCurrentPath(),
                  e = i.growingIO.dataStore.eventHooks.currentPage.path,
                  { title: s } = arguments[0] || {};
                e !== t && (i.growingIO.dataStore.eventHooks.currentPage.settedTitle[t] = s);
              }
              return e.apply(this, arguments);
            },
          });
      }),
      (this.navigateTo = (t) => {
        var e;
        return null === (e = this.minip) || void 0 === e ? void 0 : e.navigateTo(t);
      }),
      (this.switchTab = (t) => {
        var e;
        null === (e = this.minip) || void 0 === e || e.switchTab(t);
      }),
      (this.navigateToMiniProgram = (t) => {
        var e;
        return null === (e = this.minip) || void 0 === e ? void 0 : e.navigateToMiniProgram(t);
      }),
      (this.getImageInfo = ({ src: t, success: e, fail: i, complete: s }) => {
        var n;
        return null === (n = this.minip) || void 0 === n
          ? void 0
          : n.getImageInfo({ src: t, success: e, fail: i, complete: s });
      }),
      (this.initImpression = (t) => {
        var e, i;
        null ===
          (i =
            null === (e = this.growingIO.plugins) || void 0 === e
              ? void 0
              : e.gioImpressionTracking) ||
          void 0 === i ||
          i.main(t, 'observeAll');
      }),
      (this.getCurrentPage = () => U(() => f(getCurrentPages())) || {}),
      (this.getCurrentPath = () => {
        const t = this.getCurrentPage();
        return (
          (null == t ? void 0 : t.route) ||
          (null == t ? void 0 : t.uri) ||
          (null == t ? void 0 : t.__route__) ||
          ''
        );
      }),
      (this.getPageTitle = (t) => {
        var e, i;
        return u(
          null === (e = null == t ? void 0 : t.data) || void 0 === e ? void 0 : e.gioPageTitle
        )
          ? V(null === (i = null == t ? void 0 : t.data) || void 0 === i ? void 0 : i.gioPageTitle)
          : '';
      }),
      (this.getStorageSync = (t) => {
        var e;
        return null === (e = this.minip) || void 0 === e ? void 0 : e.getStorageSync(t);
      }),
      (this.getStorage = (t) =>
        new Promise((e) => {
          var i;
          null === (i = this.minip) ||
            void 0 === i ||
            i.getStorage({ key: t, success: ({ data: t }) => e(t), fail: () => e('') });
        })),
      (this.setStorageSync = (t, e) => {
        var i;
        null === (i = this.minip) || void 0 === i || i.setStorageSync(t, e);
      }),
      (this.setStorage = (t, e) => {
        var i;
        null === (i = this.minip) || void 0 === i || i.setStorage({ key: t, data: e });
      }),
      (this.removeStorageSync = (t) => {
        var e;
        null === (e = this.minip) || void 0 === e || e.removeStorageSync(t);
      }),
      (this.removeStorage = (t) => {
        var e;
        null === (e = this.minip) || void 0 === e || e.removeStorage(t);
      }),
      (this.getNetworkType = () =>
        Ct(this, void 0, void 0, function* () {
          const t = this;
          return yield new Promise((e) => {
            var i;
            null === (i = this.minip) ||
              void 0 === i ||
              i.getNetworkType({
                success: (i) => {
                  (t.network = i), e(i);
                },
                fail: () => e(null),
              });
          });
        })),
      (this.request = ({
        url: t,
        data: e,
        header: i,
        timeout: s,
        method: n,
        success: o,
        fail: r,
        complete: a,
      }) => {
        var l;
        const g =
            null === (l = this.minip) || void 0 === l
              ? void 0
              : l.request({
                  url: t,
                  data: e,
                  header: i,
                  headers: i,
                  timeout: s,
                  method: n,
                  success: o,
                  fail: r,
                  complete: a,
                }),
          u = setTimeout(
            () => {
              null == g || g.abort(), clearTimeout(u);
            },
            (s || 1e4) + 10
          );
        return g;
      }),
      (this.getSystemInfo = () =>
        Ct(this, void 0, void 0, function* () {
          const t = this;
          return yield new Promise((e) => {
            var i;
            null === (i = this.minip) ||
              void 0 === i ||
              i.getSystemInfo({
                success: (i) => {
                  (t.systemInfo = i), e(i);
                },
                fail: () => e(null),
              });
          });
        })),
      (this.getSetting = () =>
        new Promise((t) => {
          var e;
          null === (e = this.minip) || void 0 === e || e.getSetting({ success: t, fail: t });
        }));
    const {
      platformConfig: { platform: e, scnPrefix: i },
    } = this.growingIO;
    (this.platform = e),
      (this.scnPrefix = i),
      this.getNetworkType().then(() => {
        var t;
        return null === (t = this.growingIO.dataStore) || void 0 === t
          ? void 0
          : t.eventReleaseInspector();
      }),
      this.getSystemInfo().then(() => {
        var t;
        return null === (t = this.growingIO.dataStore) || void 0 === t
          ? void 0
          : t.eventReleaseInspector();
      });
  }
}
const xt = X();
var At = {
  wx: class extends Et {
    constructor(t) {
      super(t),
        (this.growingIO = t),
        (this.getPageTitle = (t) => {
          var e, i;
          let s = '';
          try {
            const n = (null == t ? void 0 : t.data) || t.$data || {};
            if (
              ((s = u(null == n ? void 0 : n.gioPageTitle)
                ? null == n
                  ? void 0
                  : n.gioPageTitle
                : ''),
              0 === s.length)
            ) {
              const e = __wxConfig.page[t.route] || __wxConfig.page[t.route + '.html'];
              s = e
                ? e.window.navigationBarTitleText
                : __wxConfig.global.window.navigationBarTitleText;
            }
            if (0 === s.length) {
              const n =
                null ===
                  (i =
                    null ===
                      (e =
                        null === __wxConfig || void 0 === __wxConfig
                          ? void 0
                          : __wxConfig.tabBar) || void 0 === e
                      ? void 0
                      : e.list) || void 0 === i
                  ? void 0
                  : i.find((e) => e.pagePath === t.route || e.pagePath === t.route + '.html');
              s = (null == n ? void 0 : n.text) || '';
            }
          } catch (t) {
            return '';
          }
          return V(s);
        }),
        this.hookSetTitle();
    }
  },
  swan: class extends Et {
    constructor(t) {
      super(t),
        (this.growingIO = t),
        (this.initImpression = (t) => {
          var e, i;
          null ===
            (i =
              null === (e = this.growingIO.plugins) || void 0 === e
                ? void 0
                : e.gioImpressionTracking) ||
            void 0 === i ||
            i.main(t, 'selectAll');
        }),
        (this.getPageTitle = (t) => {
          var e, i;
          let s = '';
          try {
            const n = (null == t ? void 0 : t.data) || t.$data || {};
            s = u(null == n ? void 0 : n.gioPageTitle) ? (null == n ? void 0 : n.gioPageTitle) : '';
            const o = U(() => JSON.parse(appConfig)) || {};
            if (0 === s.length) {
              const e = o.page[t.route] || o.page[t.route + '.html'];
              s = e ? e.window.navigationBarTitleText : o.window.navigationBarTitleText;
            }
            if (0 === s.length) {
              const n =
                null ===
                  (i =
                    null === (e = null == o ? void 0 : o.tabBar) || void 0 === e
                      ? void 0
                      : e.list) || void 0 === i
                  ? void 0
                  : i.find((e) => e.pagePath === t.route || e.pagePath === t.route + '.html');
              s = (null == n ? void 0 : n.text) || '';
            }
          } catch (t) {
            return '';
          }
          return V(s);
        }),
        this.hookSetTitle();
    }
  },
  my: class extends Et {
    constructor(t) {
      super(t),
        (this.growingIO = t),
        (this.hookSetTitle = () => {
          var t;
          const e = null === (t = this.minip) || void 0 === t ? void 0 : t.setNavigationBar,
            i = this;
          e &&
            Object.defineProperty(this.minip, 'setNavigationBar', {
              writable: !0,
              enumerable: !0,
              configurable: !0,
              value: function () {
                if (i.growingIO.gioSDKInitialized) {
                  const t = i.getCurrentPath(),
                    e = i.growingIO.dataStore.eventHooks.currentPage.path,
                    { title: s } = arguments[0] || {};
                  e !== t && (i.growingIO.dataStore.eventHooks.currentPage.settedTitle[t] = s);
                }
                return e.apply(this, arguments);
              },
            });
        }),
        (this.initImpression = (t) => {
          var e, i;
          null ===
            (i =
              null === (e = this.growingIO.plugins) || void 0 === e
                ? void 0
                : e.gioImpressionTracking) ||
            void 0 === i ||
            i.main(t, 'selectAll');
        }),
        (this.getStorageSync = (t) => {
          const { data: e } = my.getStorageSync({ key: t });
          return e;
        }),
        (this.setStorageSync = (t, e) => {
          var i;
          null === (i = this.minip) || void 0 === i || i.setStorageSync({ key: t, data: e });
        }),
        this.hookSetTitle();
    }
  },
  qq: class extends Et {
    constructor(t) {
      super(t),
        (this.growingIO = t),
        (this.getPageTitle = (t) => {
          var e, i;
          let s = '';
          try {
            const n = (null == t ? void 0 : t.data) || t.$data || {};
            if (
              ((s = u(null == n ? void 0 : n.gioPageTitle)
                ? null == n
                  ? void 0
                  : n.gioPageTitle
                : ''),
              0 === s.length)
            ) {
              const e = __qqConfig.page[t.route] || __qqConfig.page[t.route + '.html'];
              s = e
                ? e.window.navigationBarTitleText
                : __qqConfig.global.window.navigationBarTitleText;
            }
            if (0 === s.length) {
              const n =
                null ===
                  (i =
                    null ===
                      (e =
                        null === __qqConfig || void 0 === __qqConfig
                          ? void 0
                          : __qqConfig.tabBar) || void 0 === e
                      ? void 0
                      : e.list) || void 0 === i
                  ? void 0
                  : i.find((e) => e.pagePath === t.route || e.pagePath === t.route + '.html');
              s = (null == n ? void 0 : n.text) || '';
            }
          } catch (t) {
            return '';
          }
          return V(s);
        }),
        this.hookSetTitle();
    }
  },
  tt: class extends Et {
    constructor(t) {
      super(t),
        (this.growingIO = t),
        (this.getPageTitle = (t) => {
          var e, i;
          let s = '';
          try {
            const n = (null == t ? void 0 : t.data) || t.$data || {};
            if (
              ((s = u(null == n ? void 0 : n.gioPageTitle)
                ? null == n
                  ? void 0
                  : n.gioPageTitle
                : ''),
              0 === s.length)
            ) {
              const e = __ttConfig.page[t.route] || __ttConfig.page[t.route + '.html'];
              s = e
                ? e.window.navigationBarTitleText
                : __ttConfig.global.window.navigationBarTitleText;
            }
            if (0 === s.length) {
              const n =
                null ===
                  (i =
                    null ===
                      (e =
                        null === __ttConfig || void 0 === __ttConfig
                          ? void 0
                          : __ttConfig.tabBar) || void 0 === e
                      ? void 0
                      : e.list) || void 0 === i
                  ? void 0
                  : i.find((e) => e.pagePath === t.route || e.pagePath === t.route + '.html');
              s = (null == n ? void 0 : n.text) || '';
            }
          } catch (t) {
            return '';
          }
          return V(s);
        }),
        this.hookSetTitle();
    }
  },
}[xt];
class Nt {
  constructor() {
    var t;
    (this.init = (t) => (
      $('Gio小程序SDK 初始化中...', 'info'),
      this.dataStore.initOptions(t),
      (this.gioSDKInitialized = !0),
      this.vdsConfig.subpackage || (it().__gio__ = () => this),
      null == this || this.initCallback(),
      this.emitter.emit('SDK_INITIALIZED', this),
      $('Gio小程序SDK 初始化完成！', 'success'),
      this.vdsConfig.forceLogin &&
        $('forceLogin已开启，请调用 identify 方法设置 openId 以继续上报!', 'info'),
      this.inPlugin && this.dataStore.sendVisit(),
      !0
    )),
      (this.setDataCollect = (t) => {
        this.setOption('dataCollect', !!t), this.notRecommended();
      }),
      (this.setAutotrack = (t) => {
        this.setOption('autotrack', !!t), this.notRecommended();
      }),
      (this.enableDebug = (t) => {
        this.setOption('debug', !!t), this.notRecommended();
      }),
      (this.setOption = (t, e) => {
        if (n.includes(t)) {
          const i = this.dataStore.setOption(t, e);
          return i && o[t] && $(`已${e ? '开启' : '关闭'}${o[t]}`, 'info'), i;
        }
        return $(`不存在可修改的配置项：${t}，请检查后重试!`, 'warn'), !1;
      }),
      (this.getDeviceId = () => this.userStore.uid),
      (this.getOption = (t) => this.dataStore.getOption(t)),
      (this.getGioInfo = () => {
        const { uid: t, userId: e, userKey: i, sessionId: s, gioId: n } = this.userStore,
          {
            projectId: o,
            appId: r,
            dataSourceId: a,
            dataCollect: l,
            enableIdMapping: g,
            extraParams: u,
            ignoreFields: d,
          } = this.vdsConfig,
          h = {
            gioappid: r,
            giocs1: e || '',
            gioplatform: this.platformConfig.platform,
            gioprojectid: o,
            gios: s,
            giou: t,
          };
        return (
          'cdp' === this.gioEnvironment &&
            ((h.giodatacollect = l),
            (h.giodatasourceid = a),
            (h.gioid = n || ''),
            g && (h.giouserkey = i),
            q(u) ||
              u.forEach((t) => {
                d.includes(t) || (h['gio' + t] = this.dataStore.lastVisitEvent[t]);
              })),
          F.stringify(h)
        );
      }),
      (this.setLocation = (t, e) => {
        const i = { latitude: t, longitude: e },
          s = this.dataStore.locationData,
          n = (t) => t >= -180 && 180 >= t;
        n(t) &&
          n(e) &&
          (s.latitude !== t || s.longitude !== e) &&
          ((this.dataStore.locationData = i), this.dataStore.sendVisit());
      }),
      (this.setGeneralProps = (t) => {
        c(t) && !q(t)
          ? ((this.dataStore.generalProps = Object.assign(
              Object.assign({}, this.dataStore.generalProps),
              t
            )),
            C(this.dataStore.generalProps).forEach((t) => {
              [void 0, null].includes(this.dataStore.generalProps[t]) &&
                (this.dataStore.generalProps[t] = '');
            }))
          : this.callError('setGeneralProps');
      }),
      (this.clearGeneralProps = (t) => {
        v(t) && !q(t)
          ? t.forEach((t) => {
              N(this.dataStore.generalProps, t);
            })
          : (this.dataStore.generalProps = {});
      }),
      (this.setPageAttributes = (t) => {
        const { currentPage: e } = this.dataStore.eventHooks,
          i = this.minipInstance.getCurrentPath();
        ['onLoad', 'attached'].includes(e.currentLifecycle) && (e.pageProps[i] = nt(t));
      }),
      (this.updateImpression = () => {
        $('当前未集成半自动浏览插件，请集成插件后再调用 updateImpression!', 'warn');
      }),
      (this.notRecommended = () =>
        $("不推荐的方法使用，建议使用 gio('setOption', [optionName], [value])!", 'info')),
      (this.callError = (t, e = !0, i = '参数不合法') =>
        $(`${e ? '调用' : '设置'} ${t} 失败，${i}!`, 'warn')),
      (this.utils = Object.assign(Object.assign(Object.assign({}, L), at), { qs: F })),
      (this.emitter = {
        all: (t = t || new Map()),
        on: function (e, i) {
          var s = t.get(e);
          s ? s.push(i) : t.set(e, [i]);
        },
        off: function (e, i) {
          var s = t.get(e);
          s && (i ? s.splice(s.indexOf(i) >>> 0, 1) : t.set(e, []));
        },
        emit: function (e, i) {
          var s = t.get(e);
          s &&
            s.slice().map(function (t) {
              t(i);
            }),
            (s = t.get('*')) &&
              s.slice().map(function (t) {
                t(e, i);
              });
        },
      }),
      (this.gioPlatform = X()),
      (this.gioFramework = 'taro'),
      (this.gioEnvironment = 'cdp'),
      (this.sdkVersion = '3.8.14');
    try {
      'quickapp' === this.gioPlatform || (p(getApp) && p(App))
        ? (this.inPlugin = !1)
        : (this.inPlugin = !0);
    } catch (t) {
      this.inPlugin = !0;
    }
    this.inPlugin && $('未检测到小程序实例，自动切换为插件模式!', 'info'),
      (this.platformConfig = kt),
      (this.minipInstance = new At(this)),
      (this.userStore = new ft(this)),
      (this.plugins = new mt(this)),
      this.plugins.innerPluginInit();
  }
}
class jt {
  constructor(t) {
    (this.growingIO = t),
      (this.main = (t) => {
        var e, i, s, n, o;
        const {
            sdkVersion: r,
            vdsConfig: a,
            platformConfig: l,
            minipInstance: g,
            userStore: u,
            dataStore: { eventHooks: d, locationData: h, lastVisitEvent: c },
          } = this.growingIO,
          { systemInfo: p = {}, network: v = {} } = g,
          { brand: m, model: f, platform: I, language: y, version: S } = p,
          w = {
            appChannel: 'scn:' + (d.scene || 'NA'),
            appVersion: a.version,
            dataSourceId: a.dataSourceId,
            deviceBrand: m,
            deviceId: u.uid,
            deviceModel: f,
            deviceType: W(I, l.name),
            domain: a.appId,
            gioId: u.gioId,
            language: y,
            latitude: null == h ? void 0 : h.latitude,
            longitude: null == h ? void 0 : h.longitude,
            networkState: (null == v ? void 0 : v.networkType) || (null == v ? void 0 : v.type),
            operatingSystem: W(I, l.name),
            path: (null === (e = d.currentPage) || void 0 === e ? void 0 : e.path)
              ? null === (i = d.currentPage) || void 0 === i
                ? void 0
                : i.path
              : c.path,
            platform: l.platform,
            platformVersion: l.name + (S ? ' ' + S : ''),
            query: (null === (s = d.currentPage) || void 0 === s ? void 0 : s.path)
              ? null === (n = d.currentPage) || void 0 === n
                ? void 0
                : n.query
              : c.query,
            screenHeight: G(p),
            screenWidth: Q(p),
            sdkVersion: r,
            sessionId: u.sessionId,
            title:
              (null === (o = d.currentPage) || void 0 === o ? void 0 : o.title) ||
              g.getPageTitle(g.getCurrentPage()),
            timestamp: Date.now(),
            userId: u.userId,
          };
        return (
          a.enableIdMapping && (w.userKey = u.userKey),
          q(a.ignoreFields) ||
            a.ignoreFields.forEach((t) => {
              N(w, t);
            }),
          q(t) ? w : Object.assign(Object.assign({}, w), t)
        );
      });
  }
}
class qt {
  constructor(t) {
    (this.growingIO = t),
      (this.main = (t, e) => {
        var i, s;
        const n = Date.now(),
          {
            emitter: o,
            userStore: r,
            vdsConfig: a,
            platformConfig: l,
            dataStore: { eventHooks: g, lastVisitEvent: u, saveStorageInfo: d },
          } = this.growingIO;
        o.emit('minipLifecycle', {
          event: 'App ' + t,
          timestamp: n,
          params: null !== (i = e[0]) && void 0 !== i ? i : {},
        }),
          a.debug && console.log('App:', t, n);
        const h = l.listeners.app;
        switch (
          (o.emit('onComposeBefore', {
            event: 'App ' + t,
            params: null !== (s = e[0]) && void 0 !== s ? s : {},
          }),
          t)
        ) {
          case h.appCreate:
          case h.appShow:
            if (q(u) && e[0]) {
              const { path: t = '', query: i = {} } = e[0];
              this.growingIO.dataStore.lastVisitEvent = { path: t, query: F.stringify(i) };
            }
            this.parseScene(e),
              g.lastCloseTime
                ? (Date.now() - g.lastCloseTime > g.keepAlive ||
                    (g.lastScene && g.scene !== g.lastScene)) &&
                  ((r.sessionId = ''), (g.currentPage.time = void 0), this.buildVisitEvent(e[0]))
                : this.buildVisitEvent(e[0]);
            break;
          case h.appClose:
            (g.lastScene = g.scene),
              (g.lastCloseTime = Date.now()),
              d(),
              r.saveUserInfo(),
              this.buildCloseEvent(),
              this.growingIO.vdsConfig.forceLogin || this.growingIO.uploader.initiateRequest(!0);
        }
      }),
      (this.parseScene = (t) => {
        var e;
        const {
            minipInstance: i,
            gioPlatform: s,
            emitter: n,
            dataStore: { eventHooks: o },
          } = this.growingIO,
          r = o.scene;
        let a;
        if ('quickapp' === s) {
          const { extra: t, type: e } = i.getAppSource();
          a = (null == t ? void 0 : t.scene) || e;
        } else if (t.length > 0) {
          const i = t[0];
          (
            null === (e = null == i ? void 0 : i.query) || void 0 === e
              ? void 0
              : e.wxShoppingListScene
          )
            ? (a = i.query.wxShoppingListScene)
            : (null == i ? void 0 : i.scene)
            ? (a = i.scene)
            : (o.scene = 'NA');
        }
        (o.scene = a), a !== r && n.emit('SCENE_UPDATE', { newScene: a, oldScene: r });
      }),
      (this.buildVisitEvent = (t) => {
        const { dataStore: e } = this.growingIO,
          { eventContextBuilder: i, eventInterceptor: s } = e;
        s(
          Object.assign(
            { eventType: 'VISIT' },
            i({
              path: (null == t ? void 0 : t.path) || (null == t ? void 0 : t.p) || '',
              query: c(null == t ? void 0 : t.query)
                ? F.stringify((null == t ? void 0 : t.query) || {})
                : (null == t ? void 0 : t.query) || (null == t ? void 0 : t.q) || '',
            })
          )
        );
      }),
      (this.buildCloseEvent = () => {
        const {
          dataStore: { eventContextBuilder: t, eventInterceptor: e },
        } = this.growingIO;
        e(Object.assign({ eventType: 'APP_CLOSED' }, t()));
      });
  }
}
class Ht {
  constructor(t) {
    (this.growingIO = t),
      (this.parsePage = (t, e) => {
        var i;
        (this.path =
          t.route ||
          t.uri ||
          t.__route__ ||
          (null === (i = null == t ? void 0 : t.$page) || void 0 === i ? void 0 : i.fullPath) ||
          ''),
          q(e) ? (this.query = void 0) : (this.query = this.getQuery(e)),
          (this.time = Date.now()),
          (this.title =
            this.settedTitle[this.path] ||
            this.growingIO.minipInstance.getPageTitle(
              t || this.growingIO.minipInstance.getCurrentPage()
            ));
      }),
      (this.getQuery = (t) =>
        y(C(t || {}))
          .filter((t) => 'wxShoppingListScene' !== t)
          .map((e) => `${e}=${t[e]}`)
          .join('&')),
      (this.saveShareId = (t) => {
        (null == t ? void 0 : t.gioShareId) && (this.queryShareId = t.gioShareId);
      }),
      (this.updateShareResult = (t, e) => {
        const [i, s, n] = this.buildShareQuery(t, e);
        return (e.path = J(i + (s ? '?' + s : ''))), (e.attributes = n), (e.query = s), e;
      }),
      (this.updateAppMessageResult = this.updateShareResult),
      (this.updateTimelineResult = this.updateShareResult),
      (this.updateAddFavoritesResult = (t, e) => {
        const [i, s] = this.buildShareQuery(t, e, !1);
        return (e.path = J(i + (s ? '?' + s : ''))), (e.query = s), e;
      }),
      (this.query = void 0),
      (this.settedTitle = {}),
      (this.pageProps = {});
  }
  buildShareQuery(t, e, i = !0) {
    const { userStore: s } = t;
    let [n, o] = z(k(e, 'path') ? e.path : this.path);
    const r = F.parse(e.query || o || this.query || '') || {};
    if (!i) return [n, F.stringify(r), {}];
    C(r).forEach((t) => {
      (['gioPreShareId', 'gioShareId', 'suid'].includes(t) || t.toLowerCase().startsWith('utm_')) &&
        N(r, t);
    });
    const a = { gioShareId: M(), suid: s.uid },
      l = {
        contentType: e.contentType || r.contentType,
        contentId: e.contentId || r.contentId,
        gioPreShareId: this.queryShareId,
      };
    return (
      E(a, (t, e) => {
        t || N(a, e);
      }),
      [
        n,
        F.stringify(Object.assign(Object.assign({}, r), a)),
        Object.assign(Object.assign({}, a), l),
      ]
    );
  }
}
class Lt {
  constructor(t) {
    (this.growingIO = t),
      (this.main = (t, e, i) => {
        var s, n, o, r, a, l, g;
        const u = Date.now(),
          {
            emitter: d,
            minipInstance: h,
            plugins: c,
            vdsConfig: v,
            platformConfig: m,
            dataStore: {
              eventHooks: f,
              buildAppMessageEvent: I,
              buildTimelineEvent: y,
              buildAddFavorites: S,
            },
            inPlugin: w,
          } = this.growingIO,
          { currentPage: O, shareOut: b, toggleShareOut: T } = f;
        if (this.prevEvent[e] && 50 > Date.now() - Number(this.prevEvent[e])) return;
        t || (t = h.getCurrentPage()),
          v.wepy && (t.route = t.$is),
          t.route || (t.route = h.getCurrentPath(t));
        const _ =
          t.route ||
          t.uri ||
          t.__route__ ||
          (null === (s = null == t ? void 0 : t.$page) || void 0 === s ? void 0 : s.fullPath) ||
          '';
        d.emit('minipLifecycle', {
          event: 'Page ' + e,
          timestamp: u,
          params: { page: t, args: i[0] },
        }),
          v.debug && console.log('Page:', _, '#', e, u),
          (this.prevEvent[e] = Date.now());
        const P = m.listeners.page;
        switch (
          (d.emit('onComposeBefore', {
            page: t,
            event: 'Page ' + e,
            params: { page: t, args: i[0] },
          }),
          (O.lastLifecycle = O.currentLifecycle),
          (O.currentLifecycle = e),
          e === P.pageLoad &&
            ((this.argQuery[_] =
              A(t, 'options') ||
              A(t, '__displayReporter.query') ||
              A(t, '$page.query') ||
              A(t, '$wx.__displayReporter.query') ||
              i[0] ||
              {}),
            N(this.argQuery[_], '$taroTimestamp')),
          e)
        ) {
          case P.pageShow:
            if (w) break;
            (b && f.currentPage.time) || (O.parsePage(t, this.argQuery[_]), this.buildPageEvent()),
              T(!1),
              O.saveShareId(this.argQuery[_]),
              h.initImpression(h.getCurrentPage());
            break;
          case P.pageReady:
            v.taro &&
              Z(v.taro) &&
              (null ===
                (o =
                  null === (n = this.growingIO.plugins) || void 0 === n
                    ? void 0
                    : n.gioTaroAdapter) ||
                void 0 === o ||
                o.saveFullPage(document.body),
              h.initImpression(h.getCurrentPage()));
            break;
          case P.pageHide:
          case P.pageUnload:
            (v.taro && Z(v.taro)) ||
              !(null === (r = null == c ? void 0 : c.gioImpressionTracking) || void 0 === r
                ? void 0
                : r.impressionObserver) ||
              (null ===
                (l =
                  null === (a = null == c ? void 0 : c.gioImpressionTracking) || void 0 === a
                    ? void 0
                    : a.impressionObserver) ||
                void 0 === l ||
                l.disconnect(),
              (this.growingIO.plugins.gioImpressionTracking.impressionObserver = null));
            break;
          case P.shareApp:
            T(!0), v.followShare && I(i);
            break;
          case P.shareTime:
            v.followShare && y(i);
            break;
          case P.addFavorites:
            S(i);
            break;
          case P.tabTap: {
            const t =
              null === (g = null == c ? void 0 : c.gioEventAutoTracking) || void 0 === g
                ? void 0
                : g.buildTabClickEvent;
            v.autotrack && t && p(t) && t(i[0]);
            break;
          }
        }
        e === P.pageUnload && (O.pageProps[_] = void 0);
      }),
      (this.buildPageEvent = () => {
        const {
            minipInstance: t,
            dataStore: {
              lastPageEvent: e,
              eventContextBuilder: i,
              eventInterceptor: s,
              eventHooks: n,
            },
          } = this.growingIO,
          { scene: o, currentPage: r } = n,
          a = Object.assign(
            Object.assign(
              {
                eventType: 'PAGE',
                referralPage:
                  (null == e ? void 0 : e.path) ||
                  (null == e ? void 0 : e.p) ||
                  (o ? `scn:${t.scnPrefix}${o}` : null),
              },
              i()
            ),
            { timestamp: r.time }
          );
        q(r.pageProps[a.path]) || (a.attributes = r.pageProps[a.path]), s(a);
      }),
      (this.prevEvent = {}),
      (this.argQuery = {});
  }
}
class Ft {
  constructor(t) {
    var e, i, s;
    (this.growingIO = t),
      (this.toggleShareOut = (t) => {
        h(t) ? (this.shareOut = t) : (this.shareOut = !this.shareOut);
      }),
      (this.isNormalFc = (t, e) => p(e) && 'constructor' !== t),
      (this.objectTraverse = (t, e) => {
        Object.getOwnPropertyNames(t).forEach((i) => e(i, t)),
          k(t, 'methods') &&
            Object.getOwnPropertyNames(t.methods).forEach((i) => {
              t[i] || e(i, t.methods);
            }),
          k(t, 'lifetimes') &&
            Object.getOwnPropertyNames(t.lifetimes).forEach((i) => {
              t[i] || e(i, t.lifetimes);
            }),
          k(t, 'pageLifetimes') &&
            Object.getOwnPropertyNames(t.pageLifetimes).forEach((i) => {
              t[i] || e(i, t.pageLifetimes);
            });
      }),
      (this.supLifeFcs = (t, e) => {
        v(this[e + 'Handlers']) &&
          this[e + 'Handlers'].forEach((e) => {
            p(t[e]) || ['onShareAppMessage', 'onShareTimeline'].includes(e) || (t[e] = () => {});
          });
      }),
      (this.lifeFcEffects = (t, e, i) => {
        const s = this;
        return ['onShareTimeline', 'onAddToFavorites'].includes(t)
          ? function () {
              let n = e.apply(this, arguments);
              'onShareTimeline' === t &&
                s.growingIO.vdsConfig.followShare &&
                (n = s.currentPage.updateTimelineResult(s.growingIO, null != n ? n : {})),
                'onAddToFavorites' === t &&
                  (n = s.currentPage.updateAddFavoritesResult(s.growingIO, null != n ? n : {}));
              const o = [].slice.call(arguments);
              return n && o.push(n), s[`def${i}Cbs`][t].apply(this, o), n;
            }
          : function () {
              return Ct(this, arguments, void 0, function* () {
                let n;
                try {
                  'onShareAppMessage' === t &&
                    ((n = yield e.apply(this, arguments)),
                    s.growingIO.vdsConfig.followShare &&
                      (n = s.currentPage.updateAppMessageResult(s.growingIO, null != n ? n : {})));
                  const o = [].slice.call(arguments);
                  n && o.push(n), s[`def${i}Cbs`][t].apply(this, o);
                } catch (t) {
                  $(t, 'error');
                }
                return (
                  'onShareAppMessage' !== t && (n = e.apply(this, arguments)),
                  s.growingIO.emitter.emit('minipLifecycle', {
                    event: `${i} ${t}End`,
                    timestamp: Date.now(),
                    params: { instance: this, arguments: Array.from(arguments) },
                  }),
                  n
                );
              });
            };
      }),
      (this.customFcEffects = (t, e) => {
        const i = this;
        return function () {
          var s, n;
          let o;
          try {
            let e = arguments[0] || {};
            (k(e, 'type') &&
              ((null == e ? void 0 : e.currentTarget) || (null == e ? void 0 : e.target))) ||
              (e = arguments[arguments.length - 1]),
              ((null == e ? void 0 : e.currentTarget) || (null == e ? void 0 : e.target)) &&
                i.actionEventTypes.includes(e.type) &&
                (p(i.actionEffects) ||
                  (i.actionEffects =
                    (null ===
                      (n =
                        null === (s = i.growingIO.plugins) || void 0 === s
                          ? void 0
                          : s.gioEventAutoTracking) || void 0 === n
                      ? void 0
                      : n.main) || function () {}),
                null == i || i.actionEffects(e, t));
          } catch (t) {
            $(t, 'error');
          }
          return (o = e.apply(this, arguments)), o;
        };
      }),
      (this.appApplyProxy = (t, e) =>
        this.appHandlers.includes(t)
          ? this.lifeFcEffects(t, e, 'App')
          : this.autotrack
          ? this.customFcEffects(t, e)
          : e),
      (this.pageApplyProxy = (t, e) =>
        this.pageHandlers.includes(t)
          ? this.lifeFcEffects(t, e, 'Page')
          : this.autotrack
          ? this.customFcEffects(t, e)
          : e),
      (this.appOverriding = (t) => (
        this.supLifeFcs(t, 'app'),
        this.objectTraverse(t, (t, e) => {
          this.isNormalFc(t, e[t]) && (e[t] = this.appApplyProxy(t, e[t]));
        }),
        t
      )),
      (this.pageOverriding = (t) => (
        this.supLifeFcs(t, 'page'),
        this.objectTraverse(t, (t, e) => {
          this.isNormalFc(t, e[t]) && (e[t] = this.pageApplyProxy(t, e[t]));
        }),
        t
      )),
      (this.componentOverriding = (t) => (
        t.methods || (t.methods = {}),
        this.supLifeFcs(t.methods, 'page'),
        this.objectTraverse(t.methods, (t, e) => {
          this.isNormalFc(t, e[t]) && (e[t] = this.pageApplyProxy(t, e[t]));
        }),
        t
      )),
      (this.growingApp = (t) => this.originalApp(this.appOverriding(t))),
      (this.growingPage = (t) => this.originalPage(this.pageOverriding(t))),
      (this.growingComponent = (t) => this.originalComponent(this.componentOverriding(t))),
      (this.growingBehavior = (t) => this.originalBehavior(this.componentOverriding(t))),
      (this.nativeGrowing = (t = ['App', 'Page', 'Component', 'Behavior']) => {
        const e = this,
          { platformConfig: i } = this.growingIO,
          s = i.hooks;
        if (t.includes('App'))
          try {
            s.App &&
              !this.appHooked &&
              ((App = function () {
                return e.growingApp(arguments[0]);
              }),
              (this.appHooked = !0));
          } catch (t) {}
        if (t.includes('Page'))
          try {
            s.Page &&
              !this.pageHooked &&
              ((Page = function () {
                return e.growingPage(arguments[0]);
              }),
              (this.pageHooked = !0));
          } catch (t) {}
        if (t.includes('Component'))
          try {
            s.Component &&
              !this.componentHooked &&
              ((Component = function () {
                return e.growingComponent(arguments[0]);
              }),
              (this.componentHooked = !0));
          } catch (t) {}
        if (t.includes('Behavior'))
          try {
            s.Behavior &&
              !this.behaviorHooked &&
              ((Behavior = function () {
                return e.growingBehavior(arguments[0]);
              }),
              (this.behaviorHooked = !0));
          } catch (t) {}
      }),
      (this.initEventHooks = () => {
        const t = this,
          { platformConfig: e, gioPlatform: i } = this.growingIO;
        this.appHandlers.forEach((e) => {
          this.defAppCbs[e] = function () {
            t.appEffects.main(e, arguments);
          };
        }),
          this.pageHandlers.forEach((e) => {
            this.defPageCbs[e] = function () {
              t.pageEffects.main(this, e, arguments);
            };
          }),
          e.canHook
            ? this.nativeGrowing()
            : 'quickapp' === i &&
              ((window.GioApp = function () {
                return t.appOverriding(arguments[0]);
              }),
              (window.GioPage = function () {
                return t.pageOverriding(arguments[0]);
              }),
              (window.GioComponent = function () {
                return t.pageOverriding(arguments[0]);
              })),
          (this.growingIO.App = U(() => App)),
          (this.growingIO.Page = U(() => Page)),
          (this.growingIO.Component = U(() => Component)),
          (this.growingIO.Behavior = U(() => Behavior)),
          'quickapp' === i &&
            ((this.growingIO.GioApp = window.GioApp),
            (this.growingIO.GioPage = window.GioPage),
            (this.growingIO.GioComponent = window.GioComponent));
      });
    const n = null === (e = this.growingIO) || void 0 === e ? void 0 : e.platformConfig;
    (this.autotrack =
      this.growingIO.vdsConfig.autotrack && this.growingIO.plugins.gioEventAutoTracking),
      (this.defAppCbs = {}),
      (this.defPageCbs = {}),
      (this.appHandlers = n.appHandlers),
      (this.pageHandlers = n.pageHandlers),
      (this.actionEventTypes = n.actionEventTypes),
      (this.originalApp = n.originalApp),
      (this.originalPage = n.originalPage),
      (this.originalComponent = n.originalComponent),
      (this.originalBehavior =
        null !== (i = n.originalBehavior) && void 0 !== i ? i : function () {}),
      (this.appEffects = new qt(this.growingIO)),
      (this.pageEffects = new Lt(this.growingIO)),
      (this.currentPage = new Ht(this.growingIO)),
      (this.shareOut = !1),
      (this.keepAlive =
        null === (s = this.growingIO) || void 0 === s ? void 0 : s.vdsConfig.keepAlive);
  }
}
class Dt {
  constructor(s) {
    (this.growingIO = s),
      (this.ALLOW_SETTING = Object.assign({}, t, 'saas' === this.growingIO.gioEnvironment ? i : e)),
      (this.allowOptKeys = C(this.ALLOW_SETTING)),
      (this.initStorageInfo = () => {
        const { minipInstance: t } = this.growingIO,
          e = it();
        let i = e.gio_esid ? e.gio_esid : t.getStorageSync(this.esidStorageName);
        (i = c(i) && !g(i) ? i : {}),
          (this._esid = {}),
          C(i).forEach((t) => {
            this._esid[t] = Number.isNaN(Number(i[t])) || i[t] >= 1e9 || 1 > i[t] ? 1 : i[t];
          }),
          x(i, this._esid) || t.setStorageSync(this.esidStorageName, this._esid);
        const s = e.gio_gsid
          ? e.gio_gsid
          : Number.parseInt(t.getStorageSync(this.gsidStorageName), 10);
        (this._gsid = Number.isNaN(s) || s >= 1e9 || 1 > s ? 1 : s),
          (this._stid = this._gsid),
          s !== this._gsid && t.setStorageSync(this.gsidStorageName, this._gsid);
      }),
      (this.saveStorageInfo = () => {
        const { minipInstance: t } = this.growingIO;
        (this._stid = this._gsid),
          rt(t, [
            { key: this.esidStorageName, value: this._esid },
            { key: this.gsidStorageName, value: this._gsid },
          ]);
      }),
      (this.initOptions = (t) => {
        var e, i, s, n, o, r, g, u, d, h, c;
        const { projectId: p, dataSourceId: m, appId: f } = t,
          I = {};
        this.allowOptKeys.forEach((e) => {
          const i = this.ALLOW_SETTING[e].type;
          (v(i) ? i.includes(H(t[e])) : H(t[e]) === this.ALLOW_SETTING[e].type)
            ? 'ignoreFields' === e
              ? (I.ignoreFields = t.ignoreFields.filter((t) => a.includes(t)))
              : 'extraParams' === e
              ? (I.extraParams = t.extraParams.filter((t) => l.includes(t)))
              : (I[e] = t[e])
            : (I[e] = this.ALLOW_SETTING[e].default);
        }),
          (I.uploadInterval = Math.round(I.uploadInterval)),
          (Number.isNaN(I.uploadInterval) || 0 > I.uploadInterval || I.uploadInterval > 2e3) &&
            (I.uploadInterval = 1e3),
          (this.growingIO.vdsConfig = Object.assign(Object.assign({}, I), {
            projectId: p,
            dataSourceId: m,
            appId: f,
            performance: {
              monitor:
                null === (i = null === (e = I.performance) || void 0 === e ? void 0 : e.monitor) ||
                void 0 === i ||
                i,
              exception:
                null ===
                  (n = null === (s = I.performance) || void 0 === s ? void 0 : s.exception) ||
                void 0 === n ||
                n,
              network:
                null !== (r = null === (o = I.performance) || void 0 === o ? void 0 : o.network) &&
                void 0 !== r &&
                r,
            },
          })),
          I.dataCollect || $('已关闭数据采集', 'info'),
          I.autotrack || $('已关闭无埋点', 'info'),
          this.growingIO.inPlugin && (this.growingIO.vdsConfig.autotrack = !1);
        const { cml: y, uniVue: S, wepy: w, taro: O, remax: b } = I;
        'full' !== this.growingIO.gioFramework ||
          y ||
          S ||
          w ||
          O ||
          b ||
          (this.growingIO.platformConfig.canHook = !0),
          (this.eventHooks = new Ft(this.growingIO)),
          this.growingIO.inPlugin || this.eventHooks.initEventHooks();
        const { plugins: T } = this.growingIO;
        y &&
          (null === (g = null == T ? void 0 : T.gioChameleonAdapter) || void 0 === g || g.main()),
          S && (null === (u = null == T ? void 0 : T.gioUniAppAdapter) || void 0 === u || u.main()),
          w && (null === (d = null == T ? void 0 : T.gioWepyAdapter) || void 0 === d || d.main()),
          O && (null === (h = null == T ? void 0 : T.gioTaroAdapter) || void 0 === h || h.main()),
          b && (null === (c = null == T ? void 0 : T.gioRemaxAdapter) || void 0 === c || c.main());
      }),
      (this.setOption = (t, e) => {
        var i;
        const { vdsConfig: s, callError: n, uploader: o, emitter: r } = this.growingIO,
          a = u(t) && this.allowOptKeys.includes(t),
          l =
            a &&
            typeof e === (null === (i = this.ALLOW_SETTING[t]) || void 0 === i ? void 0 : i.type);
        if (a && l) {
          if ('dataCollect' === t && !1 === s.dataCollect && !0 === e) {
            const t = setTimeout(() => {
              this.sendVisit(), this.sendPage(), clearTimeout(t);
            });
          }
          return (
            (s[t] = e),
            ['host', 'scheme'].includes(t) && (null == o || o.generateURL()),
            r.emit('OPTION_CHANGE', { optionName: t, optionValue: e }),
            !0
          );
        }
        return n('setOption > ' + t), !1;
      }),
      (this.getOption = (t) => {
        const { vdsConfig: e, callError: i } = this.growingIO;
        return t && k(e, w(t)) ? e[w(t)] : g(t) ? Object.assign({}, e) : void i('getOption > ' + t);
      }),
      (this.sendVisit = () => {
        this.eventHooks.appEffects.buildVisitEvent(this.lastVisitEvent);
      }),
      (this.sendPage = () => {
        this.eventHooks.pageEffects.buildPageEvent();
      }),
      (this.eventInterceptor = (t) => {
        const { systemInfo: e, network: i } = this.growingIO.minipInstance;
        q(e) || q(i)
          ? this.interceptEvents.push(t)
          : q(this.interceptEvents)
          ? this.eventConverter(t)
          : ([...this.interceptEvents, t].forEach((t) => {
              const e = Object.assign(
                Object.assign({}, t),
                this.eventContextBuilder({ path: t.path, query: t.query, timestamp: t.timestamp })
              );
              this.eventConverter(e);
            }),
            (this.interceptEvents = []));
      }),
      (this.eventReleaseInspector = () => {
        const {
          minipInstance: { systemInfo: t, network: e },
        } = this.growingIO;
        t &&
          e &&
          !q(this.interceptEvents) &&
          ([...this.interceptEvents].forEach((t) => {
            const e = Object.assign(
              Object.assign({}, t),
              this.eventContextBuilder({ path: t.path, query: t.query, timestamp: t.timestamp })
            );
            this.eventConverter(e);
          }),
          (this.interceptEvents = []));
      }),
      (this.buildAppMessageEvent = (t) => {}),
      (this.buildTimelineEvent = (t) => {}),
      (this.buildAddFavorites = (t) => {}),
      (this.esidStorageName = '_growing_esid_'),
      (this.gsidStorageName = '_growing_gsid_'),
      this.initStorageInfo(),
      (this.eventContextBuilder = new jt(this.growingIO).main),
      (this.lastVisitEvent = {}),
      (this.lastPageEvent = {}),
      (this.locationData = {}),
      (this.generalProps = {}),
      (this.interceptEvents = []),
      this.growingIO.emitter.on('onComposeAfter', ({ composedEvent: t }) => {
        ('VISIT' !== t.eventType && 'vst' !== t.t) || (this.lastVisitEvent = t),
          ('PAGE' !== t.eventType && 'page' !== t.t) || (this.lastPageEvent = t);
      });
  }
  get esid() {
    const t = it(),
      e = et(t);
    return !q(e) && t.gio_esid ? t.gio_esid : this._esid;
  }
  set esid(t) {
    const e = {};
    C(t).forEach((i) => {
      e[i] = Number.isNaN(t[i]) || t[i] >= 1e9 || 1 > t[i] ? 1 : t[i];
    }),
      x(e, this._esid) || ((this._esid = e), (it().gio_esid = this._esid));
  }
  get gsid() {
    const t = it(),
      e = et(t);
    return !q(e) && t.gio_gsid ? t.gio_gsid : this._gsid;
  }
  set gsid(t) {
    const e = Number.parseInt(t, 10);
    (this._gsid = Number.isNaN(e) || t >= 1e9 || 1 > t ? 1 : t),
      (it().gio_gsid = this._gsid),
      10 > this._gsid - this._stid || this.saveStorageInfo();
  }
}
class Bt extends Dt {
  constructor(t) {
    super(t),
      (this.growingIO = t),
      (this.eventConverter = (t) => {
        const { vdsConfig: e, dataStore: i, uploader: s } = this.growingIO;
        if (e.dataCollect) {
          (t.globalSequenceId = i.gsid), (t.eventSequenceId = i.esid[t.eventType] || 1);
          const e = {};
          E(t, (t, i) => {
            var s;
            if ('element' === i) {
              const i = null !== (s = m(t)) && void 0 !== s ? s : {};
              E(i, (t, i) => {
                (q(t) && 0 !== t) || (e[i] = t);
              });
            } else (q(t) && 0 !== t) || (e[i] = t);
          }),
            (this.growingIO.dataStore.gsid += 1),
            (this.growingIO.dataStore.esid = Object.assign(
              Object.assign({}, this.growingIO.dataStore.esid),
              { [e.eventType]: (this.growingIO.dataStore.esid[e.eventType] || 1) + 1 }
            )),
            this.growingIO.emitter.emit('onComposeAfter', { composedEvent: e }),
            s.commitRequest(e);
        }
      }),
      (this.buildAppMessageEvent = (t) => {
        var e;
        const i = t[0];
        let s;
        2 > t.length ? 1 === t.length && (s = i) : (s = t[1]);
        const {
            dataStore: {
              eventContextBuilder: n,
              eventInterceptor: o,
              eventHooks: { currentPage: r },
            },
          } = this.growingIO,
          a = decodeURI((null == s ? void 0 : s.path) || '').split('?');
        o(
          Object.assign(
            {
              eventType: 'CUSTOM',
              eventName: '$mp_on_share',
              pageShowTimestamp: r.time,
              attributes: Object.assign(
                {
                  $from: i.from,
                  $target:
                    null === (e = null == i ? void 0 : i.target) || void 0 === e ? void 0 : e.id,
                  $share_title: null == s ? void 0 : s.title,
                  $share_path: m(a),
                  $share_query: a[1],
                },
                null == s ? void 0 : s.attributes
              ),
            },
            n()
          )
        );
      }),
      (this.buildTimelineEvent = (t) => {
        var e;
        const i = t[0];
        let s;
        2 > t.length ? 1 === t.length && (s = i) : (s = t[1]);
        const {
            dataStore: {
              eventContextBuilder: n,
              eventInterceptor: o,
              eventHooks: { currentPage: r },
            },
          } = this.growingIO,
          a = decodeURI((null == s ? void 0 : s.path) || '').split('?');
        o(
          Object.assign(
            {
              eventType: 'CUSTOM',
              eventName: '$mp_share_timeline',
              pageShowTimestamp: r.time,
              attributes: Object.assign(
                {
                  $target:
                    null === (e = null == i ? void 0 : i.target) || void 0 === e ? void 0 : e.id,
                  $share_title: null == s ? void 0 : s.title,
                  $share_path: m(a),
                  $share_query: a[1],
                },
                null == s ? void 0 : s.attributes
              ),
            },
            n()
          )
        );
      }),
      (this.buildAddFavorites = (t) => {
        const e = t[0];
        let i;
        2 > t.length ? 1 === t.length && (i = e) : (i = t[1]);
        const {
            dataStore: {
              eventContextBuilder: s,
              eventInterceptor: n,
              eventHooks: { currentPage: o },
            },
          } = this.growingIO,
          r = decodeURI((null == i ? void 0 : i.path) || '').split('?');
        n(
          Object.assign(
            {
              eventType: 'CUSTOM',
              eventName: '$mp_add_favorites',
              pageShowTimestamp: o.time,
              attributes: {
                $share_title: null == i ? void 0 : i.title,
                $share_path: m(r),
                $share_query: r[1],
              },
            },
            s()
          )
        );
      }),
      (this.trackTimers = {});
  }
}
class Rt {
  constructor(t) {
    (this.growingIO = t),
      (this.commitRequest = (t) => {
        const e = Object.assign({}, t),
          { vdsConfig: i } = this.growingIO;
        i.forceLogin
          ? this.hoardingQueue.push(e)
          : (this.requestQueue.push(e), this.initiateRequest());
      }),
      (this.initiateRequest = (t) => {
        var e, i;
        const { plugins: s, vdsConfig: n } = this.growingIO;
        [...this.hoardingQueue, ...this.requestQueue].length > 0 &&
          this.requestingNum < this.requestLimit &&
          ((
            null === (e = null == n ? void 0 : n.tbConfig) || void 0 === e
              ? void 0
              : e.cloudFuncSend
          )
            ? null === (i = null == s ? void 0 : s.gioTaobaoSendAdapter) ||
              void 0 === i ||
              i.singleInvoke()
            : t
            ? this.batchInvoke()
            : this.batchInvokeThrottle());
      }),
      (this.batchInvoke = () => {
        var t, e;
        const { vdsConfig: i, plugins: s, emitter: n } = this.growingIO;
        let o = [...this.hoardingQueue, ...this.requestQueue];
        o.length > 50
          ? ((o = o.slice(0, 50)),
            this.hoardingQueue.length > 50
              ? (this.hoardingQueue = this.hoardingQueue.slice(50))
              : ((this.hoardingQueue = []),
                (this.requestQueue = this.requestQueue.slice(50 - this.hoardingQueue.length))))
          : ((this.hoardingQueue = []), (this.requestQueue = []));
        let r = o.filter(
          (t) => (this.retryIds[t.globalSequenceId || t.esid] || 0) <= this.retryLimit
        );
        q(r) ||
          (i.debug && console.log('[GrowingIO Debug]:', JSON.stringify(r, null, 2)),
          n.emit('onSendBefore', { requestData: r }),
          (null === (t = null == i ? void 0 : i.tbConfig) || void 0 === t ? void 0 : t.cloudAppId)
            ? null === (e = null == s ? void 0 : s.gioTaobaoSendAdapter) ||
              void 0 === e ||
              e.tbCloudAppInvoke(r)
            : this.normalBatchInvoke(r));
      }),
      (this.batchInvokeThrottle = j(
        this.batchInvoke,
        this.growingIO.vdsConfig.uploadInterval,
        !1,
        !1
      )),
      (this.normalBatchInvoke = (t) => {
        var e;
        const {
          minipInstance: i,
          vdsConfig: s,
          emitter: n,
          plugins: o,
          gioEnvironment: r,
        } = this.growingIO;
        this.requestingNum += 1;
        const a = { 'content-type': 'application/json;charset=UTF-8' };
        let l = [...t];
        const g =
          s.compress &&
          (null === (e = null == o ? void 0 : o.gioCompress) || void 0 === e
            ? void 0
            : e.compressToUTF16);
        'cdp' === r &&
          g &&
          ((l = o.gioCompress.compressToUTF16(JSON.stringify(t))), (a['X-Compress-Codec'] = '1')),
          i.request({
            url: `${this.requestURL}?stm=${Date.now()}${
              'cdp' === r ? '&compress=' + (g ? '1' : '0') : ''
            }`,
            header: a,
            method: 'POST',
            data: l,
            timeout: this.requestTimeout,
            fail: (e) => {
              [200, 204].includes(e.code) ||
                (v(t)
                  ? t.forEach((t) => {
                      this.requestFailFn(t);
                    })
                  : this.requestFailFn(t),
                $('请求失败!' + JSON.stringify(e), 'error'));
            },
            complete: (t) => {
              (this.requestingNum -= 1),
                n.emit('onSendAfter', { result: t }),
                this.initiateRequest();
            },
          });
      }),
      (this.requestFailFn = (t) => {
        if (
          (this.retryIds[t.globalSequenceId || t.esid] ||
            (this.retryIds[t.globalSequenceId || t.esid] = 0),
          (this.retryIds[t.globalSequenceId || t.esid] += 1),
          !this.requestQueue.some(
            (e) => e.globalSequenceId === t.globalSequenceId && e.esid === t.esid
          ))
        ) {
          let e = setTimeout(() => {
            q(this.requestQueue)
              ? (this.requestQueue.push(t), this.initiateRequest())
              : this.requestQueue.push(t),
              clearTimeout(e),
              (e = null);
          }, 800);
        }
      }),
      (this.hoardingQueue = []),
      (this.requestQueue = []),
      (this.requestLimit = 3),
      (this.requestTimeout = 5e3),
      (this.retryLimit = 2),
      (this.retryIds = {}),
      (this.requestingNum = 0),
      (this.requestURL = '');
  }
}
class $t extends Rt {
  constructor(t) {
    super(t),
      (this.growingIO = t),
      (this.generateURL = () => {
        let { scheme: t, host: e = '', projectId: i } = this.growingIO.vdsConfig;
        t ? _(w(t), '://') || (t += '://') : (t = 'https://'),
          T(e, 'http') && (e = e.substring(e.indexOf('://') + (_(w(t), '://') ? 4 : 1))),
          (this.requestURL = `${t}${e}/v3/projects/${i}/collect`);
      }),
      this.generateURL();
  }
}
const Ut = new (class extends Nt {
    constructor() {
      var t, e;
      super(),
        (this.registerPlugins = (t) => {
          (this.plugins.pluginItems = [...this.plugins.pluginItems, ...t]),
            this.plugins.installAll(t);
        }),
        (this.initCallback = () => {
          (this.uploader = new $t(this)),
            this.vdsConfig.enableIdMapping || (this.userStore.userKey = '');
        }),
        (this.setTrackerScheme = (t) => {
          ['http', 'https'].includes(t)
            ? (this.dataStore.setOption('scheme', t), this.notRecommended())
            : this.callError('scheme', !1);
        }),
        (this.setTrackerHost = (t) => {
          gt.test(t) || ut.test(t)
            ? (this.dataStore.setOption('host', t), this.notRecommended())
            : this.callError('host', !1);
        }),
        (this.identify = (t) => {
          if (this.vdsConfig.forceLogin) {
            if (!lt(t)) return void this.callError('identify');
            const e = w(t).slice(0, 1e3);
            (this.userStore.uid = e),
              this.uploader.hoardingQueue.forEach(
                (t, i) => (this.uploader.hoardingQueue[i].deviceId = e)
              ),
              this.dataStore.setOption('forceLogin', !1),
              this.uploader.initiateRequest(!0);
          } else this.callError('identify', !1, 'forceLogin未开启');
        }),
        (this.setUserAttributes = (t) => {
          var e, i;
          !q(t) && c(t)
            ? null ===
                (i = null === (e = this.plugins) || void 0 === e ? void 0 : e.gioCustomTracking) ||
              void 0 === i ||
              i.buildUserAttributesEvent(t)
            : this.callError('setUserAttributes');
        }),
        (this.setUserId = (t, e) => {
          if (lt(t)) {
            const i = this.userStore.gioId;
            (t = w(t).slice(0, 1e3)),
              (e = w(e).slice(0, 1e3)),
              (this.userStore.userId = t),
              this.vdsConfig.enableIdMapping && (this.userStore.userKey = g(e) ? '' : e),
              this.reissueLogic(i, t);
          } else this.callError('setUserId');
        }),
        (this.clearUserId = () => {
          (this.userStore.userId = void 0), (this.userStore.userKey = void 0);
        }),
        (this.track = (t, e, i) => {
          var s, n;
          (
            (null ===
              (n = null === (s = this.plugins) || void 0 === s ? void 0 : s.gioCustomTracking) ||
            void 0 === n
              ? void 0
              : n.buildCustomEvent) || function () {}
          )(
            t,
            Object.assign(Object.assign({}, this.dataStore.generalProps), c(e) && !q(e) ? e : {}),
            i
          );
        }),
        (this.reissueLogic = (t, e) => {
          t && t !== e && ((this.userStore.sessionId = ''), this.dataStore.sendVisit()),
            t || t === e || this.dataStore.sendVisit();
        }),
        (this.trackTimerStart = (t) =>
          !!this.vdsConfig.dataCollect &&
          K(t, () => {
            const e = M();
            return (
              (this.dataStore.trackTimers[e] = { eventName: t, leng: 0, start: +Date.now() }), e
            );
          })),
        (this.trackTimerPause = (t) => {
          if (t && this.dataStore.trackTimers[t]) {
            const e = this.dataStore.trackTimers[t];
            return e.start && (e.leng = e.leng + (+Date.now() - e.start)), (e.start = 0), !0;
          }
          return !1;
        }),
        (this.trackTimerResume = (t) => {
          if (t && this.dataStore.trackTimers[t]) {
            const e = this.dataStore.trackTimers[t];
            return 0 === e.start && (e.start = +Date.now()), !0;
          }
          return !1;
        }),
        (this.trackTimerEnd = (t, e) => {
          if (this.vdsConfig.dataCollect) {
            const i = 864e5;
            if (t && this.dataStore.trackTimers[t]) {
              const s = this.dataStore.trackTimers[t];
              if (0 !== s.start) {
                const t = +Date.now() - s.start;
                s.leng = t > 0 ? s.leng + t : 0;
              }
              return (
                this.track(
                  s.eventName,
                  Object.assign(Object.assign({}, e), {
                    event_duration: s.leng > i ? 0 : s.leng / 1e3,
                  })
                ),
                this.removeTimer(t),
                !0
              );
            }
            return $('未查找到对应的计时器，请检查!', 'error'), !1;
          }
          return !1;
        }),
        (this.removeTimer = (t) =>
          !(!t || !this.dataStore.trackTimers[t] || (delete this.dataStore.trackTimers[t], 0))),
        (this.clearTrackTimer = () => {
          this.dataStore.trackTimers = {};
        }),
        (this.dataStore = new Bt(this)),
        p(null === (t = this.minipInstance.minip) || void 0 === t ? void 0 : t.onAppHide) &&
          this.minipInstance.minip.onAppHide(() => {
            E(this.dataStore.trackTimers, (t) => {
              t.start && (t.leng = t.leng + (+Date.now() - t.start));
            });
          }),
        p(null === (e = this.minipInstance.minip) || void 0 === e ? void 0 : e.onAppShow) &&
          this.minipInstance.minip.onAppShow(() => {
            E(this.dataStore.trackTimers, (t) => {
              t.start && (t.start = +Date.now());
            });
          });
    }
  })(),
  Vt = function () {
    const t = arguments[0];
    if (u(t) && s.includes(t) && Ut[t]) {
      const i = I(Array.from(arguments));
      if ('init' === t) {
        const t =
            (!(e = Ut).vdsConfig && !e.gioSDKInitialized) ||
            ($('SDK重复初始化，请检查是否重复加载SDK或接入其他平台SDK导致冲突!', 'warn'), !1),
          s = ((t) =>
            !!y(t) ||
            ($(
              'SDK初始化失败，请使用 gdp("init", "您的GrowingIO项目 accountId", "您项目的 dataSourceId", "你的应用 AppId", options); 进行初始化!',
              'error'
            ),
            !1))(i),
          n = ((t) => {
            const e = t[0];
            let i = f(t);
            return lt(e)
              ? ((c(i) && i) || (i = {}), { projectId: e, userOptions: i })
              : ($('SDK初始化失败，accountId 参数不合法!', 'error'), !1);
          })(i),
          o = ((t) => {
            const e = t[1];
            let i = t[2];
            const s = f(t);
            return e && u(e)
              ? lt(i)
                ? { dataSourceId: e, appId: i, cdpOptions: s }
                : ($('SDK初始化失败，appId 参数不合法!', 'error'), !1)
              : ($('SDK初始化失败，dataSourceId 参数不合法!', 'error'), !1);
          })(i);
        if (t && s && n && o) {
          const { projectId: t } = n,
            { dataSourceId: e, appId: i, cdpOptions: s } = o;
          return Ut.init(
            Object.assign(Object.assign({}, s), { projectId: t, dataSourceId: e, appId: i })
          );
        }
      } else if ('registerPlugins' === t) Ut.registerPlugins(i[0]);
      else {
        if (Ut.gioSDKInitialized && Ut.vdsConfig) return Ut[t](...i);
        $('SDK未初始化!', 'error');
      }
    } else
      r.includes(t)
        ? $(`方法 ${w(t)} 已被弃用!`, 'warn')
        : $(`不存在名为 ${w(t)} 的方法调用!`, 'error');
    var e;
  };
(st().gdp = Vt), (st().gioEnvironment = 'cdp'), (st().gioSDKVersion = Ut.sdkVersion);
export { Vt as default };
