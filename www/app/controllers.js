'use strict';

angular.module('myApp.controllers', ['fhcloud'])

.controller('MainCtrl', function($log, $q, fhcloud) {
  // set an empty Model for the <input>
  this.label = '';

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

  // add function to pass userInput to cloud via
  // $fh.cloud call to controller scope
  this.saveTodoItem = function(todoItem) {
    var self = this;
    var d = $q.defer();
    var promise = d.promise;

    promise.then(function(response) {
      if (response !== null) {
        self.todos = response;
        $log.debug('saveTodoItem response, toDo list updated', self.todos);
      } else {
        alert("Error: Expected a message from $fh.cloud.");
        $log.error("Error: Expected a message from $fh.cloud.");
      }
    }, function(err) {
      alert("$fh.cloud request failed. Error: " + JSON.stringify(err));
    });

    // invoke asyncronus $fhCloud call
    fhcloud.cloud({
      "path": "/todo",
      "method": "POST",
      "data": {
        "taskToSave": todoItem.data
      },
    }, d.resolve, d.reject);
  };

  // the submit event for the <form> allows us to type and
  // press enter instead of ng-click on the <button> element
  // we capture $event and prevent default to prevent form submission
  // and if the label has a length, we'll unshift it into the this.todos
  // Array which will then add the new todo item into the list
  // we'll then set this.label back to an empty String
  this.onSubmit = function(event) {
    if (this.label.length) {
      var newTask = {
        data: {
          label: this.label,
          complete: false,
          date: new Date()
        }
      };
      // this.todos.unshift(newTask);
      this.saveTodoItem(newTask);
      this.label = '';
    }
    event.preventDefault();
  };

  // method to iterate the todo items and return
  // a filtered Array of incomplete items
  // we then capture the length to display 1 of 3
  // for example
  this.updateIncomplete = function() {
    return this.todos.filter(function(item) {
      return !item.data.complete;
    }).length;
  };

  // each todo item contains a ( X ) button to delete it
  // we simply splice it from the Array using the $index
  this.deleteTodoItem = function(index) {
    var self = this;
    var taskId = this.todos[index].uid;
    var d = $q.defer();
    var promise = d.promise;

    promise.then(function(response) {
      if (response !== null) {
        self.todos = response;
        $log.debug('deleteTodoItem response, toDo list updated', self.todos);
      } else {
        alert("Error: Expected a message from $fh.cloud.");
        $log.error("Error: Expected a message from $fh.cloud.");
      }
    }, function(err) {
      alert("deleteTodoItem request failed. Error: " + JSON.stringify(err));
    });

    fhcloud.cloud({
      "path": "/todo",
      "method": "DELETE",
      "data": {
        "taskId": taskId
      },
    }, d.resolve, d.reject);
  };

  this.completeTodoItem = function(index) {
    var self = this;
    var taskToUpdate = this.todos[index];
    var d = $q.defer();
    var promise = d.promise;

    // set task to complete
    taskToUpdate.data.complete = true;

    promise.then(function(response) {
      if (response !== null) {
        self.todos = response;
        $log.debug('completeTodoItem response, toDo list updated', self.todos);
      } else {
        alert("Error: Expected a message from $fh.cloud.");
        $log.error("Error: Expected a message from $fh.cloud.");
      }
    }, function(err) {
      alert("completeTodoItem request failed. Error: " + JSON.stringify(err));
    });

    fhcloud.cloud({
      "path": "/todo",
      "method": "PUT",
      "data": {
        "taskId": taskToUpdate.uid,
        "data": taskToUpdate.data
      },
    }, d.resolve, d.reject);
  }

  $log.debug('MainCtrl', this);
});
