let e;
var t = {
  name: 'gioEventAutoTracking',
  method: class {
    constructor(t) {
      (this.growingIO = t),
        (this.main = (t, n) => {
          var i, a;
          const { vdsConfig: o, platformConfig: r, plugins: s, emitter: l } = this.growingIO;
          if (
            !o.autotrack ||
            !n ||
            e.get(t, 'currentTarget.dataset.growingIgnore') ||
            e.get(t, 'target.dataset.growingIgnore') ||
            (!e.get(t, 'target.dataset.growingTrack') &&
              'autoplay' === e.get(t, 'detail.source')) ||
            (t.type === (null === (i = this.prevEvent) || void 0 === i ? void 0 : i.type) &&
              10 >
                Math.abs(
                  Number(t.timeStamp) -
                    Number(null === (a = this.prevEvent) || void 0 === a ? void 0 : a.timeStamp)
                ))
          )
            return;
          if (
            ((this.prevEvent = t),
            o.uniVue && (n = null == s ? void 0 : s.gioUniAppAdapter.getHandlerName(n, t)),
            o.taro && ['eh'].includes(n))
          )
            return;
          if (o.cml && ['_cmlEventProxy', 'onclick', 'blurEvent', 'handleDetail'].includes(n))
            return;
          o.remax &&
            n.indexOf('$$REMAX_METHOD') > -1 &&
            (n = null == s ? void 0 : s.gioRemaxAdapter.getHandlerName(n)),
            o.debug && console.log('Action：', t.type, Date.now()),
            l.emit('onComposeBefore', { event: n, params: null != t ? t : {} });
          const g = r.listeners.actions;
          g.click.includes(t.type)
            ? this.buildClickEvent(t, n)
            : g.change.includes(t.type)
            ? this.buildChangeEvent(t, n)
            : g.submit.includes(t.type) && this.buildSubmitEvent(t, n);
        }),
        (this.getNodeXpath = (e, t) => {
          const { gioPlatform: n, vdsConfig: i } = this.growingIO;
          let a = (e.currentTarget || e.target).id;
          if (
            ((!a ||
              ('swan' === n && /^_[0-9a-f]+/.test(a)) ||
              (((e) => {
                const { Current: t, createComponent: n } = e;
                return !(!e || !t || n);
              })(i.taro) &&
                /^_n_[0-9]+$/.test(a))) &&
              (a = ''),
            !i.octopus ||
              ((t = e.handler),
              /^bound .*/.test(t) && (t = t.replace('bound ', '')),
              /^t[0-9]+$/.test(a) && (a = ''),
              a && !t && (t = 'anonymousFunc'),
              a || t))
          )
            return `${a}#${t}`;
        }),
        (this.buildClickEvent = (t, n) => {
          var i, a, o;
          const r = this.getNodeXpath(t, n);
          if (r) {
            const {
                dataStore: { eventContextBuilder: n, eventInterceptor: s, eventHooks: l },
                gioEnvironment: g,
              } = this.growingIO,
              d = t.currentTarget || t.target;
            let u;
            e.has(null == d ? void 0 : d.dataset, 'index') &&
              '' !==
                (null === (i = null == d ? void 0 : d.dataset) || void 0 === i
                  ? void 0
                  : i.index) &&
              ((u = Number.parseInt(d.dataset.index, 10)), Number.isNaN(u) && (u = -1)),
              s(
                Object.assign(
                  {
                    eventType: 'saas' === g && t.type.includes('long') ? 'lngprss' : 'VIEW_CLICK',
                    pageShowTimestamp: l.currentPage.time,
                    element: [
                      {
                        xpath: r,
                        index: u,
                        textValue:
                          null === (a = null == d ? void 0 : d.dataset) || void 0 === a
                            ? void 0
                            : a.title,
                        hyperlink:
                          null === (o = null == d ? void 0 : d.dataset) || void 0 === o
                            ? void 0
                            : o.src,
                      },
                    ],
                  },
                  n()
                )
              );
          }
        }),
        (this.buildTabClickEvent = (t) => {
          const {
            dataStore: { eventContextBuilder: n, eventInterceptor: i, eventHooks: a },
          } = this.growingIO;
          i(
            Object.assign(
              {
                eventType: 'VIEW_CLICK',
                pageShowTimestamp: a.currentPage.time,
                element: [
                  {
                    xpath: '#onTabItemTap',
                    textValue: t.text,
                    index: t.index,
                    hyperlink: e.toString(t.pagePath),
                  },
                ],
              },
              n()
            )
          );
        }),
        (this.buildChangeEvent = (t, n) => {
          var i, a;
          const o = this.getNodeXpath(t, n);
          if (o) {
            const {
                dataStore: { eventContextBuilder: n, eventInterceptor: r, eventHooks: s },
              } = this.growingIO,
              l = t.currentTarget || t.target,
              g = Object.assign(
                {
                  eventType: 'VIEW_CHANGE',
                  pageShowTimestamp: s.currentPage.time,
                  element: { xpath: o },
                },
                n()
              ),
              d = e.get(t, 'detail.value') || e.get(t, 'target.attr.value');
            ((null === (i = null == l ? void 0 : l.dataset) || void 0 === i
              ? void 0
              : i.growingTrack) ||
              (null === (a = null == l ? void 0 : l.dataset) || void 0 === a
                ? void 0
                : a.growingtrack)) &&
              (e.isNil(d) || (g.element.textValue = e.toString(d))),
              (g.element = [g.element]),
              r(g);
          }
        }),
        (this.buildSubmitEvent = (e, t) => {
          const n = this.getNodeXpath(e, t);
          if (n) {
            const {
              dataStore: { eventContextBuilder: e, eventInterceptor: t, eventHooks: i },
            } = this.growingIO;
            t(
              Object.assign(
                {
                  eventType: 'FORM_SUBMIT',
                  pageShowTimestamp: i.currentPage.time,
                  element: [{ xpath: n }],
                },
                e()
              )
            );
          }
        }),
        (e = this.growingIO.utils),
        (this.prevEvent = {});
    }
  },
};
export { t as default };
