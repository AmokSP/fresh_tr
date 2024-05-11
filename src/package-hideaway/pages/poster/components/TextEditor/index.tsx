import React, { useState } from 'react';
import { Block, Button, Input, Textarea, View } from '@tarojs/components';
import './index.scss';
import HideawayService from '@api/hideaway.service';

type EditorProps = {
  target: TextField;
  onConfirm?: (content: string) => void;
  onCancel?: () => void;
};
export default React.memo(({ target, onConfirm, onCancel }: EditorProps) => {
  const [value, setValue] = useState(target.content.slice(0, target.limit));
  const onConfirmClick = async () => {
    onConfirm?.(value);
  };
  return (
    <View className='text-editor'>
      <View className='editor-body'>
        <Textarea
          className='editor'
          autoFocus={true}
          value={value}
          onInput={(e) => setValue(e.detail.value)}
          onConfirm={(e) => setValue(e.detail.value)}
          maxlength={target.limit}
          fixed={false}
          showConfirmBar={false}
        ></Textarea>
        <View className='count'>
          已输入 {value.length}/{target.limit}
        </View>
        <View className='buttons'>
          <View onClick={onCancel}>取消</View>
          <View onClick={onConfirmClick}>完成</View>
        </View>
      </View>
    </View>
  );
});
