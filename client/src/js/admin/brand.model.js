var app = require('../app');
/**
 * Model for brand (manufacturer, author, etc.)
 * e.g. iPhone, Tesla, Stephen King, etc.
 */
app.factory('Brand', ['$http', '$q', 'BasicModel', function ($http, $q, BasicModel) {
    var Brand = BasicModel.new('Brand');

    Brand.prototype.save = function () {
        return $http.put('/api/brand', this);
    };

    Brand.prototype.isValid = function () {
        return !!(this.name);
    };

    Brand.get = function () {
        var defer = $q.defer();

        $http.get('/api/brand')
            .then(function (response) {
                if (response.data.success) {
                    defer.resolve(response.data.brands);
                }
                else {
                    defer.reject(response.data);
                }
            });
        return defer.promise;
    };

    return Brand;
}]);