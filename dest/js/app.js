'use-strict';
var app = angular.module('checkoutApp', []);

app.controller('checkoutController', ['$scope', 'IssueTracker', function($scope, IssueTracker) {
    $scope.name = '';
    $scope.splitName = function(name) {
        name = name.split(' ');
        return name;
    }

    $scope.user = {
        "name": $scope.name,
        "address": $scope.address
    };



    $scope.validate = function() {
        this.issueTracker = new IssueTracker();
        // check that name is filled out (includes a space)
        if (name === undefined) {
            this.issueTracker.add("Please enter your name");
        }
        // check address
        // check email
        console.log('validate', issueTracker.issues);
    };
}]);

app.factory('IssueTracker', function() {
    return {
        issues: [],
        add: function(issue) {
            this.issues.push(issue);
        },
        retrieve: function() {
            var message = "";
            return message;
        }
    }
});