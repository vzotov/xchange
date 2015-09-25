var app = require('../app');

app.factory('Trade', ['$http', '$q', 'BasicModel', 'currentUser', function ($http, $q, BasicModel, currentUser) {
    var Trade = BasicModel.new('Trade', {
        offered: []
    });

    Trade.prototype.send = function () {
        this.user = currentUser.getId();
        return $http.put('/api/trade', this);
    };

    Trade.prototype.isValid = function () {
        return !!(this.offered.length);
    };

    Trade.get = function (query) {
        var defer = $q.defer();

        $http.get('/api/trade', {params: query})
            .then(function (response) {
                if (response.data.success) {
                    defer.resolve(response.data.trades);
                }
                else {
                    defer.reject(response.data);
                }
            });
        return defer.promise;
    };

    Trade.prototype.has = function (item) {
        return this.offered.indexOf(item) > -1;
    };

    Trade.prototype.toggle = function (item) {
        var idx = this.offered.indexOf(item);
        if (idx > -1) {
            this.offered.splice(idx, 1);
        }
        else {
            this.offered.push(item);
        }
    };

    return Trade;
}]);