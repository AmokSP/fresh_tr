import { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components';
import { CampainService } from '@api/campaign.services';
import { goto } from '@utils/index';
import CustomNav from '@components/CustomNav';
import styles from './index.module.scss';

export default function Campaign() {
  const [data, setData] = useState(null);

  const _getCampaign = async () => {
    const result = await CampainService.getCampaign();
    setData(result?.data[0]?.attributes);
  };

  useEffect(() => {
    _getCampaign();
  }, []);

  return (
    <View className='page'>
      <CustomNav title={data?.title} />
      <View className={styles['campaign']}>
        <Image
          src={`${CMS_URL}${data?.image?.data?.attributes?.url}`}
          mode='widthFix'
          onClick={() => {
            goto({ url: data?.link });
          }}
        ></Image>
      </View>
    </View>
  );
}
