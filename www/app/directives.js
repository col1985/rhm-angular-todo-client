'use strict';

angular.module('myApp.directives', [])

.directive('fhheader', function() {
    return {
        scope: {},
        restrict: 'E',
        replace: true,
        templateUrl: 'views/components/header.html',
        link: function(scope, elem, attrs, ctrl) {
            var headerProps = {
                title: attrs.title,
                subtext: attrs.subtext
            };
            scope.title = headerProps;
        }
    };
})

.directive('todo', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/components/todo.html',
        link: function(scope, elem, attrs, ctrl) {
            // console.log('todo', scope)
        }
    };
})

.directive('fhfooter', function() {
    return {
        scope: {},
        restrict: 'E',
        replace: true,
        templateUrl: 'views/components/footer.html',
        link: function(scope, elem, attrs, ctrl) {
            scope.version = attrs.version;
        }
    };
});
