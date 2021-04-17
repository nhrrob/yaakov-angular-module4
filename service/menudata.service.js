(function () {
  'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http', 'ApiBasePath'];

  function MenuDataService($http, ApiBasePath) {
    var service = this;

    service.getAllCategories = function () {
      let categoryPromise = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      }).then(function (response) {
        return response.data;
      });

      return categoryPromise;
    };

    service.getItemsForCategory = function (categoryShortName) {
      let itemsPromise = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
          category: categoryShortName
        }
      }).then(function (response) {
        return response.data;
      });

      return itemsPromise;
    };
  }

})();
