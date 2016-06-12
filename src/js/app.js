'use-strict';
var app = angular.module('checkoutApp', []);

/* Main Controller */
app.controller('checkoutController', ['$scope', 'IssueTracker', function($scope, IssueTracker) {
    var data = {};
    $scope.billing = {};
    var inputArr = [];

    // $('input.form-control').each(function() {
    //     var input = $(this);
    //     inputArr.push(input[0]);
    // });
    // console.log('inputArr: ', inputArr);

    // TODO: can we collect all inputs of a certain type and put them in arrays?
        // then create a function that carries out validation checks on each item
        // in the array.

    var issueTracker = new IssueTracker();

    // TODO: data handling should be moved out of this function?
    //       if/else statements are redundant, create function
    //       that can be called on all inputs?

    var validate = function(input) {
        // input is an array of input values
        for (i = 0; i < input.length; i++) {
            if (input[i].value === "") {
                issueTracker.add("Please enter your " + input[i].name)
            } else {
                data[input[i].name] = input[i].value;
            }
        }
        console.log('data: ', data, $scope.name);
    }

    $scope.checkValidation = function() {
        // TODO: collect all input values
        $('input.form-control').each(function() {
            var input = $(this);
            inputArr.push(input[0]);
        });
        // console.log('inputArr: ', inputArr);

        validate(inputArr);

        // check that name is filled out (includes a space)
        // if ($scope.name === undefined) {
        //     issueTracker.add("Please enter your name");
        // } else {
        //     data.name = $scope.name;
        // }
        // // check address
        // if ($scope.address === undefined) {
        //    issueTracker.add("Plese enter your address");
        // } else {
        //     data.address = $scope.address;
        // }
        // if ($scope.city === undefined) {
        //     issueTracker.add("Please enter your city");
        // } else {
        //     data.city = $scope.city;
        // }

        // if ($scope.state === undefined) {
        //     issueTracker.add("Please enter your state or region");
        // } else {
        //     data.state = $scope.state;
        // }

        // // check email
        // if ($scope.email === undefined) {
        //    issueTracker.add("Please enter your email");
        // } else {
        //     data.email = $scope.email;
        // }

        // // check zip
        // if ($scope.zip === undefined) {
        //    issueTracker.add("Please enter your zip");
        // } else {
        //     data.zip = $scope.zip;
        // }

        // // ccNumber
        // if ($scope.ccNumber === undefined) {
        //    issueTracker.add("Please enter your credit card number");
        // } else {
        //     data.ccNumber = $scope.ccNumber;
        // }

        // // ccExpr
        // if ($scope.ccExp === undefined) {
        //    issueTracker.add("Please enter your credit card's expiration date");
        // } else {
        //     data.ccExp = $scope.ccExp;
        // }

        // // ccCvv
        // if ($scope.ccCvv === undefined) {
        //    issueTracker.add("Please enter your credit card's CVV number");
        // } else {
        //     data.ccCvv = $scope.ccCvv;
        // }

        // // check for billing address option
        // if ($scope.billingAddrCheck === true) {
        //     // handle billing address inputs
        //     if ($scope.billing.name === undefined || $scope.billing.name.length < 1) {
        //         issueTracker.add("Please enter billing name");
        //     } else {
        //         data.billing.name = $scope.billing.name;
        //     }

        //     if ($scope.billing.address === undefined || $scope.billing.address.length < 1) {
        //         issueTracker.add("Please enter billing address");
        //     } else {
        //         data.billing.address = $scope.billing.address;
        //     }

        //     if ($scope.billing.city === undefined || $scope.billing.city.length < 1) {
        //         issueTracker.add("Please enter billing city");
        //     } else {
        //         data.billing.city = $scope.billing.city;
        //     }

        //     if ($scope.billing.state === undefined || $scope.billing.state.length < 1) {
        //         issueTracker.add("Please enter billing state");
        //     } else {
        //         data.billing.state = $scope.billing.state;
        //     }
        //     if ($scope.billing.zip === undefined || $scope.billing.zip.length < 1) {
        //         issueTracker.add("Please enter billing zipcode");
        //     } else {
        //         data.billing.zip = $scope.billing.zip;
        //     }
        //     if ($scope.billing.country === undefined || $scope.billing.country.length < 1) {
        //         issueTracker.add("Please enter billing country");
        //     } else {
        //         data.billing.country = $scope.billing.country;
        //     }
        // } else {
        //     // send data to server
        //     // TODO: should be in seperate function?
        // }


        console.log('checkValidation', issueTracker.issues);
        // console.log('data: ', data, $scope.name);

        var inputIssues = issueTracker.retrieve();

        console.log('issueTracker.retrieve(): ', inputIssues)
    };
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

