import React from 'react';
import cx from 'classnames';
import { Image, View, Block } from '@tarojs/components';
import Delete from '@hideaway/assets/poster/icons/delete.svg';
import Scale from '@hideaway/assets/poster/icons/scale.svg';
import { radToDeg } from '../../utils/rotations';
import './index.scss';

type EditableItemProps = {
  id: number;
  active: boolean;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onTouchStart: (e: { id; target }) => void;
  onDelete: (id) => void;
  rotation: number;
};

const EditableItem = React.memo(
  ({
    id,
    active,
    src,
    x,
    y,
    width,
    height,
    onTouchStart,
    onDelete,
    rotation,
  }: EditableItemProps) => {
    const _onBodyTouchStart = (e) => {
      e.stopPropagation();
      onTouchStart({
        id: id,
        target: 'body',
        ...e,
      });
    };
    const _onRemoveTouchStart = (e) => {
      e.stopPropagation();
      onDelete(id);
    };
    const _onScaleTouchStart = (e) => {
      e.stopPropagation();
      onTouchStart({
        id: id,
        target: 'ctrl',
        ...e,
      });
    };
    const rotationInDeg = radToDeg(rotation);
    const cosV = Math.cos(rotation);
    const sinV = Math.sin(rotation);
    return (
      <View
        style={{
          transform: `matrix(${cosV},${sinV},${-sinV},${cosV},${Math.round(x)},${Math.round(y)})`,
        }}
        className={cx('editable-item', { active })}
      >
        {active && (
          <Block>
            <Image
              className='controls rotate'
              src={Delete}
              mode='aspectFit'
              onTouchStart={_onRemoveTouchStart}
              style={{
                transform: `translate(${-width * 0.5 - 12.5}px,${
                  -height * 0.5 - 12.5
                }px) rotate(${-rotationInDeg}deg)`,
              }}
            ></Image>
            <Image
              className='controls delete'
              src={Scale}
              onTouchStart={_onScaleTouchStart}
              mode='aspectFit'
              style={{
                transform: `translate(${width * 0.5 - 12.5}px,${height * 0.5 - 12.5}px)`,
              }}
            ></Image>
          </Block>
        )}
        <Image
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          onTouchStart={_onBodyTouchStart}
          className='image'
          src={src}
          mode='scaleToFill'
        ></Image>
      </View>
    );
  }
);
export default EditableItem;
