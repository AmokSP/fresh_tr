import Taro, { getStorageSync, setStorageSync } from '@tarojs/taro';
import { PointService } from '@api/point.services';
import { Tracking } from '@utils/tracking';
import dayjs from 'dayjs';

export function jumpToStoreMP(data: any) {
  const mp = data?.dfsInfo?.data?.attributes;
  let path = mp?.urlTemplate;
  if (!path) return;
  path = path.replace('{outerGoodsId}', data?.outerGoodsId);
  path = path.replace('{outerSKU}', data?.outerSKU);

  Tracking.trackEvent('p_store', {
    button_id: data?.dfsInfo?.data?.attributes?.title,
  });

  Taro.navigateToMiniProgram({
    appId: mp?.appID,
    path: path || 'pages/index/index',
    extraData: mp?.params || {},
    envVersion: 'release',
    success(res) {
      console.log(res);
    },
    fail(err) {
      console.log(err);
    },
  });
}

export function completePointTask(taskName, id) {
  try {
    const tasks: string[] = getStorageSync(`POINTS__${taskName}`);
    const tasks_date: string = getStorageSync(`POINTS__${taskName}__date`);
    if (!tasks_date || dayjs().diff(tasks_date, 'day') > 0) {
      setStorageSync(`POINTS__${taskName}__date`, dayjs().format('YYYY-MM-DD'));
      setStorageSync(`POINTS__${taskName}`, []);
    }
    if (!tasks.includes(id)) {
      PointService.fireTask({ name: taskName });
      setStorageSync(`POINTS__${taskName}`, [...new Set([...tasks, id])]);
    }
  } catch (e) {
    console.log(e);
  }
}
