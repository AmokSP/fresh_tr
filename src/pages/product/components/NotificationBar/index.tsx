import { memo, useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Block } from '@tarojs/components';
import cx from 'classnames';
import { notification } from '@assets/icons';
import GlobalService from '@api/global.services';
import styles from './index.module.scss';

const { windowWidth } = Taro.getSystemInfoSync();
export default memo(() => {
  const [text, setText] = useState<string>('');
  const [animationTime, setAnimationTime] = useState(0);

  const fetchNotification = async () => {
    const { data } = await GlobalService.getNotificationPDP();
    setText(data?.attributes?.notificationOnPDP);
  };
  useEffect(() => {
    fetchNotification();
  }, []);

  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery()
        .select('.notification__text')
        .boundingClientRect((res) => {
          if (res?.width > windowWidth) {
            setAnimationTime((res?.width / windowWidth) * 10);
          }
        })
        .exec();
    });
  }, [text]);

  return (
    <Block>
      {text && text.length > 0 && (
        <View className={styles['notification']}>
          <Image className={styles['notification__img']} mode='widthFix' src={notification}></Image>
          <View
            className={cx(styles['notification__text'], 'notification__text')}
            style={{
              animationName: animationTime > 0 ? 'notification' : '',
              animationDelay: '-1s',
              animationDuration: `${animationTime}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationFillMode: 'forwards',
            }}
          >
            {text}
          </View>
        </View>
      )}
    </Block>
  );
});
