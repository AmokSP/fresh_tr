import request from '@utils/request';

export class AccountService {
  public static async addProductToWishlist(product: number): Promise<any> {
    return request({
      method: 'PUT',
      url: `${API_URL}/wishlist/${product}`,
    });
  }
  public static async getAllWishlist(): Promise<any> {
    return request({
      method: 'GET',
      url: `${API_URL}/wishlist/all`,
    });
  }

  public static async deleteProductFromWishlist(product: number): Promise<any> {
    return request({
      method: 'DELETE',
      url: `${API_URL}/wishlist/${product}`,
    });
  }
}

export default AccountService;
