import Taro from '@tarojs/taro';
export async function getAuthorization(
  authScope: string,
  force?,
  modalMsg?,
  onAgree?: () => void,
  onDisagree?: () => void
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const setting = await Taro.getSetting();
    const modalOpt: Taro.showModal.Option = {
      content: modalMsg || `需要${authScope}权限继续操作`,
    };
    if (setting.authSetting[authScope] != undefined && !setting.authSetting[authScope]) {
      if (force) {
        const modalResult = await Taro.showModal(modalOpt);
        if (modalResult.confirm) {
          const newSetting = await Taro.openSetting();
          if (newSetting.authSetting[authScope]) {
            resolve(null);
          } else {
            console.log('open setting fail');
            reject(null);
          }
        }
      } else {
        reject(1);
      }
    } else if (setting.authSetting[authScope] === undefined) {
      try {
        const authResult = await Taro.authorize({ scope: authScope });
        if (authResult.errMsg == 'authorize:ok') {
          onAgree && onAgree();
          resolve(null);
        } else {
          onDisagree && onDisagree();
          reject(2);
        }
      } catch (e) {
        if (e.errMsg === 'authorize:fail auth deny') {
          const modalResult = await Taro.showModal(modalOpt);
          if (modalResult.confirm) {
            const newSetting = await Taro.openSetting();
            if (newSetting.authSetting[authScope]) {
              resolve(null);
            } else {
              console.log('open setting fail');
              reject(null);
            }
          }
        } else {
          reject(3);
        }
      }
    } else {
      onAgree && onAgree();
      resolve(null);
    }
  });
}
