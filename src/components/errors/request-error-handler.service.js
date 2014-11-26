'use strict';

angular.module('errors', [])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('HttpErrorsInterceptor');
    }
);

angular.module('errors').factory('HttpErrorsInterceptor', function ($q, $rootScope) {

    return {

        responseError : function(rejection) {
            var config = rejection.config;
            if(config.bypassErrorInterceptor) {
                return $q.reject(rejection);
            }

            var reason = (rejection.data !== null) ? rejection.data.cause : '';

            if (rejection.status === 0) {
                reason = 'Could not connect to server';
            }

            $rootScope.$broadcast('http-error', reason);
            return $q.reject(rejection);
        }

    };

});