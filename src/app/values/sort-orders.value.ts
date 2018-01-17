export const sortOrdersToken = 'sortOrders';
export const sortOrders = {
  RELEVANCE: 'relevance',
  OBJECT_TYPE: 'objecttype',
  CHRONOLOGIC: 'chronologic',
  ACHRONOLOGIC: 'achronologic',
  ARTIST_ASC: 'artist',
  ARTIST_DESC: 'artistdesc',
};

export const defaultSortOrderToken = 'defaultSortOrder';
export const defaultSortOrder = sortOrders.RELEVANCE;

export const sortOrdersValueDeclaration = {
  [sortOrdersToken]: sortOrders,
  [defaultSortOrderToken]: defaultSortOrder,
};
