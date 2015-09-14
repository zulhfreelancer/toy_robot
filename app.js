var app = angular.module("myApp", []);

app.controller('myCtrl', function($scope) {

    var steps = 0;
    var pos = 40;
    console.log("Initial pos: " + pos);

    $scope.init = function() {
        console.log(steps);
        setCurrent(pos);
    };

    $scope.init();

    function setCurrent(pos) {
        $("#t" + pos).addClass("current");
    }

    $scope.hello = function(place) {

        steps++;
        var prevPos;

        console.log(steps);

        if (steps === 0) {

        } else {
            prevPos = pos;
        }



        console.log("Prev pos: " + prevPos);
        $("#t" + prevPos).removeClass("current");

        var newX = place.x;
        var newY = place.y;

        $("#t" + newX + newY).addClass("current");
        pos = newX + "" + newY;
        console.log("Latest pos: " + pos);
    };

});