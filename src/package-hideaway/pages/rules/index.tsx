import React from 'react';
import Taro from '@tarojs/taro';

import { View } from '@tarojs/components';
import Navbar from '@components/Basic/Navbar';
import Header from '@components/Basic/Header';

export default function Rule() {
  return (
    <View>
      <Navbar holdPlace transparent={false}>
        <Header title={'详细规则'}></Header>
      </Navbar>
      this is gameRule
    </View>
  );
}
