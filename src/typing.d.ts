declare const API_URL: string;
declare const CMS_API_URL: string;
declare const CMS_TOKEN: string;
declare const TASK_URL: string;
declare const BUCKET_URL: string;
declare const CMS_URL: string;
declare const ENABLE_LANG: boolean;
declare const SHARE_IMAGE: string;
declare const TRACKING: any;
declare const ENV_VERSION: any;
declare const gdp: any;
declare const HIDEAWAY_ASSETS: {
  book: {
    cover: string;
    back: string;
    pages: Array<{
      bg: string;
      layer1: string;
      layer2: string;
      layer3: string;
      layer4: string;
      layer5: string;
    }>;
  };
  campaignQrCode: string;
  shareTitle: string;
  shareImage: string;
  templates: {
    bg: string;
    stickers: string[];

    [K: string]: any;
  }[];
  stickers: {
    [K: string]: string;
  };
  stories: any[];
};
