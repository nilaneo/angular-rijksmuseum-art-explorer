import { ArtObjectsSortComponent } from './art-objects-sort.component';
import { SortOrder } from '../../values/sort-orders.value';

test('should pass event to onSortOrderChange when changeSortOrder is called', () => {
  const artObjectsSortComponent = new ArtObjectsSortComponent();
  artObjectsSortComponent.sortOrder = SortOrder.RELEVANCE;
  artObjectsSortComponent.onSortOrderChange = jest.fn();

  artObjectsSortComponent.changeSortOrder();

  expect(artObjectsSortComponent.onSortOrderChange).toHaveBeenCalledWith({
    $event: {
      newSortOrder: SortOrder.RELEVANCE,
    },
  });
});
