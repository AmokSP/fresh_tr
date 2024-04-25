import Taro from '@tarojs/taro';

export class TaskService {
  public static async complete(sign: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const header = {
        Authorization: `${sign}`,
      };
      Taro.request({
        url: `${TASK_URL}/openapi/v1/task/complete`,
        method: 'GET',
        header,
        timeout: 10000,
        success: (res) => {
          resolve(res.data);
        },
        fail: () => {
          reject('error');
        },
      });
    });
  }
}
