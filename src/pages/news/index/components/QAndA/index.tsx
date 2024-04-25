import React, { memo, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import { Tracking } from '@utils/tracking';
import cx from 'classnames';
import useBoolean from '@hooks/useBoolean';
import { squared_minus, squared_plus } from '@assets/icons';
import styles from './index.module.scss';

export default React.memo(({ data: qanda }: any) => {
  return (
    <View className={styles['q-and-a']}>
      {qanda?.map((item, index) => (
        <Expander
          key={index}
          length={qanda.length}
          index={index}
          title={item?.attributes?.question}
        >
          {item?.attributes?.answer}
        </Expander>
      ))}
    </View>
  );
});

type ExpanderProps = {
  length?: number;
  index?: number;
  expand?: boolean;
  onChange?: (t: boolean) => void;
  title: React.ReactNode;
  children?: React.ReactNode;
};

const Expander = memo(
  ({
    index = 0,
    length = -1,
    onChange = undefined,
    expand = false,
    children = undefined,
    title = '',
  }: ExpanderProps) => {
    const [open, , , toggleOpen] = useBoolean(expand);
    useEffect(() => {
      onChange?.(open);
    }, [open]);
    return (
      <View className={styles['q-and-a__expander']}>
        <View
          className={cx(
            styles['q-and-a__expander__header'],
            open && styles['q-and-a__expander__header__active'],
            length === index + 1 && styles['q-and-a__expander__header__last']
          )}
          onClick={() => {
            toggleOpen();
            Tracking.trackEvent('n_qa', {
              button_id: title,
            });
          }}
        >
          <View className={styles['q-and-a__expander__header__container']}>
            <View className={styles['q-and-a__expander__header__container__text']}>Q: {title}</View>
            <Image
              className={styles['q-and-a__expander__header__container__arrow']}
              src={open ? squared_minus : squared_plus}
            ></Image>
          </View>
        </View>
        {open && <View className={styles['q-and-a__expander__body']}>{children}</View>}
      </View>
    );
  }
);
