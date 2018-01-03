import template from './root.component.html';

class RootComponent {
  constructor() {
    console.log('RootComponent created!')
  }
}

export default {
  rmRoot: {
    bindings: {},
    controller: RootComponent,
    template
  }
};
