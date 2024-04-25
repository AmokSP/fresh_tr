export async function getAuthorization(
  authScope: string,
  force?,
  modalMsg?,
  onAgree?: () => void,
  onDisagree?: () => void
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const setting = await wx.getSetting();
    const modalOpt: wx.showModal.Option = {
      content: modalMsg || `需要${authScope}权限继续操作`,
    };
    if (
      setting.authSetting[authScope] != undefined &&
      !setting.authSetting[authScope]
    ) {
      if (force) {
        const modalResult = await wx.showModal(modalOpt);
        if (modalResult.confirm) {
          const newSetting = await wx.openSetting();
          if (newSetting.authSetting[authScope]) {
            resolve(null);
          } else {
            console.log("open setting fail");
            reject(null);
          }
        } else {
          if (authScope === "scope.userLocation") {
            resolve(null);
          } else {
            reject(null);
          }
        }
      } else {
        reject(1);
      }
    } else if (setting.authSetting[authScope] === undefined) {
      try {
        const authResult = await wx.authorize({ scope: authScope });
        if (authResult.errMsg == "authorize:ok") {
          onAgree && onAgree();
          resolve(null);
        } else {
          onDisagree && onDisagree();
          if (authScope === "scope.userLocation") {
            resolve(null);
          } else {
            reject(2);
          }
        }
      } catch (e) {
        if (
          authScope === "scope.userLocation" &&
          e.errMsg === "authorize:fail auth deny"
        ) {
          const modalResult = await wx.showModal(modalOpt);
          if (modalResult.confirm) {
            const newSetting = await wx.openSetting();
            if (newSetting.authSetting[authScope]) {
              resolve(null);
            } else {
              console.log("open setting fail");
              reject(null);
            }
          } else {
            if (authScope === "scope.userLocation") {
              resolve(null);
            } else {
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
