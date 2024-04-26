import { useEffect } from 'react';
import { GlobalService } from '@api/global.services';
import useStore from '@stores';

export default function useTabbarSetting() {
  const store = useStore();

  const getRecommendSetting = async () => {
    const { data } = await GlobalService.getShowRecommend();
    store.setShowRecommend(data?.attributes.showRecommend);
  };
  useEffect(() => {
    getRecommendSetting();
  }, []);
}
