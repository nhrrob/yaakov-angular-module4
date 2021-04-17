(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'app/templates/category-list.html',
  bindings: {
    items: '<'
  }
});

})();
