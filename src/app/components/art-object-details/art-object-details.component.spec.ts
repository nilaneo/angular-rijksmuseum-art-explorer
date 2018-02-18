import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ArtObjectDetailsComponent } from './art-object-details.component';
import { IArtObjectDetails } from '../../services/rijksmuseum-api/rijksmuseum-api.service';

fdescribe('artObjectDetailsComponent', () => {
  let rijksmuseumApiService: { getDetails: jasmine.Spy };
  let artObjectDetailsComponent: ArtObjectDetailsComponent;
  let getDetailsSubject: ReplaySubject<IArtObjectDetails>;

  beforeEach(() => {
    rijksmuseumApiService = {
      getDetails: jasmine.createSpy(),
    };

    getDetailsSubject = new ReplaySubject();

    rijksmuseumApiService.getDetails
      .and.returnValue(getDetailsSubject.asObservable());

    artObjectDetailsComponent = new ArtObjectDetailsComponent(rijksmuseumApiService as any);
  });

  describe('ngOnChanges', () => {
    beforeEach(() => {
      artObjectDetailsComponent.artObjectDetails$ = Observable.of({
        longTitle: 'Old Art Object',
        description: 'Some old description',
        webImage: { url: '...' },
      });
      artObjectDetailsComponent.objectNumber = 'abc567';
    });

    describe('when objectNumber has not been changed', () => {
      beforeEach(() => {
        artObjectDetailsComponent.ngOnChanges({});
      });

      it('should not unset old details', () => {
        expect(artObjectDetailsComponent.artObjectDetails$).not.toBeUndefined();
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
            firstChange: false,
            previousValue: 'abc567',
            currentValue: 'bac123',
          },
        };
        artObjectDetailsComponent.objectNumber = 'bac123';

        artObjectDetailsComponent.ngOnChanges(changes);
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

          getDetailsSubject.next(newArtObjectDetails);
          getDetailsSubject.complete();
        });

        it('should store new details', (done: DoneFn) => {
          expect(artObjectDetailsComponent.artObjectDetails$).toBeDefined();

          if (artObjectDetailsComponent.artObjectDetails$) {
            artObjectDetailsComponent
              .artObjectDetails$
              .subscribe((artObjectDetails) => {
                expect(artObjectDetails).toBe(newArtObjectDetails);
                done();
              });
          } else {
            done();
          }
        });
      });
    });

    describe('when objectNumber has been changed to undefined', () => {
      beforeEach(() => {
        const changes = {
          objectNumber: {
            isFirstChange: () => false,
            firstChange: false,
            previousValue: 'abc567',
            currentValue: undefined,
          },
        };
        artObjectDetailsComponent.objectNumber = undefined;

        artObjectDetailsComponent.ngOnChanges(changes);
      });

      it('should unset old details', () => {
        expect(artObjectDetailsComponent.artObjectDetails$).toBeUndefined();
      });

      it('should not load details', () => {
        expect(rijksmuseumApiService.getDetails).not.toHaveBeenCalled();
      });
    });
  });
});
