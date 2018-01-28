import { ArtObjectsListComponent } from './art-objects-list.component';
import { rijksmuseumApiServiceToken } from '../../services/rijksmuseum-api/rijksmuseum-api.service';

describe('artObjectsListComponent', () => {
  let artObjectsListComponent: ArtObjectsListComponent;
  let rijksmuseumApiService: { getList: jest.Mock };

  beforeEach(() => {
    rijksmuseumApiService = {
      getList: jest.fn(),
    };
    artObjectsListComponent = new ArtObjectsListComponent(rijksmuseumApiService as any);
  });

  describe('$inject', () => {
    it('should return list of dependencies', () => {
      expect(ArtObjectsListComponent.$inject).toEqual([rijksmuseumApiServiceToken]);
    });
  });
});
