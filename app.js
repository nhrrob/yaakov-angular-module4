(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
        .directive('foundItems', FoundItems);

    function FoundItems() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                list: '<', 
                onRemove: '&' 
            }
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var nitdown = this;
        nitdown.found = [];

        nitdown.getMatchedMenuItems = function () {
            var promise = MenuSearchService.getMatchedMenuItems(nitdown.searchTerm);
            promise.then(function (response) {
                nitdown.found = response;
            })
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
        };

        nitdown.removeItem = function (index) {
            nitdown.found.splice(index, 1);
        };
    };

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
            }).then(function (result) {
                // process result and only keep items that match
                var foundItems = [];
                var items = result.data.menu_items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].description.indexOf(searchTerm) != -1) {
                        foundItems.push(items[i]);
                    }
                }
                // return processed items
                return foundItems;
            });
        };

    };

})();