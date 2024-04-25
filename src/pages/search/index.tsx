import React, { useEffect, useState } from 'react';
import { Block, Image, Input, PageContainer, RootPortal, View } from '@tarojs/components';
import Header from '@components/Basic/Header';
import CustomNavbar from '@components/Basic/Navbar';
import * as Icons from '@assets/icons';
import { ProductService } from '@api/product.services';
import GlobalService from '@api/global.services';
import ProductBlock from '@components/ProductBlock';
import SafeBottom from '@components/Basic/SafeBottom';
import RedirectRetailer from '@components/RedirectRetailer';
import { showToast, showLoading, hideLoading } from '@utils/index';
import { useTranslation } from 'react-i18next';
import Taro, { eventCenter, useDidHide, useDidShow, useRouter } from '@tarojs/taro';
import styles from './index.module.scss';

export default React.memo(() => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(decodeURIComponent(router?.params?.key || ''));
  const [placeholder, setPlaceholder] = useState('');
  const [hotKeyword, setHotKeyword] = useState<any[]>([]);
  const [productsSearch, setProductsSearch] = useState<any[]>([]);
  const [retailerInfos, setRetailerInfos] = useState<any[]>([]);
  const [openRetailer, setOpenRetailer] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const { t } = useTranslation();

  const _pageOptions = {
    navbar: {},
    header: {
      buttonBack: true,
      title: t('page.title.search'),
    },
  };

  const inputHandler = (e) => {
    const value = e.detail.value;
    if (value === '') {
      setProductsSearch([]);
      setShowResult(false);
    }
    setKeyword(value);
  };

  const confirmHandler = (e) => {
    search();
  };

  const search = async () => {
    if (keyword.trim() === '' && placeholder.trim() === '') {
      showToast({
        title: t('search.emptyTip'),
      });
      return;
    }
    showLoading();
    const result = await ProductService.searchByKeyword({
      keyword: keyword,
    });
    const products = result.map((item) => {
      return {
        id: item.id,
        attributes: {
          ...item,
        },
      };
    });

    if (keyword.trim() !== '') {
      const history = [...new Set([keyword, ...searchHistory])].slice(0, 10);
      setSearchHistory(history);
      Taro.setStorageSync('SEARCH_HISTORY', history);
    }
    setProductsSearch(products);
    setProductsSearch(products);
    setShowResult(true);
    hideLoading();
  };

  const getHotKeywords = async () => {
    const { data } = await GlobalService.getHotKeywordsSearch();
    const { data: _placeholder } = await GlobalService.getPlaceholderSearch();
    const placeholderText = _placeholder?.attributes?.notificationOnSearchbar || '';
    setHotKeyword(data?.attributes?.hotWordsOnSearchbar);
    setPlaceholder(placeholderText);
    console.log('playerholder-------', placeholderText);
  };

  const clearSavedHistory = () => {
    setSearchHistory([]);
    Taro.setStorageSync('SEARCH_HISTORY', []);
  };

  useEffect(() => {
    setSearchHistory(Taro.getStorageSync('SEARCH_HISTORY'));
    getHotKeywords();
  }, []);

  useEffect(() => {
    if (router?.params?.key) {
      setSubmit(true);
    }
  }, [router?.params?.key]);

  useEffect(() => {
    if (submit) {
      search();
      setSubmit(false);
    }
  }, [submit]);

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
        <Header {..._pageOptions.header} />
      </CustomNavbar>
      <View className={styles['search__header']}>
        <View className={styles['search__header__wrapper']}>
          <View className={styles['search__header__wrapper__search']}>
            <View className={styles['search__header__wrapper__search__text']}>
              <Input
                confirmType='search'
                placeholder={placeholder}
                onInput={inputHandler}
                onConfirm={confirmHandler}
                maxlength={20}
                value={keyword}
                cursor={keyword.length}
                placeholderStyle='color:#9aa5b0'
              />
            </View>
            <View
              className={styles['search__header__wrapper__search__icon']}
              onClick={() => {
                if (keyword.trim() === '') {
                  setKeyword(placeholder);
                }
                setSubmit(true);
              }}
            >
              <Image src={Icons.search} mode='widthFix'></Image>
            </View>
          </View>
        </View>
      </View>
      {!showResult && (
        <View className={styles['search__body']}>
          {searchHistory?.length > 0 && (
            <View className={styles['search__body__keywords']}>
              <View className={styles['search__body__keywords__container']}>
                <View className={styles['search__body__keywords__container__label']}>
                  {t('search.latest')}
                  <View
                    className={styles['search__body__keywords__container__label__empty']}
                    onClick={clearSavedHistory}
                  >
                    {t('search.clear')}
                  </View>
                </View>
                <View className={styles['search__body__keywords__container__list']}>
                  {searchHistory &&
                    searchHistory?.map((item, index) => (
                      <View
                        className={styles['search__body__keywords__container__list__item']}
                        key={index}
                        onClick={() => {
                          setKeyword(item);
                          setSubmit(true);
                        }}
                      >
                        {item}
                      </View>
                    ))}
                </View>
              </View>
            </View>
          )}
          <View className={styles['search__body__keywords']}>
            <View className={styles['search__body__keywords__container']}>
              <View className={styles['search__body__keywords__container__label']}>
                {t('search.hot')}
              </View>
              <View className={styles['search__body__keywords__container__list']}>
                {hotKeyword?.map((item) => (
                  <View
                    className={styles['search__body__keywords__container__list__item']}
                    key={item?.id}
                    onClick={() => {
                      setKeyword(item?.word);
                      setSubmit(true);
                    }}
                  >
                    {item?.word}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}
      {productsSearch?.length > 0 && (
        <View className={styles['search__result']}>
          {productsSearch?.map((item, index) => (
            <ProductBlock
              key={index}
              item={item}
              index={index}
              onOpenRetailer={(ri) => setRetailerInfos(ri)}
            />
          ))}
          {productsSearch?.length % 2 === 1 && <View style={{ flexBasis: '328rpx' }}></View>}
          {retailerInfos?.length > 0 && (
            <RootPortal>
              <PageContainer
                show={openRetailer}
                round
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
      )}
      {productsSearch?.length === 0 && showResult && (
        <View className={styles['search__empty']}>{t('search.notFound')}</View>
      )}
    </Block>
  );
});
