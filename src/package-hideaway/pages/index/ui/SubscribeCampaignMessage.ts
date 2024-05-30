import Taro from '@tarojs/taro';
import HideawayService from '@api/hideaway.service';
export default async function (templateId: string, force: boolean = false) {
  return new Promise((resolve, reject) => {
    if (templateId) {
      if (force) {
        Taro.getSetting({
          withSubscriptions: true,
          success: (res) => {
            console.log(res);
            if (
              !res.subscriptionsSetting?.mainSwitch ||
              res.subscriptionsSetting?.itemSettings?.[templateId] === 'reject'
            ) {
              Taro.showModal({
                title: '提示',
                content: '您已关闭消息订阅，请在设置中打开',
                showCancel: true,

                confirmText: '去打开',
                success: (res) => {
                  if (res.confirm) {
                    Taro.openSetting();
                  }
                },
              });
              return reject('rejected');
            }
          },
        });
      }
      Taro.requestSubscribeMessage({ tmplIds: [templateId] }).then((res) => {
        console.log(res);
        if (res[templateId] === 'accept') {
          HideawayService.subscribeNotification(templateId);
          resolve(null);
        } else {
          reject('reject');
        }
      });
    }
  });
}
