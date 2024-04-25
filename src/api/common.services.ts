import request from '@utils/request';

export class CommonService {
  public static async getWeather(params: { LNG: string; LAT: string }): Promise<any> {
    return request({
      url: `${API_URL}/account/weather`,
      data: {
        longitude: params.LNG,
        latitude: params.LAT,
      },
      method: 'POST',
    });
  }

  public static async getWeatherByCode(params: { code: string }): Promise<any> {
    return request({
      url: `${API_URL}/geoinfo/weather/${params.code}`,
    });
  }

  public static async getRegion(): Promise<any> {
    return request({
      url: `${API_URL}/geoinfo/districts`,
    });
  }
}
