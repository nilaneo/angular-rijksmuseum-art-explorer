import { ArtObjectsSearchComponent } from './art-objects-search.component';

describe('artObjectsSearchComponent', () => {
  let artObjectsSearchComponent: ArtObjectsSearchComponent;

  beforeEach(() => {
    artObjectsSearchComponent =  new ArtObjectsSearchComponent();
  });

  fdescribe('onSubmit', () => {
    beforeEach(() => {
      spyOn(artObjectsSearchComponent.search, 'emit');

      artObjectsSearchComponent.onSubmit('some query');
    });

    it('should emit search event', () => {
      expect(artObjectsSearchComponent.search.emit)
        .toHaveBeenCalledWith({ searchQuery: 'some query' });
    });
  });
});
