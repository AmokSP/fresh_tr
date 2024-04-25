import React, { useEffect, useState } from 'react';
import { useRouter, useShareAppMessage } from '@tarojs/taro';
import { Video, View } from '@tarojs/components';
import CustomNav from '@components/CustomNav';
import { completePointTask } from '@utils/methods';
import NewsService from '@api/news.services';
import styles from './index.module.scss';
import CustomRichText from '@components/CustomRichText';

import { TASK } from '@constants/index';
import { Tracking } from '@utils/tracking';

export default React.memo(() => {
  const router = useRouter();
  const [article, setArticle] = useState<any>();

  const fetchArticleById = async () => {
    const { data } = await NewsService.getArticleById(router?.params?.id);
    setArticle(data && data[0]?.attributes);
  };

  useEffect(() => {
    fetchArticleById();
  }, []);

  useShareAppMessage(() => {
    completePointTask(TASK.SHARE_ARTICLE, article?.name?.trim());
    return { title: article?.title, imageUrl: `${SHARE_IMAGE}?${+new Date()}` };
  });

  return (
    <View className='page'>
      <CustomNav title='' />
      <View className={styles['detail']}>
        <View className={styles['detail__content']}>
          <CustomRichText content={article?.content} />
          {/* <RichContent content={filterRichText(article?.content)} /> */}
        </View>
        {article?.videoUrl && (
          <View className={styles['detail__video']}>
            <Video
              style={{ width: '100%', height: '158px' }}
              src={article?.videoUrl}
              id={`brand-video-${article?.id}`}
              autoplay={false}
              controls={true}
              muted={false}
              showProgress={true}
              enableProgressGesture={true}
              showPlayBtn={true}
              showCenterPlayBtn={true}
              onPlay={() => {
                Tracking.trackEvent('n_video', {
                  button_id: article?.title,
                });
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
});
