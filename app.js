var app = angular.module("myApp", []);

app.controller('myCtrl', function($scope) {

    var steps = 0;
    var startTile = 12;
    var pos = startTile;
    var prevPos;
    var facing;
    var facingDeg;
    var doRotate;

    console.log("Initial pos: " + pos);

    $scope.init = function() {
        console.log("Step: " + steps);
        start(pos);
    };

    $scope.init();

    function start(pos) {
        $("#t" + pos).addClass("current");

        // reset robot head to heading north at angle 0
        document.getElementById("t" + pos).style.WebkitTransform = "rotate(0deg)";
        document.getElementById("t" + pos).style.msTransform = "rotate(0deg)";
        document.getElementById("t" + pos).style.transform = "rotate(0deg)";

        facing = 2;
        facingDeg = 0;
        console.log("Initial facing: " + facing);
        console.log("Facing deg: " + facingDeg);
        botPos(pos);
    }

    function rotate(facingDeg, prevPos) {

        console.log("Rotating to: " + facingDeg);
        console.log("Prev pos: " + prevPos);

        document.getElementById("t" + prevPos).style.WebkitTransform = "rotate(" + facingDeg + "deg)";
        document.getElementById("t" + prevPos).style.msTransform = "rotate(" + facingDeg + "deg)";
        document.getElementById("t" + prevPos).style.transform = "rotate(" + facingDeg + "deg)";

        console.log("Latest facing deg: " + facingDeg);
    }

    $scope.placeRobot = function(place) {

        if (place.x !== '' && place.y !== '') {

            if ((place.x >= 0 && place.x < 5) && (place.y >= 0 && place.y < 5)) {
                steps++;

                console.log("Step for this placeRobot: " + steps);
                console.log("Facing for this placeRobot: " + facing);

                if (steps === 0) {
                    prevPos = startTile;
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
                rotateAfterForward(facing, pos);
                botPos(pos);
            } else {
                alert("Please only enter number of X and Y in range of 0 - 4");
            }

        } else {
            alert("Please insert both X and Y coordinate!");
        }
    };

    $scope.move = function() {
        console.log("I'm moving!");
        steps++;
        console.log("Step: " + steps);

        console.log("Facing: " + facing);
        console.log("Pos: " + pos);

        if (steps === 0) {
            prevPos = startTile;
        } else {
            prevPos = pos;
        }


        if (facing == 1) {
            // forward to west
            console.log("Moving to west");
            forwardWest();
        } else if (facing == 2) {
            // forward to north
            console.log("Moving to north");
            forwardNorth();
        } else if (facing == 3) {
            // facing to east
            console.log("Moving to east");
            forwardEast();
        } else if (facing == 4 || facing === 0) {
            // facing to south
            console.log("Moving to south");
            forwardSouth();
        }

    };

    function forwardEast() {
        console.log("Hello from forwardEast function!");
        console.log("prevPos: " + prevPos);
        console.log("Facing: " + facing);

        var split = prevPos.toString(10).split("").map(function(t) {
            return parseInt(t)
        });

        var prevX = split[0];
        var prevY = split[1];

        console.log("Prev X: " + prevX);
        console.log("Prev Y: " + prevY);

        newX = prevX;
        newY = prevY + 1;

        if (newY < 5) {
            $("#t" + prevPos).removeClass("current");
            $("#t" + newX + newY).addClass("current");
            pos = newX + "" + newY;
            console.log("Latest pos: " + pos);
            botPos(pos);
            rotateAfterForward(facing, pos);
        } else {
            alert("Sorry, no more tile available");
        }
    }

    function forwardWest() {
        console.log("Hello from forwardWest function!");
        console.log("prevPos: " + prevPos);
        console.log("Facing: " + facing);

        var split = prevPos.toString(10).split("").map(function(t) {
            return parseInt(t)
        });

        var prevX = split[0];
        var prevY = split[1];

        console.log("Prev X: " + prevX);
        console.log("Prev Y: " + prevY);

        newX = prevX;
        newY = prevY - 1;

        if (newY >= 0) {
            $("#t" + prevPos).removeClass("current");
            $("#t" + newX + newY).addClass("current");
            pos = newX + "" + newY;
            console.log("Latest pos: " + pos);
            botPos(pos);
            rotateAfterForward(facing, pos);
        } else {
            alert("Sorry, no more tile available");
        }
    }

    function forwardNorth() {
        console.log("Hello from forwardNorth function!");
        console.log("prevPos: " + prevPos);
        console.log("Facing: " + facing);

        var split = prevPos.toString(10).split("").map(function(t) {
            return parseInt(t)
        });

        var prevX = split[0];
        var prevY = split[1];

        console.log("Prev X: " + prevX);
        console.log("Prev Y: " + prevY);

        newX = prevX + 1;
        newY = prevY;

        if (newX < 5) {
            $("#t" + prevPos).removeClass("current");
            $("#t" + newX + newY).addClass("current");
            pos = newX + "" + newY;
            console.log("Latest pos: " + pos);
            botPos(pos);
            rotateAfterForward(facing, pos);
        } else {
            alert("Sorry, no more tile available");
        }
    }

    function forwardSouth() {
        console.log("Hello from forwardSouth function!");
        console.log("prevPos: " + prevPos);
        console.log("Facing: " + facing);

        var split = prevPos.toString(10).split("").map(function(t) {
            return parseInt(t)
        });

        var prevX = split[0];
        var prevY = split[1];

        console.log("Prev X: " + prevX);
        console.log("Prev Y: " + prevY);

        newX = prevX - 1;
        newY = prevY;

        if (newX >= 0) {
            $("#t" + prevPos).removeClass("current");
            $("#t" + newX + newY).addClass("current");
            pos = newX + "" + newY;
            console.log("Latest pos: " + pos);
            botPos(pos);
            rotateAfterForward(facing, pos);
        } else {
            alert("Sorry, no more tile available");
        }

    }

    function rotateAfterForward(facing, prevPos) {
        if (facing == 1) {
            // west
            facingDeg = 270;
            console.log("Robot is rotating to: " + facingDeg);
            rotate(facingDeg, prevPos);
        } else if (facing == 2) {
            // north
            facingDeg = 0;
            console.log("Robot is rotating to: " + facingDeg);
            rotate(facingDeg, prevPos);
        } else if (facing == 3) {
            // east
            facingDeg = 90;
            console.log("Robot is rotating to: " + facingDeg);
            rotate(facingDeg, prevPos);
        } else if (facing == 4 || facing === 0) {
            // south
            facingDeg = 180;
            console.log("Robot is rotating to: " + facingDeg);
            rotate(facingDeg, prevPos);
        }
    }

    $scope.left = function() {
        console.log("I'm turning left!");
        steps++;
        console.log("Step: " + steps);

        console.log("Prev facing: " + facing);
        console.log("The robot currently facing: " + $scope.f);

        if ($scope.f == "west") {
            // when bot facing west
            doRotate = true;
        } else if ($scope.f == "north") {
            // when bot facing north
            doRotate = true;
        } else if ($scope.f == "east") {
            // when bot facing east
            doRotate = true;
        } else if ($scope.f == "south" && facing == 4) {
            // when bot facing south coming from east (right)
            // robot from east to south, want to go back to east
            doRotate = true;
        } else if ($scope.f == "south" && facing === 0) {
            // when bot facing south coming from west (left)
            // robot from west to south and want to go east (end of 360 degree cycle)
            doRotate = false;
        } else {
            // when bot facing other than west, north, east and south
            doRotate = false;
        }

        if ((facing >= 0 && facing < 5) && doRotate === true) {
            if (steps === 0) {

            } else {
                prevPos = pos;
                console.log("Current facing deg: " + facingDeg);
            }

            facing -= 1;
            console.log("New facing: " + facing);

            facingDeg -= 90;
            console.log("New facing deg: " + facingDeg);
            rotate(facingDeg, prevPos);

            botPos(pos);
        } else {
            alert("Cannot rotate left anymore\nPlease rotate back to right");
            console.log("Facing: " + facing);
        }

    };

    $scope.right = function() {
        console.log("I'm turning right!");
        steps++;
        console.log("Step: " + steps);

        console.log("Prev facing: " + facing);
        console.log("The robot currently facing: " + $scope.f);

        if ($scope.f == "west") {
            // when bot facing west
            doRotate = true;
        } else if ($scope.f == "north") {
            // when bot facing north
            doRotate = true;
        } else if ($scope.f == "east") {
            // when bot facing east
            doRotate = true;
        } else if ($scope.f == "south" && facing == 4) {
            // when bot facing south coming from east
            // robot from east to south and want to go to west (end of 360 degree cycle)
            doRotate = false;
        } else if ($scope.f == "south" && facing === 0) {
            // when bot facing south coming from west
            // robot from west to south and want to go back to west
            doRotate = true;
        } else {
            // when bot facing other than west, north, east and south
            doRotate = false;
        }

        if ((facing >= 0 && facing < 5) && doRotate === true) {
            if (steps === 0) {

            } else {
                prevPos = pos;
                console.log("Current facing deg: " + facingDeg);
            }

            facing += 1;
            console.log("New facing: " + facing);

            facingDeg += 90;
            console.log("New facing deg: " + facingDeg);
            rotate(facingDeg, prevPos);

            botPos(pos);
        } else {
            alert("Cannot rotate right anymore\nPlease rotate back to left");
            console.log("Facing: " + facing);
        }

    };

    $scope.reset = function() {
        console.log("Reset yo!");

        console.log("Current pos: " + pos);
        $("#t" + pos).removeClass("current");
        start(startTile);
        pos = startTile;
        start(pos);
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
            console.log("Latest facing: west");
            $scope.f = "west";
        } else if (facing == 2) {
            console.log("Latest facing: north");
            $scope.f = "north";
        } else if (facing == 3) {
            console.log("Latest facing: east");
            $scope.f = "east";
        } else if (facing == 4 || facing === 0) {
            console.log("Latest facing: south");
            $scope.f = "south";
        } else {
            console.log("Out of range");
        }
    }

});