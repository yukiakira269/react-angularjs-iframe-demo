var app = angular.module('myApp');
app.controller('DemoCtrl', function ($scope) {
    $scope.changeHandler = function () {
        //Sending message from parent -> child per keydown
        const systemNameFrame = document.getElementById("systemNameFrame");
        systemNameFrame.contentWindow.postMessage($scope.txtBox1, systemNameFrame.src);
        console.log(systemNameFrame.src);
    }
});

// The iframe should be handled here