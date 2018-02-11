import { ArtObjectsSearchComponent } from './art-objects-search.component';

describe('artObjectsSearchComponent', () => {
  let artObjectsSearchComponent: ArtObjectsSearchComponent;

  beforeEach(() => {
    artObjectsSearchComponent =  new ArtObjectsSearchComponent();
  });

  fdescribe('onSubmit', () => {
    let $event;

    beforeEach(() => {
      $event = new Event('submit');

      spyOn($event, 'preventDefault');
      spyOn(artObjectsSearchComponent.search, 'emit');

      artObjectsSearchComponent.onSubmit($event, 'some query');
    });

    it('should prevent default event', () => {
      expect($event.preventDefault).toHaveBeenCalled();
    });

    it('should emit search event', () => {
      expect(artObjectsSearchComponent.search.emit)
        .toHaveBeenCalledWith({ searchQuery: 'some query' });
    });
  });
});
