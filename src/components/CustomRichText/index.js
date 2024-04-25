import { useEffect } from 'react';

import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { goto } from '@utils/index';
import './rich.scss';
import styles from './index.module.scss';

const links = [];

Taro.options.html.skipElements.add('view');

Taro.options.html.transformText = (taroText) => {
  const text = document.createElement('text');
  text.setAttribute('decode', 'true');
  text.appendChild(taroText);
  return text;
};

Taro.options.html.transformElement = (el) => {
  if (el.h5tagName === 'a') {
    const id = links.length + 1;
    el.setAttribute('id', `link_${id}`);
    links.push({
      el,
      id: `link_${id}`,
      link: el.props.href,
    });
  }
  if (el.nodeName === 'image') {
    el.setAttribute('mode', 'widthFix');
  }
  return el;
};

export default function CustomRichText({ content }) {
  if (content) {
    content = content?.replaceAll('fresh-tr-cms-uat.lvmh-pc.cn', 'tr-cdn-uat.fresh-cn.com');
    content = content?.replaceAll('fresh-tr-cms.lvmh-pc.cn', 'tr-cdn.fresh-cn.com');
  }

  const handleClick = (e) => {
    const { id } = e.mpEvent.currentTarget;
    const target = links.find((item) => item.id === id);
    goto({ url: target.link });
  };
  useEffect(() => {
    if (content) {
      if (links.length > 0) {
        links.forEach((link) => {
          const el = document.getElementById(link.id);
          el && el.addEventListener('tap', handleClick);
        });
      }
    }
    return () => {
      if (links.length > 0) {
        links.forEach((link) => {
          const el = document.getElementById(link.id);
          el && el.removeEventListener('tap', handleClick);
        });
      }
    };
  }, [content]);
  return (
    <View className={styles['richText']}>
      <View dangerouslySetInnerHTML={{ __html: content }} className='taro_html'></View>
    </View>
  );
}
