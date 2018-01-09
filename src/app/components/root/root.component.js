import template from './root.component.html';
import './root.component.css';

export class RootComponent {
  constructor() {
    this.selectedArtObjectNumber = null;
  }

  onSelect($event) {
    this.selectedArtObjectNumber = $event.objectNumber;
  }
}

export const rootComponentDeclaration = {
  rmRoot: {
    bindings: {},
    controller: RootComponent,
    template
  }
};
