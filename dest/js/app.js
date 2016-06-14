'use-strict';
var app = angular.module('checkoutApp', []);

/* Main Controller */
app.controller('checkoutController', ['$scope', 'IssueTracker', function($scope, IssueTracker) {
    var data = {};
    $scope.billing = {};
    var inputArr = [];

    // hard-coded order info:
    $scope.order = [
        {
            name: 'item 1',
            quantity: 1,
            price: 50.00,
            imgUrl: 'http://placehold.it/100x80'
        },
                {
            name: 'item 2',
            quantity: 1,
            price: 150.00,
            imgUrl: 'http://placehold.it/100x80'
        }
    ];
    $scope.computeTotal = function(){
        var total = 0;
        for (var i = 0; i < $scope.order.length; i++) {
            total += $scope.order[i].price;
        }
        return total;
    }

    var issueTracker = new IssueTracker();

    $scope.checkValidation = function() {
        // collect all input values
        $('input.form-control').not('.billing').each(function() {
            var input = $(this);
            inputArr.push(input[0]);
        });

        // check for different billing address
        if ($scope.billingAddrCheck === true) {
            $('.billing').each(function() {
                var input = $(this);
                inputArr.push(input[0]);
            });
        }

        var validate = function(input) {
            for (i = 0; i < input.length; i++) {
                var dataKey = input[i].name.replace(/\s+/g, '_');
                // create object to hold data for each input element
                data[dataKey] = {};
                // check for empty inputs
                if (input[i].value === "") {
                    issueTracker.add("Please enter your " + input[i].name);
                    data[dataKey].message = ("Please enter your " + input[i].name);
                // TODO: check for illegal characters
                } else {
                    // create key/value pair for input value
                    data[dataKey].value = input[i].value;
                    data[dataKey].status = 'has-success';
                }
            }
        }
        validate(inputArr);

        // console.log('inputArr: ', inputArr);
        console.log('data: ', data, Object.keys(data).length);
        console.log('checkValidation', issueTracker.issues);

        var inputIssues = issueTracker.retrieve();
        console.log('issueTracker.retrieve(): ', inputIssues);
        console.log('status: ', data.name.status);
    };

    $scope.progressBar = function() {
        var progress = 0;
        if (data.name) {
            Object.keys($scope.data).forEach(function() {
                progress += 10;
                $('.progress-bar')
                    .css('width', (progress+'%'))
                    .attr('aria-valuenow', progress);
            });
        }
        console.log('progress: ', progress);
    };

    $scope.inputFeedback = function() {

        this.checkValidation();
        console.log('test: ', inputArr);
        for (input in data) {
            if (input.name.status) {
                console.log('hello');
                // return $('/* divNode */').addClass()
            }
        }
    }
}]);

/* IssueTracker Service */
app.factory('IssueTracker', function() {
    function IssueTracker() {
        this.issues = [];
    };
    IssueTracker.prototype = {
        add: function(issue) {

            this.issues.push(issue);
        },
        retrieve: function() {
            var message = "";
            switch (this.issues.length) {
                case 0:
                    break;
                case 1:
                    message = "Please fix the following issues:\n" + this.issues[0];
                    break;
                default:
                    message = "Please fix the following issues:\n" + this.issues.join('\n');
                    break;
            }
            return message;
        }
    };
    return IssueTracker;
});

app.animation('.form', [function() {
    return {
        enter: function(element, doneFn) {
            $(element).slideDown(400, doneFn);
            console.log('slide');
        }
    }
}]);
