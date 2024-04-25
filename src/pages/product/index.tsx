import React, { useState, useCallback, useEffect } from 'react';
import Taro, {
  eventCenter,
  useDidHide,
  useDidShow,
  useRouter,
  useShareAppMessage,
} from '@tarojs/taro';
import {
  View,
  Video,
  Image,
  Swiper,
  SwiperItem,
  Picker,
  RootPortal,
  PageContainer,
} from '@tarojs/components';

import CustomRichText from '@components/CustomRichText';
import CustomNavbar from '@components/Basic/Navbar';
import Header from '@components/Basic/Header';
import { useTranslation } from 'react-i18next';

import cx from 'classnames';
import * as Icons from '@assets/icons';
import styles from './index.module.scss';
import SafeBottom from '@components/Basic/SafeBottom';
import FixedView from '@components/Basic/FixedView';
import Expander from '@components/Basic/Expander';
import RichContent from '@components/RichContent';
import ProductService from '@api/product.services';
import AccountService from '@api/account.services';
import RedirectRetailer from '@components/RedirectRetailer';
import CustomNav from '@components/CustomNav';

import { TASK } from '@constants/index';

import ProductBlock from '@components/ProductBlock';
import { checkAuth } from '@utils/index';
import { completePointTask, jumpToStoreMP } from '@utils/methods';
import { showLoading, hideLoading } from '@utils/index';
import { Tracking } from '@utils/tracking';

import NotificationBar from './components/NotificationBar';
import useStore from '@stores';

export default function Product() {
  const router = useRouter();
  const [product, setProduct] = useState<any>({});
  const [productId, setProductId] = useState<number>(0);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [video, setVideo] = useState<boolean>(false);
  const [skuIndex, setSkuIndex] = useState<number>(0);
  const [currentSkuName, setCurrentSkuName] = useState<string>('');
  const [skus, setSkus] = useState<any[]>([]);
  const [volume, setVolume] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [openRetailer, setOpenRetailer] = useState<boolean>(false);
  const [retailerInfos, setRetailerInfos] = useState<any[]>([]);
  const [descriptionImgs, setDescriptionImgs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const store = useStore();
  const { t } = useTranslation();

  const _pageOptions = {
    navbar: {},
    header: {
      buttonBack: true,
      title: t('page.title.product'),
    },
  };

  const fetchProductBySKU = async () => {
    showLoading();
    setIsLoading(true);
    const { data } = await ProductService.getProductsBySKU(router?.params?.id);

    if (data.length === 0) {
      Taro.navigateBack();
    }
    const productSku = data[0]?.attributes;
    const _productId = data[0]?.id;
    setProduct(productSku);
    setProductId(_productId);

    const { data: skuList } = await ProductService.getSkusByIds(
      productSku?.skus?.data.map((childProduct) => childProduct?.id.toString())
    );

    setSkus(skuList);
    setVolume(skuList.map((item) => item?.attributes?.spec));
    setCurrentSkuName(skuList[skuIndex]?.attributes?.spec);
    setDescriptionImgs(
      skuList[skuIndex]?.attributes?.descriptionImgs?.data || productSku?.descriptionImgs?.data
    );

    const wishlist = await AccountService.getAllWishlist();

    setFavorite(wishlist.filter((item) => item?.name === productSku?.name).length > 0);

    setIsLoading(false);
    hideLoading();
  };

  const toggleWishlist = async () => {
    if (!checkAuth()) return;

    if (favorite) {
      await AccountService.deleteProductFromWishlist(product?.name);
      setFavorite(false);
    } else {
      await AccountService.addProductToWishlist(product?.name);
      setFavorite(true);
      // completePointTask(TASK.COLLECT_PRODUCT, router?.params?.id);
      completePointTask(TASK.COLLECT_PRODUCT, product?.name);
      const productName = product?.title?.trim();
      const productSku = skus[skuIndex]?.attributes?.sku;
      Tracking.trackEvent('p_addfav', {
        prod_name: productName,
        prod_sku: productSku,
      });
    }
  };

  useShareAppMessage(() => {
    const banners =
      (skus && skus[skuIndex]?.attributes?.rotateImgs?.data) || product?.rotateImgs?.data;
    return {
      imageUrl: `${BUCKET_URL}${banners[0]?.attributes?.url}`,
      title: product?.title,
      path: `/pages/product/index?id=${productId}`,
    };
  });

  useEffect(() => {
    fetchProductBySKU();
  }, []);

  useEffect(() => {
    setDescriptionImgs(
      skus[skuIndex]?.attributes?.descriptionImgs.data || product?.descriptionImgs?.data
    );
  }, [skuIndex]);

  useDidShow(() => {
    eventCenter.on('OPEN_RETAILER', (ri) => {
      setRetailerInfos(ri);
      setOpenRetailer(true);
    });
  });

  useDidHide(() => {
    setOpenRetailer(false);
    eventCenter.off('OPEN_RETAILER');
  });

  return (
    <View>
      {/* <CustomNavbar {..._pageOptions.navbar}>
        <Header {..._pageOptions.header} />
      </CustomNavbar> */}
      <CustomNav title={t('page.title.product')} />
      <View className={styles['product-detail']}>
        <NotificationBar />
        <View className={styles['product-detail__swiper']}>
          <PDPSwiper
            product={product}
            sku={skus[skuIndex]}
            videoUrl={product.videoUrl}
            isVideo={video}
          ></PDPSwiper>
        </View>
        <View className={styles['product-detail__description']}>
          {product?.videoUrl && (
            <View
              className={styles['product-detail__description__switch']}
              onClick={() => setVideo(!video)}
            >
              <View
                className={cx(
                  styles['product-detail__description__switch__container'],
                  video && styles['product-detail__description__switch__active']
                )}
              >
                <View
                  className={cx(
                    styles['product-detail__description__switch__container__button'],
                    video && styles['product-detail__description__switch__active__button']
                  )}
                >
                  {t('product.productImage')}
                </View>
                <View
                  className={cx(
                    styles['product-detail__description__switch__video'],
                    video && styles['product-detail__description__switch__active__video']
                  )}
                >
                  {t('product.productVideo')}
                </View>
              </View>
            </View>
          )}
          <View className={styles['product-detail__description__title']}>{product?.title}</View>
        </View>
        <View className={styles['product-detail__details']}>
          <View className={styles['product-detail__details__filters']}>
            <View className={styles['product-detail__details__filters__container']}>
              <View className={styles['product-detail__details__filters__container__filter']}>
                <View
                  className={styles['product-detail__details__filters__container__filter__label']}
                >
                  {t('product.skuSelect')}：
                </View>
                <Picker
                  mode='selector'
                  range={volume}
                  onChange={(e) => {
                    setCurrentSkuName(volume[e.detail.value]);
                    setSkuIndex(volume.findIndex((item) => item === volume[e.detail.value]));
                  }}
                >
                  <View
                    className={styles['product-detail__details__filters__container__filter__size']}
                  >
                    {currentSkuName}
                    <Image
                      src={Icons.arrow_down}
                      mode='widthFix'
                      className={
                        styles['product-detail__details__filters__container__filter__icon']
                      }
                    />
                  </View>
                </Picker>
              </View>
              <View className={styles['product-detail__details__filters__container__filter']}>
                <View
                  className={styles['product-detail__details__filters__container__filter__label']}
                >
                  {t('product.quantitySelect')}：
                </View>
                <Picker
                  mode='selector'
                  range={[...Array(11).keys()].splice(1, 10)}
                  onChange={(e) => {
                    const quantityArr = [...Array(11).keys()].splice(1, 10);
                    setQuantity(quantityArr[parseInt(e.detail.value)]);
                  }}
                >
                  <View
                    className={
                      styles['product-detail__details__filters__container__filter__quantity']
                    }
                  >
                    {quantity}
                    <Image
                      src={Icons.arrow_down}
                      mode='widthFix'
                      className={
                        styles['product-detail__details__filters__container__filter__icon']
                      }
                    />
                  </View>
                </Picker>
              </View>
            </View>
          </View>
          <Expander
            expand={true}
            arrowStyle={{ marginRight: '32rpx' }}
            title={t('product.productDetail')}
          >
            {!product?.description &&
              descriptionImgs &&
              descriptionImgs?.map((item, index) => (
                <View style={`line-height: 0;`} key={index}>
                  <Image
                    lazyLoad
                    src={`${BUCKET_URL}${item?.attributes?.url}`}
                    mode='widthFix'
                    style={{ width: '100%', height: '100vh' }}
                    showMenuByLongpress={true}
                  />
                </View>
              ))}
            {product?.description && (
              <View className={styles['product__description']}>
                <CustomRichText content={product?.description} />
              </View>
            )}
          </Expander>
          <View className='seperator'></View>
          {product?.instructions?.length > 0 && (
            <Expander
              expand={false}
              arrowStyle={{ marginRight: '32rpx' }}
              title={t('product.instructions')}
            >
              {product?.instructions?.length > 0 && (
                <View style={{ padding: '0 20px 20px 20px' }}>
                  <RichContent content={product?.instructions}></RichContent>
                </View>
              )}
            </Expander>
          )}
          {product?.relProds?.data?.length > 0 && (
            <Expander
              expand={true}
              arrowStyle={{ marginRight: '32rpx' }}
              title={t('product.recommend')}
              remainOpen={true}
            >
              <View
                className={styles['product-detail__details__related']}
                onClick={() => {
                  Tracking.trackEvent('p_referral');
                }}
              >
                {product?.relProds?.data?.map((item, index) => (
                  <ProductBlock item={item} index={index} />
                ))}
              </View>
            </Expander>
          )}
        </View>
        <RootPortal>
          <PageContainer
            show={openRetailer}
            round={true}
            position='bottom'
            onLeave={() => {
              setRetailerInfos([]);
              setOpenRetailer(false);
            }}
          >
            <SafeBottom className={styles['footer']}>
              <RedirectRetailer
                retailerConfig={
                  retailerInfos.length > 0 ? retailerInfos : skus[skuIndex]?.data || []
                }
                onChange={() => setOpenRetailer(false)}
              />
            </SafeBottom>
          </PageContainer>
        </RootPortal>
        {!isLoading && !store.isFromDFS && (
          <FixedView style={{ zIndex: 400 }}>
            <SafeBottom className={`${styles['footer']} slideUp`}>
              <View className={styles['footer__favorite']} onClick={toggleWishlist}>
                <Image mode='widthFix' src={favorite ? Icons.favorite_on : Icons.favorite_off} />
                <View>{t('common.addToWishList')}</View>
              </View>
              <View
                className={styles['footer__eretailer']}
                onClick={() => {
                  if (skus[skuIndex]?.attributes?.outerSKUs.length > 0) {
                    const relDFS = skus[skuIndex]?.attributes?.outerSKUs;
                    if (relDFS && relDFS?.length === 1) {
                      jumpToStoreMP(relDFS[0]);
                    } else if (relDFS?.length > 1) {
                      setRetailerInfos(relDFS);
                      setOpenRetailer(true);
                    }
                  } else {
                    const relDFS = product?.outerSKUs;
                    if (relDFS && relDFS?.length === 1) {
                      jumpToStoreMP(relDFS[0]);
                    } else if (relDFS?.length > 1) {
                      setRetailerInfos(product?.outerSKUs);
                      setOpenRetailer(true);
                    }
                  }
                  const productName = product?.title?.trim();
                  const productSku = skus[skuIndex]?.attributes?.sku;
                  Tracking.trackEvent('p_inpurchase', {
                    prod_name: productName,
                    prod_sku: productSku,
                  });
                }}
              >
                <View>{t('common.instantBuy')}</View>
              </View>
            </SafeBottom>
          </FixedView>
        )}
      </View>
    </View>
  );
}

const PDPSwiper = React.memo(
  ({
    product = [],
    sku = [],
    videoUrl = '',
    isVideo = false,
  }: {
    product?: any;
    sku?: any;
    videoUrl: string;
    isVideo: boolean;
  }) => {
    if (!product) return <View></View>;
    const [current, setCurrent] = useState(0);
    const [bannerImgs, setBannerImgs] = useState<any>();

    const slideChange = useCallback((e) => {
      setCurrent(e.detail.current);
    }, []);

    useEffect(() => {
      setCurrent(0);
      setBannerImgs(sku?.attributes?.rotateImgs?.data || product?.rotateImgs?.data);
    }, [product, sku]);

    return (
      <View className={styles['pdp-swiper-wrapper']}>
        {isVideo ? (
          <View className={styles['custom-swiper']}>
            <View className={styles['custom-swiper-item']}>
              <PDPTXVideo vid={videoUrl} playerId={`swiper-vd-${0}`}></PDPTXVideo>
            </View>
          </View>
        ) : (
          <View></View>
        )}
        {!isVideo && bannerImgs?.length === 1 && (
          <View className={styles['custom-swiper']}>
            <View className={styles['custom-swiper-item']}>
              <Image
                lazyLoad={true}
                className={styles['custom-swiper-image']}
                src={`${BUCKET_URL}${bannerImgs[0]?.attributes?.url}`}
                mode={'aspectFit'}
              />
            </View>
          </View>
        )}
        {!isVideo && bannerImgs?.length > 1 && (
          <Swiper
            autoplay={false}
            className={styles['custom-swiper']}
            current={current}
            onChange={slideChange}
          >
            {bannerImgs?.map((item, idx) => (
              <SwiperItem className={styles['custom-swiper-item']} key={idx + 1}>
                <Image
                  lazyLoad={true}
                  className={styles['custom-swiper-image']}
                  src={`${BUCKET_URL}${item?.attributes?.url}`}
                  mode={'aspectFit'}
                />
              </SwiperItem>
            ))}
          </Swiper>
        )}
        <View>
          {!isVideo && bannerImgs?.length > 1 && (
            <View className={styles['indicator-dots']}>
              {new Array(bannerImgs?.length).fill(1).map((_, index) => (
                <View
                  className={cx(styles['dot'], {
                    [styles['active']]: index === current,
                  })}
                ></View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  }
);

const PDPTXVideo = React.memo(({ vid, playerId }: { vid: string; playerId: string }) => {
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const clickPlay = () => {
    console.log(playerId);
    const player = Taro.createVideoContext(playerId);
    console.log(player?.state);
    switch (player?.state) {
      case 'canplay':
      case 'pause':
        player.play();
        break;
      case 'idle':
      case 'end':
        player.replay();
        break;
      default:
        player.play();
    }
    setPlaying(true);
  };
  const clickPause = () => {
    const player = Taro.createVideoContext(playerId);
    player.pause();
  };
  const onPause = () => {
    setPlaying(false);
  };
  const onPlay = () => {
    setPlaying(true);
  };
  const onEnd = () => {
    setPlaying(false);
  };
  useEffect(() => {
    if (showMenu && playing) {
      setTimeout(() => {
        setShowMenu(false);
      }, 1500);
    }
  }, [showMenu, playing]);
  return (
    <View
      className='pdp-tx-video-wrapper'
      onTouchStart={() => {
        setShowMenu(true);
      }}
    >
      <Video
        className={styles['pdp-tx-video-element']}
        src={vid}
        id={playerId}
        autoplay={true}
        controls={false}
        muted={muted}
        showProgress={false}
        onPlay={onPlay}
        onEnded={onEnd}
        onPause={onPause}
        enableProgressGesture={false}
        showPlayBtn={false}
        showCenterPlayBtn={false}
        objectFit='cover'
      ></Video>
    </View>
  );
});
