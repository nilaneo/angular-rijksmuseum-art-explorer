import { ArtObjectDetailsComponent } from './art-object-details.component';
import { IArtObjectDetails, rijksmuseumApiServiceToken } from '../../services/rijksmuseum-api/rijksmuseum-api.service';

describe('artObjectDetailsComponent', () => {
  let rijksmuseumApiService: { getDetails: jest.Mock };
  let artObjectDetailsComponent: ArtObjectDetailsComponent;
  let getDetailsDefer: any;

  beforeEach(() => {
    rijksmuseumApiService = {
      getDetails: jest.fn(),
    };

    getDetailsDefer = {};
    getDetailsDefer.promise = new Promise((resolve, reject) => {
      getDetailsDefer.resolve = resolve;
      getDetailsDefer.reject = reject;
    });

    rijksmuseumApiService.getDetails.mockReturnValue(getDetailsDefer.promise);

    artObjectDetailsComponent = new ArtObjectDetailsComponent(rijksmuseumApiService as any);
  });

  describe('$inject', () => {
    it('should return list of dependencies', () => {
      expect(ArtObjectDetailsComponent.$inject).toEqual([rijksmuseumApiServiceToken]);
    });
  });

  describe('$onChanges', () => {
    beforeEach(() => {
      artObjectDetailsComponent.artObjectDetails = {
        longTitle: 'Old Art Object',
        description: 'Some old description',
        webImage: { url: '...' },
      };
      artObjectDetailsComponent.objectNumber = 'abc567';
    });

    describe('when objectNumber has not been changed', () => {
      beforeEach(() => {
        artObjectDetailsComponent.$onChanges({});
      });

      it('should not unset old details', () => {
        expect(artObjectDetailsComponent.artObjectDetails).not.toBeUndefined();
      });

      it('should not load details', () => {
        expect(rijksmuseumApiService.getDetails).not.toHaveBeenCalled();
      });
    });

    describe('when objectNumber has been changed to new object number', () => {
      beforeEach(() => {
        const changes = {
          objectNumber: {
            isFirstChange: () => false,
            previousValue: 'abc567',
            currentValue: 'bac123',
          },
        };
        artObjectDetailsComponent.objectNumber = 'bac123';

        artObjectDetailsComponent.$onChanges(changes);
      });

      it('should unset old details', () => {
        expect(artObjectDetailsComponent.artObjectDetails).toBeUndefined();
      });

      it('should load new details', () => {
        expect(rijksmuseumApiService.getDetails).toHaveBeenCalledWith('bac123');
      });

      describe('when details have been loaded', () => {
        let newArtObjectDetails: IArtObjectDetails;

        beforeEach(() => {
          newArtObjectDetails = {
            longTitle: 'New Art Object',
            description: 'Some new description',
            webImage: { url: '...' },
          };

          getDetailsDefer.resolve(newArtObjectDetails);
        });

        it('should store new details', () => {
          expect(artObjectDetailsComponent.artObjectDetails).toBe(newArtObjectDetails);
        });
      });
    });

    describe('when objectNumber has been changed to undefined', () => {
      beforeEach(() => {
        const changes = {
          objectNumber: {
            isFirstChange: () => false,
            previousValue: 'abc567',
            currentValue: undefined,
          },
        };
        artObjectDetailsComponent.objectNumber = undefined;

        artObjectDetailsComponent.$onChanges(changes);
      });

      it('should unset old details', () => {
        expect(artObjectDetailsComponent.artObjectDetails).toBeUndefined();
      });

      it('should not load details', () => {
        expect(rijksmuseumApiService.getDetails).not.toHaveBeenCalled();
      });
    });
  });
});
