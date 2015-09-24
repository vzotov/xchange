var app = require('../app');

app.factory('Wish', ['$http', '$q', 'BasicModel', 'currentUser', function ($http, $q, BasicModel, currentUser) {
    var Wish = BasicModel.new('Wish');

    Wish.prototype.save = function () {
        this.user = currentUser.getId();
        return $http.put('/api/wish', this);
    };

    Wish.prototype.isValid = function () {
        return !!(this.tag);
    };

    Wish.get = function (query) {
        var defer = $q.defer();

        $http.get('/api/wish', {params: query})
            .then(function (response) {
                if (response.data.success) {
                    defer.resolve(response.data.wishes);
                }
                else {
                    defer.reject(response.data);
                }
            });
        return defer.promise;
    };

    return Wish;
}]);