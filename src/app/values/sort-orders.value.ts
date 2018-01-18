export enum SortOrder {
  RELEVANCE = 'relevance',
  OBJECT_TYPE = 'objecttype',
  CHRONOLOGIC = 'chronologic',
  ACHRONOLOGIC = 'achronologic',
  ARTIST_ASC = 'artist',
  ARTIST_DESC = 'artistdesc',
}

export const defaultSortOrderToken = 'defaultSortOrder';
export const defaultSortOrder: SortOrder = SortOrder.RELEVANCE;

export const sortOrdersValueDeclaration = {
  [defaultSortOrderToken]: defaultSortOrder,
};
