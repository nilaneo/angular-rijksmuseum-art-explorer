import { ArtObjectsSortComponent } from './art-objects-sort.component';
import { SortOrder } from '../../values/sort-orders.value';

describe('artObjectsSortComponent', () => {
  let artObjectsSortComponent: ArtObjectsSortComponent;

  beforeEach(() => {
    artObjectsSortComponent = new ArtObjectsSortComponent();
  });

  describe('changeSortOrder', () => {
    it('should emit sortOrderChange event', () => {
      artObjectsSortComponent.sortOrder = SortOrder.RELEVANCE;
      spyOn(artObjectsSortComponent.sortOrderChange, 'emit');

      artObjectsSortComponent.changeSortOrder();

      expect(artObjectsSortComponent.sortOrderChange.emit)
        .toHaveBeenCalledWith({ newSortOrder: SortOrder.RELEVANCE });
    });
  });
});
