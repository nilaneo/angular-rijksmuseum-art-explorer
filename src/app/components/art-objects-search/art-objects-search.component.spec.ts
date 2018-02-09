import { ArtObjectsSearchComponent } from './art-objects-search.component';

describe('artObjectsSearchComponent', () => {
  let artObjectsSearchComponent: ArtObjectsSearchComponent;

  beforeEach(() => {
    artObjectsSearchComponent =  new ArtObjectsSearchComponent();
  });

  describe('onSubmit', () => {
    it('should emit search event', () => {
      spyOn(artObjectsSearchComponent.search, 'emit');

      artObjectsSearchComponent.onSubmit('some query');

      expect(artObjectsSearchComponent.search.emit)
        .toHaveBeenCalledWith({ searchQuery: 'some query' });
    });
  });
});
