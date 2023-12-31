Math.roundTo = function(place, value) {
  return Math.round(value * place) / place;
}

// PASS IN players[], returns perpendicular distance of both players from face to ball center
function frontFaceToBallCalc(playerArray) {
  var distVect = [];
  var distMag = [];
  for (var i=0; i < playerArray.length; i++) {
    var frontFaceVector = [playerArray[i].arrayX[0] - playerArray[i].arrayX[1], playerArray[i].arrayY[0] - playerArray[i].arrayY[1]];
    var frontFaceMag = playerArray[i].width;
    var frontFacePtv = [ball.x - playerArray[i].arrayX[1], ball.y - playerArray[i].arrayY[1]];
    var unitFrontFaceVector=[];
    var projFrontVect=[];
    var closest=[];

    for (var j=0; j<2; j++) {
      unitFrontFaceVector[j] = frontFaceVector[j]/frontFaceMag;
    }

    var projFrontMag = math.dot(frontFacePtv, unitFrontFaceVector);

    if (projFrontMag < 0) {
      closest = [playerArray[i].arrayX[0], playerArray[i].arrayY[0]];
    } else if (projFrontMag > frontFaceMag) {
      closest = [playerArray[i].arrayX[1], playerArray[i].arrayY[1]];
    } else {
      for (var j=0; j<2; j++) {
        projFrontVect[j] = projFrontMag*unitFrontFaceVector[j];
      }
      closest = [playerArray[i].arrayX[1] + projFrontVect[0] , playerArray[i].arrayY[1] + projFrontVect[1]];
    }

    distVect[i] = [ball.x - closest[0], ball.y - closest[1]];
    distMag[i] = Math.hypot(distVect[i][0], distVect[i][1]);

  }
  return [distMag[0], distMag[1]];
}

// PASS IN output from frontFaceToBallCalc(), returns nothing, affects speed/direction of ball if impacted by a car
function carFrontBallCollision(outputFromFrontFaceToBallCalc) {
  for (var i=0; i < 2; i++) {
    var frontFaceResult = outputFromFrontFaceToBallCalc[i];

    // IF CONTACT OCCURS
    if (frontFaceResult < ball.radius) {
      $('.ball-hit').trigger("play");
      var velMag;
      var turnAngle = players[i].rot*Math.PI/180;
      var bounceAngle = Math.atan(ball.velY / (ball.velX + players[i].vel));

      velMag = Math.hypot(ball.velY, (ball.velX + 1.5*players[i].vel));

      if(velMag < players[i].vel) velMag = players[i].vel + 2;

      var resultAngle = turnAngle + bounceAngle + Math.PI/2;

      ball.velX = -1*velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.velY = -1*velMag * Math.roundTo(100000, Math.sin(resultAngle));

      ball.x += -2*velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.y += -2*velMag * Math.roundTo(100000, Math.sin(resultAngle));
    }
  }
}

// PASS IN players[], returns perpendicular distance of both players from face to ball center
function rightFaceToBallCalc(playerArray) {
  var distVect = [];
  var distMag = [];
  for (var i=0; i < playerArray.length; i++) {
    var rightFaceVector = [playerArray[i].arrayX[2] - playerArray[i].arrayX[0], playerArray[i].arrayY[2] - playerArray[i].arrayY[0]];
    var rightFaceMag = playerArray[i].height;
    var rightFacePtv = [ball.x - playerArray[i].arrayX[0], ball.y - playerArray[i].arrayY[0]];
    var unitRightFaceVector=[];
    var projRightVect=[];
    var closest=[];

    for (var j=0; j<2; j++) {
      unitRightFaceVector[j] = rightFaceVector[j]/rightFaceMag;
    }

    var projRightMag = math.dot(rightFacePtv, unitRightFaceVector);

    if (projRightMag < 0) {
      closest = [playerArray[i].arrayX[2], playerArray[i].arrayY[2]];
    } else if (projRightMag > rightFaceMag) {
      closest = [playerArray[i].arrayX[0], playerArray[i].arrayY[0]];
    } else {
      for (var j=0; j<2; j++) {
        projRightVect[j] = projRightMag*unitRightFaceVector[j];
      }
      closest = [playerArray[i].arrayX[0] + projRightVect[0] , playerArray[i].arrayY[0] + projRightVect[1]];
    }

    distVect[i] = [ball.x - closest[0], ball.y - closest[1]];
    distMag[i] = Math.hypot(distVect[i][0], distVect[i][1]);

  }
  return [distMag[0], distMag[1]];
}

// PASS IN output from rightFaceToBallCalc(), returns nothing, affects speed/direction of ball if impacted by a car
function carRightBallCollision(outputFromRightFaceToBallCalc) {
  for (var i=0; i < 2; i++) {
    var rightFaceResult = outputFromRightFaceToBallCalc[i];

    // IF CONTACT OCCURS
    if (rightFaceResult < ball.radius) {
      $('.ball-hit').trigger("play");
      var velMag;
      var turnAngle = players[i].rot*Math.PI/180;
      var bounceAngle = Math.atan(ball.velY / (ball.velX + players[i].vel));

      velMag = Math.hypot(ball.velY, (ball.velX + players[i].vel));

      var resultAngle = turnAngle + bounceAngle  + Math.PI;

      ball.velX = -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.velY = -velMag * Math.roundTo(100000, Math.sin(resultAngle));

      ball.x += -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.y += -velMag * Math.roundTo(100000, Math.sin(resultAngle));

      // CHANGE PLAYER SPEED REDUCTION AFTER HIT */
      players[i].vel *= .9;
    }
  }
}

// PASS IN players[], returns perpendicular distance of both players from face to ball center
function leftFaceToBallCalc(playerArray) {
  var distVect = [];
  var distMag = [];
  for (var i=0; i < playerArray.length; i++) {
    var leftFaceVector = [playerArray[i].arrayX[1] - playerArray[i].arrayX[3], playerArray[i].arrayY[1] - playerArray[i].arrayY[3]];
    var leftFaceMag = playerArray[i].height;
    var leftFacePtv = [ball.x - playerArray[i].arrayX[3], ball.y - playerArray[i].arrayY[3]];
    var unitLeftFaceVector=[];
    var projLeftVect=[];
    var closest=[];

    for (var j=0; j<2; j++) {
      unitLeftFaceVector[j] = leftFaceVector[j]/leftFaceMag;
    }

    var projLeftMag = math.dot(leftFacePtv, unitLeftFaceVector);

    if (projLeftMag < 0) {
      closest = [playerArray[i].arrayX[1], playerArray[i].arrayY[1]];
    } else if (projLeftMag > leftFaceMag) {
      closest = [playerArray[i].arrayX[3], playerArray[i].arrayY[3]];
    } else {
      for (var j=0; j<2; j++) {
        projLeftVect[j] = projLeftMag*unitLeftFaceVector[j];
      }
      closest = [playerArray[i].arrayX[3] + projLeftVect[0] , playerArray[i].arrayY[3] + projLeftVect[1]];
    }

    distVect[i] = [ball.x - closest[0], ball.y - closest[1]];
    distMag[i] = Math.hypot(distVect[i][0], distVect[i][1]);

  }
  return [distMag[0], distMag[1]];
}

// PASS IN output from leftFaceToBallCalc(), returns nothing, affects speed/direction of ball if impacted by a car
function carLeftBallCollision(outputFromLeftFaceToBallCalc) {
  for (var i=0; i < 2; i++) {
    var leftFaceResult = outputFromLeftFaceToBallCalc[i];

    // IF CONTACT OCCURS
    if (leftFaceResult < ball.radius) {
      $('.ball-hit').trigger("play");
      var velMag;
      var turnAngle = players[i].rot*Math.PI/180;
      var bounceAngle = Math.atan(ball.velY / (ball.velX + players[i].vel));

      velMag = Math.hypot(ball.velY, (ball.velX + players[i].vel));

      var resultAngle = turnAngle + bounceAngle;

      ball.velX = -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.velY = -velMag * Math.roundTo(100000, Math.sin(resultAngle));

      ball.x += -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.y += -velMag * Math.roundTo(100000, Math.sin(resultAngle));

      // CHANGE PLAYER SPEED REDUCTION AFTER HIT */
      players[i].vel *= .9;
    }
  }
}

// PASS IN players[], returns perpendicular distance of both players from face to ball center
function bottomFaceToBallCalc(playerArray) {
  var distVect = [];
  var distMag = [];
  for (var i=0; i < playerArray.length; i++) {
    var bottomFaceVector = [playerArray[i].arrayX[2] - playerArray[i].arrayX[3], playerArray[i].arrayY[2] - playerArray[i].arrayY[3]];
    var bottomFaceMag = playerArray[i].width;
    var bottomFacePtv = [ball.x - playerArray[i].arrayX[3], ball.y - playerArray[i].arrayY[3]];
    var unitBottomFaceVector=[];
    var projBottomVect=[];
    var closest=[];

    for (var j=0; j<2; j++) {
      unitBottomFaceVector[j] = bottomFaceVector[j]/bottomFaceMag;
    }

    var projBottomMag = math.dot(bottomFacePtv, unitBottomFaceVector);

    if (projBottomMag < 0) {
      closest = [playerArray[i].arrayX[2], playerArray[i].arrayY[2]];
    } else if (projBottomMag > bottomFaceMag) {
      closest = [playerArray[i].arrayX[3], playerArray[i].arrayY[3]];
    } else {
      for (var j=0; j<2; j++) {
        projBottomVect[j] = projBottomMag*unitBottomFaceVector[j];
      }
      closest = [playerArray[i].arrayX[3] + projBottomVect[0] , playerArray[i].arrayY[3] + projBottomVect[1]];
    }

    distVect[i] = [ball.x - closest[0], ball.y - closest[1]];
    distMag[i] = Math.hypot(distVect[i][0], distVect[i][1]);

  }
  return [distMag[0], distMag[1]];
}

// PASS IN output from bottomFaceToBallCalc(), returns nothing, affects speed/direction of ball if impacted by a car
function carBottomBallCollision(outputFromBottomFaceToBallCalc) {
  for (var i=0; i < 2; i++) {
    var bottomFaceResult = outputFromBottomFaceToBallCalc[i];

    // IF CONTACT OCCURS
    if (bottomFaceResult < ball.radius) {
      $('.ball-hit').trigger("play");
      var velMag;
      var turnAngle = players[i].rot*Math.PI/180;
      var bounceAngle = Math.atan(ball.velY / (ball.velX + players[i].vel));

      velMag = Math.hypot(ball.velY, (ball.velX + players[i].vel));

      if(velMag < players[i].vel) velMag = players[i].vel + 2;

      var resultAngle = turnAngle + bounceAngle - Math.PI/2;

      ball.velX = -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.velY = -velMag * Math.roundTo(100000, Math.sin(resultAngle));

      ball.x += -2*velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.y += -2*velMag * Math.roundTo(100000, Math.sin(resultAngle));
    }
  }
}

/* CORNER HIT DETECTION */

// INPUT is the corner in array form [players[i].northEastCorner[0], players[i].northEastCorner[1]]
// OUTPUT true of false depending on corner collision detected
function testCornerInBall(corner) {
  // Uses equation of a circle to calculate if corner lies within the ball
  if (Math.pow(corner[0] - ball.x, 2) + Math.pow(corner[1] - ball.y, 2) < Math.pow(ball.radius, 2)) {
    return true;
  } else {
    return false;
  }
}

function intersectPlayers(player1CornerArray, player2CornerArray) {

}

/* CORNER HIT RESPONSE */

function northEastCornerHit() {
  for (var i=0; i< players.length; i++) {
    // DEFINES the northeast corner for both players
    var corner = [players[i].arrayX[0], players[i].arrayY[0]];
    if (testCornerInBall(corner) === true) {
      $('.ball-hit').trigger("play");
      var velMag;
      var turnAngle = players[i].rot*Math.PI/180;
      var bounceAngle = Math.atan(ball.velY / (ball.velX + players[i].vel));

      velMag = Math.hypot(ball.velY, (ball.velX + players[i].vel));

      var resultAngle = turnAngle + bounceAngle + Math.PI*3/4;

      ball.velX = -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.velY = -velMag * Math.roundTo(100000, Math.sin(resultAngle));

      ball.x += -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.y += -velMag * Math.roundTo(100000, Math.sin(resultAngle));
    }
  }
}

function northWestCornerHit() {
  for (var i=0; i< players.length; i++) {
    // DEFINES the northwest corner for both players
    var corner = [players[i].arrayX[1], players[i].arrayY[1]];
    if (testCornerInBall(corner) === true) {
      $('.ball-hit').trigger("play");
      var velMag;
      var turnAngle = players[i].rot*Math.PI/180;
      var bounceAngle = Math.atan(ball.velY / (ball.velX + players[i].vel));

      velMag = Math.hypot(ball.velY, (ball.velX + players[i].vel));

      var resultAngle = turnAngle + bounceAngle + Math.PI/4;

      ball.velX = -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.velY = -velMag * Math.roundTo(100000, Math.sin(resultAngle));

      ball.x += -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.y += -velMag * Math.roundTo(100000, Math.sin(resultAngle));
    }
  }
}

function southEastCornerHit() {
  for (var i=0; i< players.length; i++) {
    // DEFINES the southeast corner for both players
    var corner = [players[i].arrayX[2], players[i].arrayY[2]];
    if (testCornerInBall(corner) === true) {
      $('.ball-hit').trigger("play");
      var velMag;
      var turnAngle = players[i].rot*Math.PI/180;
      var bounceAngle = Math.atan(ball.velY / (ball.velX + players[i].vel));

      velMag = Math.hypot(ball.velY, (ball.velX + players[i].vel));

      var resultAngle = turnAngle + bounceAngle - Math.PI*3/4;

      ball.velX = -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.velY = -velMag * Math.roundTo(100000, Math.sin(resultAngle));

      ball.x += -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.y += -velMag * Math.roundTo(100000, Math.sin(resultAngle));
    }
  }
}

function southWestCornerHit() {
  for (var i=0; i< players.length; i++) {
    // DEFINES the southwest corner for both players
    var corner = [players[i].arrayX[3], players[i].arrayY[3]];
    if (testCornerInBall(corner) === true) {
      $('.ball-hit').trigger("play");
      var velMag;
      var turnAngle = players[i].rot*Math.PI/180;
      var bounceAngle = Math.atan(ball.velY / (ball.velX + players[i].vel));

      velMag = Math.hypot(ball.velY, (ball.velX + players[i].vel));

      var resultAngle = turnAngle + bounceAngle - Math.PI/4;

      ball.velX = -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.velY = -velMag * Math.roundTo(100000, Math.sin(resultAngle));

      ball.x += -velMag * Math.roundTo(100000, Math.cos(resultAngle));
      ball.y += -velMag * Math.roundTo(100000, Math.sin(resultAngle));
    }
  }
}


function ballWallCollisionDetect(bound) {
  if (ball.x + ball.radius >= CANVAS_WIDTH) {
  ////////////////////////////////////////////////////////////
  //  GOAL LOGIC AND RESPONSE -- BLUE GOAL (RIGHT)
  ////////////////////////////////////////////////////////////
    if (ball.y + ball.radius <= CANVAS_HEIGHT - bound && ball.y - ball.radius >= bound) {

      // GIVE POINT
      scoreOrange++;
      $('.orange').text(scoreOrange);
      // CUE CELEBRATION ANIMATION
      $('.goal-impact').trigger("play");
      $('.goal-horn').trigger("play");
      // RESET STATE
      resetGame();

    } else {
      while (ball.x + ball.radius >= CANVAS_WIDTH) {
        ball.x -= 2;
      }
      ball.velX = -ball.velX;
      ball.velX += .5;
    }
  }
  if (ball.x - ball.radius <= 0) {
  ////////////////////////////////////////////////////////////
  //  GOAL LOGIC AND RESPONSE -- ORANGE GOAL (LEFT)
  ////////////////////////////////////////////////////////////
    if (ball.y + ball.radius <= CANVAS_HEIGHT - bound && ball.y - ball.radius >= bound) {

      // GIVE POINT
      scoreBlue++;
      $('.blue').text(scoreBlue);
      // CUE CELEBRATION ANIMATION
      $('.goal-impact').trigger("play");
      $('.goal-horn').trigger("play");
      // RESET STATE
      resetGame();

    } else {

      while (ball.x - ball.radius <= 0) {
        ball.x += 2;
      }
      ball.velX = -ball.velX;
      ball.velX -= .5;
    }
  }
  if (ball.y + ball.radius >= CANVAS_HEIGHT) {
    while (ball.y + ball.radius >= CANVAS_HEIGHT) {
      ball.y -= 2;
    }
    ball.velY = -ball.velY;
    ball.velY += .5;
  }
  if (ball.y - ball.radius <= 0) {
    while (ball.y - ball.radius <= 0) {
      ball.y += 2;
    }
    ball.velY = -ball.velY;
    ball.velY -= .5;
  }
}

