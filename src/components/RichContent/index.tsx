import React from 'react';
import { RichText } from '@tarojs/components';
import styles from './index.module.scss';

interface IP {
  content: any;
}
const modifyRichTextImages = (string?: string): string => {
  return (string ?? '').replace(/<img\s/gi, '<img class="img-in-rich"');
};

export default React.memo(({ content }: IP) => (
  <RichText
    space='nbsp'
    className={styles['template-rich-text']}
    nodes={modifyRichTextImages(content)}
  />
));
