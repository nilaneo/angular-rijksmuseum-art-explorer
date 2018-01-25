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
    it('should pass event to onSearch', () => {
      artObjectsSearchComponent.searchQuery = 'some query';
      artObjectsSearchComponent.onSearch = jest.fn();

      artObjectsSearchComponent.onSubmit();

      expect(artObjectsSearchComponent.onSearch).toHaveBeenCalledWith({
        $event: {
          searchQuery: 'some query',
        },
      });
    });
  });
});
