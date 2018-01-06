import template from './root.component.html';
import './root.component.css';

export class RootComponent {
  constructor() {
    console.log('RootComponent created!')
  }
}

export const rootComponentDeclaration = {
  rmRoot: {
    bindings: {},
    controller: RootComponent,
    template
  }
};
