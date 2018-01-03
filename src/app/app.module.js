import angular from 'angular';

import rootComponent from './components/root/root.component';

const appModule = angular.module('app', []);
appModule.component(rootComponent);

export default appModule.name;
