import { ArtObjectDetailsComponent } from './art-object-details.component';

describe('artObjectDetailsComponent', () => {
  let rijksmuseumApiService: { getDetails: jest.Mock };
  let artObjectDetailsComponent: ArtObjectDetailsComponent;

  beforeEach(() => {
    rijksmuseumApiService = {
      getDetails: jest.fn(),
    };
    artObjectDetailsComponent = new ArtObjectDetailsComponent(rijksmuseumApiService as any);
  });

  describe('$onChanges', () => {
    describe('when objectNumber has been changed', () => {
      it('should load details', (done) => {
        const newArtObjectDetails = {
          longTitle: 'New Art Object',
          description: 'Some new description',
          webImage: { url: '...' },
        };
        const changes = {
          objectNumber: {
            isFirstChange: () => false,
            previousValue: 'abc567',
            currentValue: 'bac123',
          },
        };
        artObjectDetailsComponent.artObjectDetails = {
          longTitle: 'Old Art Object',
          description: 'Some old description',
          webImage: { url: '...' },
        };
        artObjectDetailsComponent.objectNumber = 'bac123';
        rijksmuseumApiService.getDetails.mockReturnValue(Promise.resolve(newArtObjectDetails));

        artObjectDetailsComponent.$onChanges(changes);

        expect(artObjectDetailsComponent.artObjectDetails).toBeUndefined();
        expect(rijksmuseumApiService.getDetails).toHaveBeenCalledWith('bac123');

        setTimeout(() => {
          expect(artObjectDetailsComponent.artObjectDetails).toBe(newArtObjectDetails);
          done();
        });
      });
    });
  });
});
