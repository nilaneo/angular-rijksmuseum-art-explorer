import angular from 'angular';

import { rijksmuseumApiServiceDeclaration } from './services/rijksmuseum-api/rijksmuseum-api.service';

import { rootComponentDeclaration } from './components/root/root.component';
import { artObjectsListDeclaration } from './components/art-objects-list/art-objects-list.component';

const appModule = angular.module('app', []);

appModule.service(rijksmuseumApiServiceDeclaration);

appModule.component(rootComponentDeclaration);
appModule.component(artObjectsListDeclaration);

export default appModule.name;
