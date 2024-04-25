import { useEffect, useState } from 'react';
import { eventCenter, useDidHide, useDidShow, useRouter, useReachBottom } from '@tarojs/taro';
import { View, Block, RootPortal, PageContainer } from '@tarojs/components';
import CustomNavbar from '@components/Basic/Navbar';
import Header from '@components/Basic/Header';
import ProductBlock from '@components/ProductBlock';
import ProductService from '@api/product.services';
import { useTranslation } from 'react-i18next';
import styles from './index.module.scss';
import SafeBottom from '@components/Basic/SafeBottom';
import RedirectRetailer from '@components/RedirectRetailer';
import { showLoading, hideLoading } from '@utils/index';

export default function Detail() {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]);
  const [retailerInfos, setRetailerInfos] = useState<any[]>([]);
  const [openRetailer, setOpenRetailer] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(1);
  const { t } = useTranslation();

  const _pageOptions = {
    navbar: {},
    header: {
      buttonBack: true,
      buttonHome: true,
      title: '红茶系列',
    },
  };

  const fetchProductsFromCategory = async () => {
    showLoading();
    if (router?.params?.id) {
      const { data } = await ProductService.getProductsByCategoryId(router?.params?.id);
      setCategoryName(data[0]?.attributes?.displayName);
      setProducts(data[0]?.attributes.products.data);
    } else {
      if (router?.params?.cid) {
        const topCateogryId = router?.params?.cid;
        const { data } = await ProductService.getCategories();
        const category = data.filter((item) => item.id == topCateogryId);
        const _products = category[0]?.attributes?.prods;
        setCategoryName(category[0]?.attributes?.displayName);
        setProducts(_products?.data);
      } else {
        const { data, meta } = await ProductService.getAllProductsFromCategory(page, pageSize);
        setPageCount(meta?.pagination?.pageCount);
        setCategoryName(t('page.title.allProduct'));

        if (data.length > 0) {
          const newData = [...products, ...data];
          setProducts(newData);
        }
      }
    }
    hideLoading();
  };

  useEffect(() => {
    fetchProductsFromCategory();
  }, [page]);

  useReachBottom(() => {
    const _page = page + 1 > pageCount ? pageCount : page + 1;
    setPage(_page);
  });

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
    <Block>
      <CustomNavbar {..._pageOptions.navbar}>
        <Header {..._pageOptions.header} title={categoryName} />
      </CustomNavbar>
      <View className={styles['detail']}>
        <View className={styles['detail__body']}>
          {products.map((item, index) => (
            <ProductBlock item={item} index={index} onOpenRetailer={(ri) => setRetailerInfos(ri)} />
          ))}
          {products.length % 2 === 1 && <View style={{ flexBasis: '328rpx' }}></View>}
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
    </Block>
  );
}
