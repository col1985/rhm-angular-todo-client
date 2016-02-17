'use strict';

angular.module('myApp.controllers', ['fhcloud'])

.controller('MainCtrl', function($log, $q, fhcloud) {

  $log.debug('MainCtrl', this);
});
