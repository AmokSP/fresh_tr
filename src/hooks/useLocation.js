import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';

export default function useLocation({ manual = false }) {
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(DEFAULT_LOCATION);

  const _getLocation = () => {
    Taro.getFuzzyLocation({
      success: (res) => {
        setResult({
          LAT: res.latitude,
          LNG: res.longitude,
        });
      },
      complete: () => {
        setSuccess(true);
      },
    });
  };

  const run = () => {
    _getLocation();
  };

  useEffect(() => {
    if (!manual) {
      _getLocation();
    }
  }, []);

  return {
    success,
    result,
    run,
  };
}
