import { ArtObjectsSearchComponent } from './art-objects-search.component';

describe('artObjectsSearchComponent', () => {
  let artObjectsSearchComponent: ArtObjectsSearchComponent;

  beforeEach(() => {
    artObjectsSearchComponent =  new ArtObjectsSearchComponent();
  });

  it('has empty string as default search query', () => {
    expect(artObjectsSearchComponent.searchQuery).toBe('');
  });

  describe('onSubmit', () => {
    it('should emit search event', () => {
      artObjectsSearchComponent.searchQuery = 'some query';
      spyOn(artObjectsSearchComponent.search, 'emit');

      artObjectsSearchComponent.onSubmit();

      expect(artObjectsSearchComponent.search.emit)
        .toHaveBeenCalledWith({ searchQuery: 'some query' });
    });
  });
});
