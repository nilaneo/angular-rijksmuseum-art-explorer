import { InjectionToken } from '@angular/core';

export enum SortOrder {
  RELEVANCE = 'relevance',
  OBJECT_TYPE = 'objecttype',
  CHRONOLOGIC = 'chronologic',
  ACHRONOLOGIC = 'achronologic',
  ARTIST_ASC = 'artist',
  ARTIST_DESC = 'artistdesc',
}

export const defaultSortOrderToken = new InjectionToken('defaultSortOrder');
