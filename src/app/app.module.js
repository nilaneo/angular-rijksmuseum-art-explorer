import angular from 'angular';

import { rijksmuseumApiServiceDeclaration } from './services/rijksmuseum-api/rijksmuseum-api.service';

import { rootComponentDeclaration } from './components/root/root.component';
import { artObjectsListDeclaration } from './components/art-objects-list/art-objects-list.component';
import { artObjectDetailsDeclaration } from './components/art-object-details/art-object-details.component';
import { artObjectsSearchDeclaration } from './components/art-objects-search/art-objects-search.component';

const appModule = angular.module('app', []);

appModule.service(rijksmuseumApiServiceDeclaration);

appModule.component(rootComponentDeclaration);
appModule.component(artObjectsListDeclaration);
appModule.component(artObjectDetailsDeclaration);
appModule.component(artObjectsSearchDeclaration);

export default appModule.name;
