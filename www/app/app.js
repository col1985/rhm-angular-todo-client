'use strict';

angular.module('myApp', ['ngRoute',
        'ngSanitize',
        'myApp.controllers',
        'myApp.directives',
        'myApp.services',
        'myApp.filters',
        'snap',
        'fhcloud'
    ])
    .config(function($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/example.html',
                controller: 'MainCtrl as ctrl'
            })
    })
    .run(function($log) {
        $log.info('Todo Example App has started.');
    });
