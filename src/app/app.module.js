import angular from 'angular';

import { rijksmuseumApiServiceDeclaration } from './services/rijksmuseum-api/rijksmuseum-api.service';

import { rootComponentDeclaration } from './components/root/root.component';
import { artObjectsListDeclaration } from './components/art-objects-list/art-objects-list.component';
import { artObjectDetailsDeclaration } from './components/art-object-details/art-object-details.component';

const appModule = angular.module('app', []);

appModule.service(rijksmuseumApiServiceDeclaration);

appModule.component(rootComponentDeclaration);
appModule.component(artObjectsListDeclaration);
appModule.component(artObjectDetailsDeclaration);

export default appModule.name;
