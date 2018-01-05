import template from './root.component.html';

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
