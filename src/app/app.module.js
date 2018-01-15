import angular from 'angular';

import { rijksmuseumApiServiceDeclaration } from './services/rijksmuseum-api/rijksmuseum-api.service';

import { rootComponentDeclaration } from './components/root/root.component';
import { artObjectsListDeclaration } from './components/art-objects-list/art-objects-list.component';
import { artObjectDetailsDeclaration } from './components/art-object-details/art-object-details.component';
import { artObjectsSearchDeclaration } from './components/art-objects-search/art-objects-search.component';
import { artObjectsSortDeclaration } from './components/art-objects-sort/art-objects-sort.component';
import { paginationDeclaration } from './components/pagination/pagination.component';

const appModule = angular.module('app', []);

appModule.service(rijksmuseumApiServiceDeclaration);

appModule.component(rootComponentDeclaration);
appModule.component(artObjectsListDeclaration);
appModule.component(artObjectDetailsDeclaration);
appModule.component(artObjectsSearchDeclaration);
appModule.component(artObjectsSortDeclaration);
appModule.component(paginationDeclaration);

export default appModule.name;
