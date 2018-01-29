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

  describe('isSelected', () => {
    beforeEach(() => {
      artObjectsListComponent.selectedArtObjectNumber = 'abc123';
    });

    it('should return true if passed art object is selected', () => {
      const selectedArtObject = {
        objectNumber: 'abc123',
        title: 'some title',
      };

      expect(artObjectsListComponent.isSelected(selectedArtObject)).toBe(true);
    });

    it('should return false if passed art object is not selected', () => {
      const notSelectedArtObject = {
        objectNumber: 'foo123',
        title: 'some title',
      };

      expect(artObjectsListComponent.isSelected(notSelectedArtObject)).toBe(false);
    });
  });

  describe('selectArtObject', () => {
    beforeEach(() => {
      const artObject = {
        objectNumber: 'abc123',
        title: 'some title',
      };

      artObjectsListComponent.onSelect = jest.fn();

      artObjectsListComponent.selectArtObject(artObject);
    });

    it('should store selected art object number', () => {
      expect(artObjectsListComponent.selectedArtObjectNumber).toBe('abc123');
    });

    it('should pass event to onSelect', () => {
      expect(artObjectsListComponent.onSelect).toHaveBeenCalledWith({
        $event: {
          objectNumber: 'abc123',
        },
      });
    });
  });
});
