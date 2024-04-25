import React, { CSSProperties, memo, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import useBoolean from '@hooks/useBoolean';
import { minus, plus } from '@assets/icons';
import styles from './index.module.scss';

type ExpanderProps = {
  expand?: boolean;
  onChange?: (t: boolean) => void;
  title: React.ReactNode;
  children?: React.ReactNode;
  arrowStyle?: CSSProperties;
  remainOpen?: boolean;
};

export default memo(
  ({
    onChange = undefined,
    expand = false,
    children = undefined,
    title = '',
    remainOpen = false,
  }: ExpanderProps) => {
    const [open, , , toggleOpen] = useBoolean(expand);
    useEffect(() => {
      onChange?.(open);
    }, [open]);
    return (
      <View className={styles['expander-wrapper']}>
        <View
          className={styles['expander-wrapper__header']}
          onClick={() => {
            if (remainOpen) return;
            toggleOpen();
          }}
        >
          <View className={styles['expander-wrapper__header__container']}>
            <View className={styles['expander-wrapper__header__container__text']}>{title}</View>
            {!remainOpen && (
              <Image
                className={styles['expander-wrapper__header__container__arrow']}
                src={open ? minus : plus}
              ></Image>
            )}
          </View>
        </View>
        {open && <View className={styles['expander-body']}>{children}</View>}
      </View>
    );
  }
);
