'use strict';

angular.module('myApp.controllers', ['fhcloud'])

.controller('MainCtrl', function($scope, $q, fhcloud) {

  // set an empty Model for the <input>
  this.label = '';
  // have some dummy data for the todo list
  // complete property with Boolean values to display
  // finished todos
  this.todos = [{
    label: 'Learn Angular',
    complete: false
  }, {
    label: 'Deploy to S3',
    complete: true
  }, {
    label: 'Rewrite Todo Component',
    complete: true
  }];
  // method to iterate the todo items and return
  // a filtered Array of incomplete items
  // we then capture the length to display 1 of 3
  // for example
  this.updateIncomplete = function() {
    return this.todos.filter(function(item) {
      return !item.complete;
    }).length;
  };
  // each todo item contains a ( X ) button to delete it
  // we simply splice it from the Array using the $index
  this.deleteItem = function(index) {
    this.todos.splice(index, 1);
  };
  // the submit event for the <form> allows us to type and
  // press enter instead of ng-click on the <button> element
  // we capture $event and prevent default to prevent form submission
  // and if the label has a length, we'll unshift it into the this.todos
  // Array which will then add the new todo item into the list
  // we'll then set this.label back to an empty String
  this.onSubmit = function(event) {
    if (this.label.length) {
      this.todos.unshift({
        label: this.label,
        complete: false
      });
      this.label = '';
    }
    event.preventDefault();
  };
  // // add function to pass userInput to cloud via
  // // $fh.cloud call to controller scope
  // $scope.getNumberOfCharacters = function() {
  //   var userInput = $scope.userInput;

  //   //Notifying the user that the cloud endpoint is being called.
  //   $scope.noticeMessage = "Calling Cloud Endpoint";
  //   $scope.textClassName = "text-info";

  //   //Creating an AngularJS promise as the $fh.cloud function is asynchronous.
  //   var defer = $q.defer();

  //   var promise = defer.promise;

  //   //When the promise has completed, then the notice message can be updated to include result of the $fh.cloud call.
  //   promise.then(function(response){
  //     // If successful, display the length  of the string.
  //     if (response.msg != null && typeof(response.msg) !== 'undefined') {
  //       $scope.noticeMessage = response.msg;
  //       $scope.textClassName = "text-success";
  //     } else {
  //       $scope.noticeMessage  = "Error: Expected a message from $fh.cloud.";
  //       $scope.textClassName = "text-danger";
  //     }
  //   }, function(err){
  //     //If the function
  //     $scope.noticeMessage = "$fh.cloud failed. Error: " + JSON.stringify(err);
  //   });

  //   // check if userInput is defined
  //   if (userInput) {
  //     /**
  //      * Pass the userInput to the module containing the $fh.cloud call.
  //      *
  //      * Notice that the defer.resolve and defer.reject functions are passed to the module.
  //      * One of these functions will be called when the $fh.cloud function has completed successully or encountered
  //      * an error.
  //      */
  //     fhcloud.cloud('hello', userInput, defer.resolve, defer.reject);
  //   }
  // };
  //
  console.log('MainCtrl', this)
});
