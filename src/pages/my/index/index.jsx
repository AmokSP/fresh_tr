import useStore from '@stores';

import FullVersion from './full-version/index';
import DFSVersion from './dfs-version/index';

export default function Index() {
  const store = useStore();
  return store.isFromDFS ? <DFSVersion /> : <FullVersion />;
}
