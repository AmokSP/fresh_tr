import HideawayService from '@api/hideaway.service';
import useAsync from '@hooks/useAsync';
import Taro, { useDidHide, useDidShow } from '@tarojs/taro';
import { useEffect, useRef } from 'react';
import useStore from '@stores';
export default function useShareStatusQuery(): { receivedCount: number; summary: number } {
  const timer = useRef<NodeJS.Timeout>();
  const isLogin = useStore((state) => {
    return state.isLogin;
  });
  const { value: result, execute } = useAsync(() => {
    return new Promise((resolve, reject) => {
      if (!isLogin) return resolve(null);
      HideawayService.getShareStatus().then(resolve).catch(reject);
    });
  });
  // const { value: result, execute } = useAsync(HideawayService.getShareStatus);
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);
  useDidShow(() => {
    execute();
    clearInterval(timer.current);
    timer.current = setInterval(execute, 10000);
  });
  useEffect(() => {
    if (isLogin) {
      execute();
      clearInterval(timer.current);
      timer.current = setInterval(execute, 10000);
    }
  }, [isLogin]);
  useDidHide(() => {
    clearInterval(timer.current);
  });
  return { receivedCount: result?.receivedCount ?? 0, summary: result?.receivedCount ?? 0 };
}
