import React from 'react';
import { View, Image } from '@tarojs/components';
import './index.scss';
import PanelBtn from '@hideaway/assets/poster/icons/panel-btn.png';
import PanelBtnOff from '@hideaway/assets/poster/icons/panel-btn-off.png';

import Navbar, { NAVBAR_HEIGHT } from '@components/Basic/Navbar';
import useBoolean from '@hooks/useBoolean';
export default React.memo(({ onClick }: { onClick?: () => void }) => {
  const [openFlag, , , toggle] = useBoolean(true);
  return (
    <View className='panel-btn-wrapper' style={{ top: NAVBAR_HEIGHT }}>
      <View className='toggler' onClick={toggle}></View>
      <View>
        {openFlag ? (
          <Image className='panel-open' src={PanelBtn} onClick={onClick} mode='heightFix'></Image>
        ) : (
          <Image className='panel-close' src={PanelBtnOff} mode='heightFix'></Image>
        )}
      </View>
    </View>
  );
});
