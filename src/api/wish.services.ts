import request from '@utils/request';

export class WishService {
  public static async getWishList(): Promise<any> {
    return request({
      url: `${API_URL}/wishlist/all`,
    });
  }

  public static async addWishList(params: { name: string }): Promise<any> {
    return request({
      url: `${API_URL}/wishlist/${params.name}`,
      method: 'PUT',
    });
  }

  public static async removeWishList(params: { name: string }): Promise<any> {
    return request({
      url: `${API_URL}/wishlist/${params.name}`,
      method: 'DELETE',
    });
  }
}
