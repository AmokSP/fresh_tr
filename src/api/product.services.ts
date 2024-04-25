import cmsRequest from '@utils/cmsRequest';
import request from '@utils/request';

export class ProductService {
  public static async getCategories(): Promise<any> {
    return cmsRequest({
      method: 'GET',
      // url: `${CMS_API_URL}/top-categories?populate[categories][populate]=*&locate=zh-CN&sort[1]=order&populate[prods][populate]=*`,
      url: `${CMS_API_URL}/top-categories?populate=deep,4&sort[1]=order&pagination[pageSize]=200`,
    });
  }

  public static async getProductsByCategoryId(id: number): Promise<any> {
    return cmsRequest({
      method: 'GET',
      // url: `${CMS_API_URL}/categories?populate[products][populate]=*&populate[skus][populate]=*&filters[id][$eq]=${id}&locate=zh-CN`,
      url: `${CMS_API_URL}/categories?populate=deep&filters[id][$eq]=${id}`,
    });
  }

  public static async getAllProductsFromCategory(
    page: number = 1,
    pageSize: number = 10
  ): Promise<any> {
    return cmsRequest({
      method: 'GET',
      url: `${CMS_API_URL}/products?fields[0]=title&populate[headerImg]=*&populate[skus][populate]=*&populate[dfsInfos][populate]=*&populate[outerSKUs][populate]=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[1]=displayOrder`,
    });
  }

  public static async getProductsBySKU(id: string): Promise<any> {
    return cmsRequest({
      method: 'GET',
      // url: `${CMS_API_URL}/products?filters[id][$eq]=${id}&locate=zh-CN&populate[outerSKUs][populate]=*&populate[relProds][populate]=*&populate[headerImg]=*&populate[rotateImgs]=*&populate[descriptionImgs]=*&populate[skus][populate]=*`,
      url: `${CMS_API_URL}/products?populate=deep&filters[id][$eq]=${id}`,
    });
  }

  public static async getSkusByIds(ids: string[]): Promise<any> {
    const filteredIds: string = ids.map((id) => `filters[id][$eq]=${id}`).join('&');
    return cmsRequest({
      method: 'GET',
      url: `${CMS_API_URL}/child-products?${filteredIds}&populate[rotateImgs][populate]=*&populate[descriptionImgs][populate]=*&populate[outerSKUs][populate]=*&populate[headerImg][populate]=*`,
    });
  }

  // public static async searchKeywords(keyword: string): Promise<any> {
  //   return cmsRequest({
  //     method: "GET",
  //     url: `${CMS_API_URL}/fuzzy-search/search?query=${keyword}&locale=zh-CN`,
  //   });
  // }

  public static async searchByKeyword(params: { keyword: string }): Promise<any> {
    return request({
      url: `${API_URL}/products/search?query=${params.keyword}`,
    });
  }
}

export default ProductService;
