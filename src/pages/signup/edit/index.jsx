import { useEffect, useState } from 'react';
import { View, Input, Text, Image } from '@tarojs/components';
import { Picker, DatePicker } from '@nutui/nutui-react-taro';
import { useTranslation } from 'react-i18next';

import { CommonService } from '@api/common.services';
import { UserService } from '@api/user.services';
import { REG_MOBILE } from '@constants';

import { showToast, delayNavigateBack } from '@utils';
import CustomNav from '@components/CustomNav';
import RegionPicker from '@components/RegionPicker';
import useStore from '@stores';

import LogoImage from '@assets/logo-large.png';
import styles from './index.module.scss';

const sexData = [
  {
    text: '先生',
    value: 'Mr.',
  },
  {
    text: '女士',
    value: 'Mrs.',
  },
];

export default function EditProfile() {
  const [showSexPicker, setShowSexPicker] = useState(false);
  const [showDatePicker, setShowDataPicker] = useState(false);
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [regionData, setRegionData] = useState([]);
  const [sex, setSex] = useState(null);
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [birthday, setBirthday] = useState([]);
  const [defaultDate, setDefaultDate] = useState(new Date(1990, 0, 1));

  const isLogin = useStore((state) => state.isLogin);
  const profile = useStore((state) => state.userInfo.profile);
  const store = useStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (isLogin) {
      _setDefault();
      _getRegion();
    }
  }, [isLogin]);

  const _setDefault = () => {
    console.log('profile', profile);
    setMobile(profile?.mobile ?? '');
    setName(profile?.nickName);
    setCity(profile?.city);
    if (profile?.birthday) {
      setBirthday(profile?.birthday?.split('-'));
    }
    const prefix = sexData.find((item) => item.value === profile?.prefix);
    setSex(prefix);
  };

  const _getRegion = async () => {
    const result = await CommonService.getRegion();
    const _data = result.map((item) => {
      return {
        value: item.adcode,
        text: item.name,
        children: item.districts.map((_item) => ({
          value: _item.adcode,
          text: _item.name,
        })),
      };
    });
    setRegionData(_data);
  };

  const handleSubmit = () => {
    if (name.trim() === '') {
      showToast({ title: t('signup.error.name') });
      return;
    }
    // if (!REG_MOBILE.test(mobile)) {
    //   showToast({ title: t("signup.error.mobile") });
    //   return;
    // }
    if (city.trim() === '') {
      showToast({ title: t('signup.error.country') });
      return;
    }
    submitData();
  };

  const submitData = async () => {
    try {
      const result = await UserService.editProfile({
        city,
        birthday: birthday?.join('-'),
        nickname: name,
        prefix: sex?.value,
      });
      store.setUserInfo({
        profile: result,
      });
      showToast({
        icon: 'success',
        title: '修改成功',
      });
      delayNavigateBack();
    } catch {
      showToast({
        title: '修改失败，请稍后再试',
      });
    }
  };
  return (
    <View className='page'>
      <CustomNav title={t('page.title.signupEdit')} />
      <View className={styles['signup']}>
        <View className={styles['signup__header']}>
          <View className={styles['signup__header__logo']}>
            <Image src={LogoImage} mode='aspectFill'></Image>
          </View>
          <View className={styles['signup__header__title']}>{t('page.title.signupEdit')}</View>
        </View>

        <View className={styles['signup__form']}>
          <View className={styles['signup__form__item']}>
            <View className={styles['signup__form__item__input']}>
              <Input
                placeholder={`* ${t('common.name')}`}
                cursorSpacing={100}
                maxlength='20'
                onInput={(e) => {
                  setName(e.detail.value);
                }}
                value={name}
              />
            </View>
          </View>
          <View className={styles['signup__form__item']}>
            <View
              className={`${styles['signup__form__item__input']} ${styles['signup__form__item__picker']}`}
              onClick={() => {
                setShowSexPicker(true);
              }}
            >
              <Input
                placeholder={`* ${t('common.gender')}`}
                cursorSpacing={100}
                value={sex?.text}
                disabled
              />
              <Text className='iconfont icon-prev'></Text>
            </View>
          </View>
          <View
            className={`${styles['signup__form__item']} ${styles['signup__form__item__disabled']}`}
          >
            <View className={styles['signup__form__item__input']}>
              <Input
                placeholder={`* ${t('common.mobile')}`}
                cursorSpacing={100}
                maxlength={11}
                value={mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')}
                disabled
                onInput={(e) => {
                  setMobile(e.detail.value);
                }}
              />
            </View>
          </View>
          <View
            className={styles['signup__form__item']}
            onClick={() => {
              setShowRegionPicker(true);
            }}
          >
            <View
              className={`${styles['signup__form__item__input']} ${styles['signup__form__item__picker']}`}
            >
              <Input
                placeholder={`* ${t('common.countryAndArea')}`}
                cursorSpacing={100}
                disabled
                value={city}
              />
              <Text className='iconfont icon-prev'></Text>
            </View>
          </View>
          <View className={styles['signup__form__item']}>
            <View
              className={`${styles['signup__form__item__input']} ${styles['signup__form__item__picker']}`}
              onClick={() => {
                setShowDataPicker(true);
              }}
            >
              <Input
                placeholder={t('common.birthday')}
                cursorSpacing={100}
                value={birthday?.join('-')}
                disabled
              />
              <Text className='iconfont icon-prev'></Text>
            </View>
          </View>
        </View>

        <View className={styles['submit__button']} onClick={handleSubmit}>
          {t('common.confirm')}
        </View>
      </View>
      <Picker
        options={sexData}
        visible={showSexPicker}
        onConfirm={(options) => {
          setSex(options[0]);
        }}
        onClose={() => {
          setShowSexPicker(false);
        }}
      />
      <DatePicker
        title={t('common.pickBirthDay')}
        startDate={new Date(1940, 0, 1)}
        endDate={new Date(2030, 0, 1)}
        defaultValue={defaultDate}
        visible={showDatePicker}
        showChinese
        onClose={() => setShowDataPicker(false)}
        onConfirm={(options, values) => {
          setBirthday(values);
        }}
      />
      <RegionPicker
        showRegion={showRegionPicker}
        regionData={regionData}
        onClose={() => {
          setShowRegionPicker(false);
        }}
        onChange={(options) => {
          setCity(options.text);
        }}
      />
    </View>
  );
}
