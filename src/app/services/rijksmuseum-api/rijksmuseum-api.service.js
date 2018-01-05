export class RijksmuseumApiService {
  constructor() {
    console.log('RijksmuseumApiService created!');
  }
}

export const rijksmuseumApiServiceToken = 'rijksmuseumApiService';
export const rijksmuseumApiServiceDeclaration = {
  [rijksmuseumApiServiceToken]: RijksmuseumApiService
};
