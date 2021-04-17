(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'app/templates/item-list.html',
  bindings: {
    items: '<'
  }
});

})();
