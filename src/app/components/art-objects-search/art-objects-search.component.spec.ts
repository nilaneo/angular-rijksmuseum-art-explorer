import { ArtObjectsSearchComponent } from './art-objects-search.component';

let artObjectsSearchComponent: ArtObjectsSearchComponent;

beforeEach(() => {
  artObjectsSearchComponent =  new ArtObjectsSearchComponent();
});

test('has empty string as default search query', () => {
  expect(artObjectsSearchComponent.searchQuery).toBe('');
});

test('should pass event to onSearch when onSubmit is called', () => {
  artObjectsSearchComponent.searchQuery = 'some query';
  artObjectsSearchComponent.onSearch = jest.fn();

  artObjectsSearchComponent.onSubmit();

  expect(artObjectsSearchComponent.onSearch).toHaveBeenCalledWith({
    $event: {
      searchQuery: 'some query',
    },
  });
});
