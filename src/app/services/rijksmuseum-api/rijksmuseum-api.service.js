export class RijksmuseumApiService {
  static get $inject() {
    return ['$http'];
  }
  constructor($http) {
    this.$http = $http;
  }

  getList() {
    return this.$http
      .get('https://www.rijksmuseum.nl/api/en/collection', {
        params: {
          format: 'json',
          key: '3tYxhQmI'
        }
      })
      .then((response) => response.data.artObjects);
  }
}

export const rijksmuseumApiServiceToken = 'rijksmuseumApiService';
export const rijksmuseumApiServiceDeclaration = {
  [rijksmuseumApiServiceToken]: RijksmuseumApiService
};
