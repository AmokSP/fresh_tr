import { useState } from 'react';
import { auth } from '@api/auth';
import { Tracking } from '@utils/tracking';
import { showLoading, hideLoading } from '@utils/index';
import useStore from '@stores';

export default function useLogin() {
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(null);
  const store = useStore();
  const login = async () => {
    try {
      showLoading();
      const _result = await auth();
      setSuccess(true);
      setResult(_result);
      store.setUserInfo(_result);
      store.setIsLogin(true);
      const { openId, unionId } = _result?.profile;
      Tracking.setUserInfo({ openId, unionId });
      Tracking.setUserId(_result?.accountId);
      Tracking.identify(unionId);
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };
  useState(() => {
    login();
  }, []);

  return {
    success,
    result,
  };
}
