import angular from 'angular';

import rootComponent from './components/root/root.component';
import artObjectsList from './components/art-objects-list/art-objects-list.component';

const appModule = angular.module('app', []);

appModule.component(rootComponent);
appModule.component(artObjectsList);

export default appModule.name;
