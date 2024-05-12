import { useEffect, useState } from 'react';
import useStore from '@stores';
import {
  eventCenter,
  useDidHide,
  useDidShow,
  useRouter,
  useShareAppMessage,
  useShareTimeline,
} from '@tarojs/taro';
import { View, Text, Block, Image, Navigator, RootPortal, PageContainer } from '@tarojs/components';
import cx from 'classnames';
import CustomNavbar, { NAVBAR_HEIGHT } from '@components/Basic/Navbar';
import ProductBlock from '@components/ProductBlock';
import SafeBottom from '@components/Basic/SafeBottom';
import RedirectRetailer from '@components/RedirectRetailer';
import Header from '@components/Basic/Header';
import ProductService from '@api/product.services';
import GlobalService from '@api/global.services';
import { goto } from '@utils/index';
import * as Icons from '@assets/icons';
import { showLoading, hideLoading } from '@utils/index';
import { Tracking } from '@utils/tracking';
import { useTranslation } from 'react-i18next';

import { PAGES } from '@app.config';
import styles from './index.module.scss';

export default function Category() {
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [product, setProduct] = useState<any[]>([]);
  const [subCategory, setSubCategory] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [retailerInfos, setRetailerInfos] = useState<any[]>([]);
  const [openRetailer, setOpenRetailer] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('');
  const language = useStore((state) => state.language);

  const store = useStore();
  const router = useRouter();
  const { t } = useTranslation();

  const _pageOptions = {
    navbar: {},
    header: {
      buttonBack: false,
      buttonHome: false,
      title: t('page.title.category'),
    },
  };

  const fetchCategories = async () => {
    showLoading();
    const { data: ph } = await GlobalService.getPlaceholderSearch();
    setPlaceholder(ph?.attributes?.notificationOnSearchbar);
    const { data } = await ProductService.getCategories();

    setCategories(data?.map((category) => category?.attributes?.displayName)??[]);
    setSubCategories(data?.map((category) => category?.attributes?.categories?.data)??[]);
    setProducts(data?.map((category) => category?.attributes?.prods?.data)??[]);

    // const { data: allProducts } =
    //   await ProductService.getAllProductsFromCategory();
    // setAllProducts(allProducts);

    // Set current index from router params
    const subCategoryIndex = data?.findIndex(
      (category) => category?.id?.toString() === router?.params?.sub
    );
    setCurrentIndex(subCategoryIndex === -1 ? 0 : subCategoryIndex);
    hideLoading();
  };

  const setTopCategoryInfoByIndex = (index: number) => {
    setProduct((products && products[index]) || undefined);
    if (subCategories && subCategories[index]) {
      const _subCategories = subCategories[index].filter(
        (item) => item?.attributes?.products?.data?.length > 0
      );
      setSubCategory(_subCategories || undefined);
    }
    if (index >= 0) {
      Tracking.trackEvent('p_navigation', {
        button_id: categories[index],
      });
    }
  };

  const handleTabChange = (item, index) => {
    if (item === '全部产品' || item === '全部產品') {
      goto({ url: PAGES.CATEGORY_DETAIL });
      return;
    }
    setCurrentIndex(index);
  };

  const onClickSearch = () => {
    console.log('CLICK SEARCH');
    goto({ url: PAGES.SEARCH });
  };

  useEffect(() => {
    // fetchCategories();
  }, []);

  useEffect(() => {
    setCurrentIndex(-1);
    fetchCategories();
  }, [language]);

  useEffect(() => {
    setTopCategoryInfoByIndex(currentIndex);
  }, [currentIndex]);

  useDidShow(() => {
    store.setTabbarIndex(1);
    eventCenter.on('OPEN_RETAILER', (ri) => {
      setRetailerInfos(ri);
      setOpenRetailer(true);
    });
  });

  useDidHide(() => {
    setOpenRetailer(false);
    eventCenter.off('OPEN_RETAILER');
  });

  const handleSearch = (e) => {
    e.stopPropagation();
    goto({
      url: `${PAGES.SEARCH}?key=${placeholder}`,
    });
  };

  const handleSubCategoryClick = (name) => {
    Tracking.trackEvent('p_subcategory', {
      button_id: name,
    });
  };

  useShareAppMessage(() => {
    return {
      title: t('common.shareTitle'),
      imageUrl: `${SHARE_IMAGE}?${+new Date()}`,
    };
  });

  useShareTimeline(() => {
    return {
      title: t('common.shareTitle'),
    };
  });

  return (
    <Block>
      <CustomNavbar {..._pageOptions.navbar}>
        <Header {..._pageOptions.header} />
      </CustomNavbar>
      <View className={styles['category']}>
        <View className={styles['search-wrapper']}>
          <View className={styles['search-wrapper__search']} onClick={onClickSearch}>
            <View className={styles['search-wrapper__search__text']}>{placeholder}</View>
            <Image
              src={Icons.search}
              mode={'widthFix'}
              onClick={(e) => {
                handleSearch(e);
              }}
            ></Image>
          </View>
        </View>
        <View className={styles['category__wrapper']} style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
          <View className={styles['category__wrapper__tab']}>
            {categories?.map((item, index) => (
              <View
                key={index}
                className={cx(styles['category__wrapper__tab__item'], {
                  [styles['category__wrapper__tab__item__active']]: currentIndex === index,
                })}
                onClick={() => handleTabChange(item, index)}
              >
                {currentIndex === index && (
                  <View className={styles['category__wrapper__tab__item__active__border']}></View>
                )}
                {item}
              </View>
            ))}
          </View>
          <View className={styles['category__wrapper__content']}>
            <View className={styles['category__wrapper__content__header']}>
              <Text>- {categories[currentIndex]} -</Text>
            </View>
            <View
              className={cx(
                styles['category__wrapper__content__body']
                // categories[currentIndex] === "全部产品" || product?.length
                // styles["category__wrapper__content__body-small"]
              )}
            >
              {subCategory &&
                subCategory?.map((item, index) => (
                  <Navigator
                    className='list-item'
                    hoverClass='none'
                    key={index + item?.attributes?.displayName || ''}
                    url={`${PAGES.CATEGORY_DETAIL}?id=${item?.id}`}
                  >
                    <View
                      key={index}
                      className={styles['category__wrapper__content__body__item']}
                      onClick={() => {
                        handleSubCategoryClick(item?.attributes?.displayName?.replace('\n', ''));
                      }}
                    >
                      <Image
                        lazyLoad
                        className={styles['category__wrapper__content__body__item__image']}
                        mode='aspectFit'
                        src={`${BUCKET_URL}${item?.attributes?.image?.data?.attributes?.url}`}
                      ></Image>
                      <View className={styles['category__wrapper__content__body__item__name']}>
                        {item?.attributes?.displayName?.replace('\n', '')}
                      </View>
                    </View>
                  </Navigator>
                ))}
              {!subCategory?.length &&
                product &&
                product?.map((item, index) => (
                  <ProductBlock size={'s'} item={item} index={index} key={index} />
                ))}
              {/* {categories[currentIndex] === "全部产品" &&
                allProducts &&
                allProducts?.map((item, index) => (
                  <ProductBlock
                    size={"s"}
                    item={item}
                    index={index}
                    key={index}
                  />
                ))}
              {((categories[currentIndex] === "全部产品" &&
                allProducts.length % 2 === 1) ||
                (product && product.length % 2 === 1) ||
                (subCategory && subCategory.length % 2 === 1)) && (
                <View style={{ flexBasis: "244rpx" }}></View>
              )} */}
            </View>
          </View>
        </View>
        {retailerInfos.length > 0 && (
          <RootPortal>
            <PageContainer
              show={openRetailer}
              round={true}
              position='bottom'
              onLeave={() => setOpenRetailer(false)}
            >
              <SafeBottom className={styles['footer']}>
                <RedirectRetailer
                  retailerConfig={retailerInfos}
                  onChange={() => setOpenRetailer(false)}
                />
              </SafeBottom>
            </PageContainer>
          </RootPortal>
        )}
      </View>
    </Block>
  );
}
