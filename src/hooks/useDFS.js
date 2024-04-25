import { useEffect } from 'react';
import { GlobalService } from '@api/global.services';
import useStore from '@stores';

export default function useDFS() {
  const store = useStore();
  const language = useStore((state) => state.language);

  const _getDfs = async () => {
    const result = await GlobalService.getDfs();
    const dfs = {};
    result?.data?.forEach((item) => {
      dfs[item.id] = item?.attributes?.icon?.data?.attributes?.url || '';
    });
    store.setDfs(dfs);
  };
  useEffect(() => {
    _getDfs();
  }, [language]);
}
