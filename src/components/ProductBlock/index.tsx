import { memo, useEffect, useState, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, Image, Block, Navigator } from '@tarojs/components';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { PAGES } from '@app.config';
import { jumpToStoreMP } from '@utils/methods';
import { Tracking } from '@utils/tracking';
import ProductService from '@api/product.services';
import { arrow_down, checked } from '@assets/icons';
import styles from './index.module.scss';
import useStore from '@stores';

export default memo(
  ({
    size = 'm', // s = small / m = normal
    item = {},
    index = 0,
  }: any) => {
    const [open, setOpen] = useState<boolean>(false);
    const [skus, setSkus] = useState<any[]>([]);
    const [sizing, setSizing] = useState<string>('');
    const [skuIndex, setSkuIndex] = useState<number>(0);
    const [retailerInfos, setRetailerInfos] = useState<any[]>([]);
    const [headerImg, setHeaderImg] = useState<string>('');
    const defaultHeaderImg = useRef('');
    const { t } = useTranslation();
    const store = useStore();
    useEffect(() => {
      // Set default sizing
      const childProductList = item?.attributes?.skus?.data;
      childProductList && setSkus(childProductList);
      if (childProductList && childProductList[0]?.attributes?.spec) {
        setSizing(childProductList[0]?.attributes?.spec);
      }

      fetchSkus(
        childProductList.map((childProduct) => childProduct?.id.toString()),
        childProductList
      );
      defaultHeaderImg.current = item?.attributes?.headerImg?.data?.attributes?.url;
    }, [item]);

    useEffect(() => {
      const product = item?.attributes;
      if (skus[skuIndex]?.attributes?.outerSKUs.length > 0) {
        setRetailerInfos(skus[skuIndex]?.attributes?.outerSKUs);
      } else {
        setRetailerInfos(product?.outerSKUs);
      }
      if (skus && skus[skuIndex]) {
        const _headerImg = skus[skuIndex]?.attributes?.headerImg?.data?.attributes?.url;
        setHeaderImg(_headerImg || defaultHeaderImg.current);
      }
    }, [skuIndex]);

    const fetchSkus = async (ids: string[], skuList: any[]) => {
      const { data: _data } = await ProductService.getSkusByIds(ids);
      // sort sku order
      const data = skuList.map((_sku) => {
        return _data.find((_item) => _item.id === _sku.id);
      });
      setSkus(data);
      const product = item?.attributes;
      const skuData = data[skuIndex]?.attributes?.outerSKUs;

      const _headerImg = data[skuIndex]?.attributes?.headerImg?.data?.attributes?.url;
      setHeaderImg(_headerImg || defaultHeaderImg.current);

      if (skuData && skuData.length > 0) {
        setRetailerInfos(skuData);
      } else {
        setRetailerInfos(product?.outerSKUs);
      }
    };

    return (
      <Block>
        <View
          key={index}
          className={`${styles[`product-${size}`]} ${store.isFromDFS && 'from-dfs'}`}
        >
          <Navigator
            className='list-item'
            hoverClass='none'
            key={index + item?.attributes?.displayName || ''}
            url={`${PAGES.PRODUCT}?id=${item?.id}`}
          >
            <Image
              className={styles[`product-${size}__img`]}
              mode='aspectFill'
              src={`${BUCKET_URL}${headerImg}`}
              onClick={() => {
                Tracking.trackEvent('p_product', {
                  button_id: item?.attributes?.title?.trim(),
                });
              }}
            />
          </Navigator>
          <View className={styles[`product-${size}__container`]}>
            <View className={styles[`product-${size}__container__name`]}>
              {item?.attributes?.title}
            </View>
            {sizing && (
              <View className={styles[`product-${size}__container__size`]}>
                {skus.length === 1 ? (
                  <View className={styles[`product-${size}__container__size__standalone`]}>
                    {sizing}
                  </View>
                ) : (
                  <View
                    className={cx(
                      styles[`product-${size}__container__size__container`],
                      open && styles[`product-${size}__container__size__container__open`]
                    )}
                    onClick={() => setOpen(!open)}
                  >
                    <View className={styles[`product-${size}__container__size__container__header`]}>
                      {open ? '规格' : sizing}
                      <Image
                        className={styles[`product-${size}__container__size__container__arrow`]}
                        mode='widthFix'
                        src={arrow_down}
                        style={{
                          visibility: `${!open ? 'visible' : 'hidden'}`,
                        }}
                      />
                    </View>
                    {open && (
                      <View className={styles[`product-${size}__container__size__container__body`]}>
                        {skus.map((childProduct, index) => (
                          <View
                            className={cx(
                              styles[`product-${size}__container__size__container__body__item`],
                              open &&
                                styles[
                                  `product-${size}__container__size__container__body__open__item`
                                ],
                              open &&
                                childProduct?.attributes?.spec === sizing &&
                                styles[
                                  `product-${size}__container__size__container__body__open__item__active`
                                ]
                            )}
                            key={index}
                            onClick={() => {
                              setSizing(childProduct?.attributes?.spec);
                              setSkuIndex(index);
                            }}
                          >
                            <Image
                              style={{
                                visibility: `${
                                  childProduct?.attributes?.spec === sizing ? 'visible' : 'hidden'
                                }`,
                              }}
                              className={
                                styles[
                                  `product-${size}__container__size__container__body__open__item__check`
                                ]
                              }
                              mode='widthFix'
                              src={checked}
                            />
                            {childProduct?.attributes?.spec}
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
            {!sizing && (
              <View className={styles[`product-${size}__container__size`]}>
                <View className={styles[`product-${size}__container__size__standalone`]}></View>
              </View>
            )}
            {!store.isFromDFS && (
              <View
                className={styles[`product-${size}__container__eretailer`]}
                onClick={() => {
                  console.log('retailerInfos', retailerInfos);
                  if (retailerInfos.length === 1) {
                    jumpToStoreMP(retailerInfos[0]);
                  } else if (retailerInfos.length > 1) {
                    Taro.eventCenter.trigger('OPEN_RETAILER', retailerInfos);
                  }
                  const productName = item?.attributes?.title?.trim();
                  const productSku = skus[skuIndex]?.attributes?.sku;
                  Tracking.trackEvent('p_outpurchase', {
                    prod_name: productName,
                    prod_sku: productSku,
                  });
                }}
              >
                {t('common.instantBuy')}
              </View>
            )}
          </View>
        </View>
      </Block>
    );
  }
);
