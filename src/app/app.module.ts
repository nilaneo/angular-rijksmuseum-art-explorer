import * as angular from 'angular';

import { rijksmuseumApiServiceDeclaration } from './services/rijksmuseum-api/rijksmuseum-api.service';

import { sortOrdersValueDeclaration } from './values/sort-orders.value';

import { rootComponentName, rootComponentOptions } from './components/root/root.component';
import { artObjectsListComponentName, artObjectsListComponentOptions } from './components/art-objects-list/art-objects-list.component';
import { artObjectDetailsComponentName, artObjectDetailsComponentOptions } from './components/art-object-details/art-object-details.component';
import { artObjectsSearchComponentName, artObjectsSearchComponentOptions } from './components/art-objects-search/art-objects-search.component';
import { artObjectsSortComponentName, artObjectsSortComponentOptions } from './components/art-objects-sort/art-objects-sort.component';
import { paginationComponentName, paginationComponentOptions } from './components/pagination/pagination.component';

const appModuleName = 'app';
const appModule = angular.module(appModuleName, []);

appModule.service(rijksmuseumApiServiceDeclaration);

appModule.value(sortOrdersValueDeclaration);

appModule.component(rootComponentName, rootComponentOptions);
appModule.component(artObjectsListComponentName, artObjectsListComponentOptions);
appModule.component(artObjectDetailsComponentName, artObjectDetailsComponentOptions);
appModule.component(artObjectsSearchComponentName, artObjectsSearchComponentOptions);
appModule.component(artObjectsSortComponentName, artObjectsSortComponentOptions);
appModule.component(paginationComponentName, paginationComponentOptions);

export default appModuleName;
