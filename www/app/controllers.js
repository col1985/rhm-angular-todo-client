'use strict';

angular.module('myApp.controllers', ['fhcloud'])

.controller('MainCtrl', function($log, $q, fhcloud) {

  // our task array
  this.todos = [];

  // function is invoked on view render
  // see ng-init directive `todo.html`
  this.getTodos = function() {
    var self = this;
    //Creating an AngularJS promise as the
    //$fh.cloud function is asynchronous.
    var d = $q.defer();

    var promise = d.promise;

    //When the promise has completed, then the notice message
    //can be updated to include result of the $fh.cloud call.
    promise.then(function(response) {
      // If successful, display the length  of the string.
      if (response !== null) {
        self.todos = response;
        $log.debug('getTodos response, toDo list updated', self.todos);
      } else {
        alert("Error: Expected a message from $fh.cloud.");
        $log.error("Error: Expected a message from $fh.cloud.");
      }
    }, function(err) {
      //If the function
      alert("$fh.cloud request failed. Error: " + JSON.stringify(err));
    });

    // invoke asyncronus $fhCloud call
    fhcloud.cloud({
      "path": "/todo",
      "method": "GET",
      "data": {},
    }, d.resolve, d.reject);
  }

  $log.debug('MainCtrl', this);
});
