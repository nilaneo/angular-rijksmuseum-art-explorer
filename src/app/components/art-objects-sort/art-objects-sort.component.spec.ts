import { ArtObjectsSortComponent } from './art-objects-sort.component';
import { SortOrder } from '../../values/sort-orders.value';

describe('artObjectsSortComponent', () => {
  let artObjectsSortComponent: ArtObjectsSortComponent;

  beforeEach(() => {
    artObjectsSortComponent = new ArtObjectsSortComponent();
  });

  describe('changeSortOrder', () => {
    it('should pass event to onSortOrderChange', () => {
      artObjectsSortComponent.sortOrder = SortOrder.RELEVANCE;
      artObjectsSortComponent.onSortOrderChange = jest.fn();

      artObjectsSortComponent.changeSortOrder();

      expect(artObjectsSortComponent.onSortOrderChange).toHaveBeenCalledWith({
        $event: {
          newSortOrder: SortOrder.RELEVANCE,
        },
      });
    });
  });
});
