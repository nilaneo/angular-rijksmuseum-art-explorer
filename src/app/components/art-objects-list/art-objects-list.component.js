import template from './art-objects-list.component.html';

class ArtObjectsListComponent {
  constructor() {
    console.log('ArtObjectsListComponent created!')
  }
}

export default {
  rmArtObjectsList: {
    bindings: {},
    controller: ArtObjectsListComponent,
    template
  }
};
