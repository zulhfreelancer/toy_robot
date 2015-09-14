var app = angular.module("myApp", []);

app.controller('myCtrl', function($scope) {

    var steps = 0;
    var startTile = 12;
    var pos = startTile;
    var prevPos;
    var facing = [1, 2, 3, 4];

    console.log("Initial pos: " + pos);
    console.log("All facing: " + facing);

    $scope.init = function() {
        console.log("Step: " + steps);
        setCurrent(pos);

        facing = 2;
        console.log("Initial facing: " + facing);
        botPos(pos);
    };

    $scope.init();

    function setCurrent(pos) {
        $("#t" + pos).addClass("current move");
    }

    $scope.placeRobot = function(place) {

        if (place.x && place.y) {
            steps++;

            console.log("Step: " + steps);

            if (steps === 0) {

            } else {
                prevPos = pos;
            }

            console.log("Prev pos: " + prevPos);
            $("#t" + prevPos).removeClass("current move");

            var newX = place.x;
            var newY = place.y;

            $("#t" + newX + newY).addClass("current move");
            pos = newX + "" + newY;
            console.log("Latest pos: " + pos);
            botPos(pos);
        } else {
            alert("Please insert both X and Y coordinate!");
        };
    };

    $scope.move = function() {
        console.log("I'm moving!");
        steps++;
        console.log("Step: " + steps);

        if (steps === 0) {

        } else {
            prevPos = pos;
        }

        console.log("Prev post: " + prevPos);
        var split = prevPos.toString(10).split("").map(function(t) {
            return parseInt(t)
        });

        var prevX = split[0];
        var prevY = split[1];

        console.log("Prev X: " + prevX);
        console.log("Prev Y: " + prevY);

        newX = prevX + 1;
        newY = prevY;

        $("#t" + prevPos).removeClass("current move");
        $("#t" + newX + newY).addClass("current move");
        pos = newX + "" + newY;
        console.log("Latest pos: " + pos);
        botPos(pos);
    };

    $scope.left = function() {
        console.log("I'm turning left!");
        steps++;
        console.log("Step: " + steps);

        console.log("Prev facing: " + facing);
        facing -= 1;
        console.log("New facing: " + facing);

        if (steps === 0) {

        } else {
            prevPos = pos;
        }

        $("#t" + prevPos).removeClass("current move right");
        $("#t" + prevPos).addClass("current left");

        botPos(pos);
    };

    $scope.right = function() {
        console.log("I'm turning right!");
        steps++;
        console.log("Step: " + steps);

        console.log("Prev facing: " + facing);
        facing += 1;
        console.log("New facing: " + facing);

        if (steps === 0) {

        } else {
            prevPos = pos;
        }

        $("#t" + prevPos).removeClass("current move left");
        $("#t" + prevPos).addClass("current right");

        botPos(pos);
    };

    $scope.reset = function() {
        console.log("Reset yo!");

        console.log("Current pos: " + pos);
        $("#t" + pos).removeClass("current move left right");
        setCurrent(startTile);
        pos = startTile;
        botPos(pos);
    };

    // helper function to show current bot position inside view
    function botPos(pos) {
        split = pos.toString(10).split("").map(function(t) {
            return parseInt(t)
        });

        var x = split[0];
        var y = split[1];

        $scope.x = x;
        $scope.y = y;

        if (facing == 1) {
          console.log("Facing west");
          $scope.f = "west";
        } else if (facing == 2) {
          console.log("Facing north");
          $scope.f = "north";
        } else if (facing == 3) {
          console.log("Facing east");
          $scope.f = "east";
        } else if (facing == 4) {
          console.log("Facing south");
          $scope.f = "south";
        } else {
          console.log("Out of range");
        }
    }

});