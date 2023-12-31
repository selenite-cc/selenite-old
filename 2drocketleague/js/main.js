// SET CANVAS SIZE AND APPEND TO BODY
var CANVAS_WIDTH = 1200;
var CANVAS_HEIGHT = 555;

var canvasElement = $("<canvas width='" + CANVAS_WIDTH +
                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');
var players = [];
var scoreOrange = 0;
var scoreBlue = 0;
var timerCount = 120; // 2 Minute Time Limit
var timerID;

// DRAW
function draw() {
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.fillStyle = "rgba(255, 120, 0, .7)";
  canvas.fillRect(0,0,CANVAS_WIDTH/2,CANVAS_HEIGHT);
  canvas.fillStyle = "rgba(0, 0, 255, .5)";
  canvas.fillRect(CANVAS_WIDTH/2,0,CANVAS_WIDTH/2,CANVAS_HEIGHT);
  ball.draw();
  for (var i=0; i<players.length; i++) {
    players[i].draw();
  }
}

// UPDATE
function update() {
  for(var i=0; i < players.length; i++) {
    players[i].xMid += (players[i].vel * Math.sin(players[i].rot*Math.PI/180));
    players[i].yMid += -(players[i].vel * Math.cos(players[i].rot*Math.PI/180));
  }

  ball.x += ball.velX;
  ball.y += ball.velY;

  //// DEFINES GOALS AND EDGE OF ARENA
  // input -> goal width
  ballWallCollisionDetect(180);
  carWallCollisionDetect();
  //// CAR TO BALL COLLISION REACTION (DETECTION(PLAYERS ARRAY))
  carFrontBallCollision(frontFaceToBallCalc(players));
  carRightBallCollision(rightFaceToBallCalc(players));
  carLeftBallCollision(leftFaceToBallCalc(players));
  carBottomBallCollision(bottomFaceToBallCalc(players));
  //// Updates position of all corners of both vehicles
  northEastCornerHit();
  northWestCornerHit();
  southEastCornerHit();
  southWestCornerHit();
}

/* PLAYER CONSTRUCTOR */

function Player(color, xInitial, yInitial, rotInitial, colorPath) {
  this.color = color;
  this.x = xInitial;
  this.y = yInitial;
  this.rot = rotInitial;
  this.vel = 0;
  this.width = 45;
  this.height = 75;
  this.xMid = this.x + this.width/2;
  this.yMid = this.y + this.height/2;
  this.draw = function() {
    var drawing = new Image();
    drawing.src = colorPath;

    canvas.save();
    canvas.translate(this.xMid, this.yMid);
    canvas.rotate(this.rot*Math.PI/180);
    canvas.drawImage(drawing, -this.width/2, -this.height/2,this.width,this.height);
    canvas.restore();
  }
}

/* DEFINE BALL OBJECT */

// caching ball image outside of draw function so it only loads once
var ballDrawing = new Image();
ballDrawing.onload = function () {
  ball.draw();
}
ballDrawing.src = "assets/RLball.png";

var ball = {
  x: CANVAS_WIDTH/2,
  y: CANVAS_HEIGHT/2,
  radius: 30,
  velX: 0,
  velY: 0,
  draw: function() {
    canvas.drawImage(ballDrawing, this.x-this.radius, this.y-this.radius, this.radius*2, this.radius*2);
  }
}

/* CREATE/RESET PLAYERS AND BALL */

function resetGame() {
  canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  players = [];
  player1 = new Player("dodgerblue", CANVAS_WIDTH/9-45/2, CANVAS_HEIGHT/2-75/2, 90, "assets/Car_orange.png");
  player2 = new Player("orange", CANVAS_WIDTH/9*8-45/2, CANVAS_HEIGHT/2-75/2, -90, "assets/Car_blue.png");
  players.push(player1, player2);
  ball.x = CANVAS_WIDTH/2;
  ball.y = CANVAS_HEIGHT/2;
  ball.velX = 0;
  ball.velY = 0;
  ball.draw();
}

/* STARTS GAME ON PRESS OF START BUTTON */

function startGame() {
  resetGame();
  setTimer();
  $('.start-button').css("display", "none");
  $('.logo-timer').replaceWith('<div class="count-down">2:00</div>');
  $('.center').css("height", "110px");
}


function KeyboardController(keys, repeat) {
    var timers= {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    //
    document.onkeydown= function(event) {
        var key= (event || window.event).keyCode;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key]= null;
            keys[key]();
            if (repeat!==0)
                timers[key]= setInterval(keys[key], repeat);
        }
        return false;
    };

    // Cancel timeout and mark key as released on keyup
    //
    document.onkeyup= function(event) {
        var key= (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key]!==null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    };

    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
    //
    window.onblur= function() {
        for (key in timers)
            if (timers[key]!==null)
                clearInterval(timers[key]);
        timers= {};
    };
};

KeyboardController({
  // PLAYER 1 CONTROLS
  // A
    65: function() { players[0].rot -= 10; },
  // W
    87: function() { players[0].vel < 4 ? players[0].vel += .15 : players[0].vel = players[0].vel; },
  // D
    68: function() { players[0].rot += 10; },
  // S
    83: function() { players[0].vel > -2.5 ? players[0].vel -= .25 : players[0].vel = players[0].vel; },
  // PLAYER 2 CONTROLS
  // left
    37: function() { players[1].rot -= 10; },
  // up
    38: function() { players[1].vel < 4 ? players[1].vel += .15 : players[1].vel = players[1].vel; },
  // right
    39: function() { players[1].rot += 10; },
  // down
    40: function() { players[1].vel > -2.5 ? players[1].vel -= .25 : players[1].vel = players[1].vel; },
}, 50);


/* BALL SPEED DECAY */
function ballFriction(friction) {
  if (Math.hypot(ball.velX, ball.velY) > 0) {
    ball.velX -= ball.velX*friction;
    ball.velY -= ball.velY*friction;
  }
}

function carFriction(friction) {
  for (var i=0; i < players.length; i++) {
    players[i].vel -= players[i].vel*friction;
  }
}

// SPEED DECAY FUNCTION CALL
setInterval(function() {
  ballFriction(.2);
  carFriction(.1);
}, 500);

// TIMER ACTION
function setTimer() {
  timerID = setInterval(function() {
    var timeRemaining = timerLogic(timerCount-1);
    $('.count-down').text(timeRemaining[0] + ":" + timeRemaining[1]);
    if (timerCount > -1) {
    timerCount--;
    }
    if (timerCount === 30) {
      $('.two-minute-warning').trigger("play");
    }
    if (timerCount <= 10 && timerCount > 0) {
       //pause playing
    $('.timer-running-out').trigger('pause');
    //set play time to 0
    $('.timer-running-out').prop("currentTime",0);
      $('.timer-running-out').trigger("play");
    }
    if (timerCount === 0) {
      $('.game-over').trigger("play");
    }
    if (timerCount === -1) {
      $('.count-down').text("0:00");
      gameOver();
      clearInterval(timerID);
    }
  }, 1000);
}

function timerLogic(timerCount) {
  var minutes = Math.floor(timerCount/60);
  var seconds = timerCount - minutes*60;
  seconds = (seconds % 60 > 9) ? seconds % 60 : "0" + seconds % 60;
  return [minutes, seconds];
}

function gameOver() {
  clearInterval(timerID);
  $('.game-over').toggleClass('hidden');
  winnerAnnounce = $('.winner-announce');
  if (scoreBlue > scoreOrange) {
    winnerAnnounce.text("WINNER! BLUE");
    winnerAnnounce.css("color", "blue");

  } else if (scoreOrange > scoreBlue) {
    winnerAnnounce.text("WINNER! ORANGE");
    winnerAnnounce.css("color", "orange");
  } else {
    winnerAnnounce.text("TIE GAME!");
    winnerAnnounce.css("color", "white");
  }
}

function playAgain() {
  resetGame();

  // STOP time
  clearInterval(timerID);
  timerCount = 120;
  $('.count-down').text("2:00");
  setTimer();

  // RESET Score
  scoreOrange = 0;
  scoreBlue = 0;
  $('.orange').text(scoreOrange);
  $('.blue').text(scoreBlue);
}

// FPS SETTING
var FPS = 60;
setInterval(function() {
  update();
  requestAnimationFrame(draw);
}, 1000/FPS);

/* DOM INITIALIZATION */

$('.orange').text(scoreOrange);
$('.blue').text(scoreBlue);

/* EVENT LISTENERS */
var playButton = $('.play-again');

// Instructions Pane
$instructions = $('.instructions');

// START BUTTON
$startButton = $('.start-button');
$startButton.on("click", function() {
  startGame();
  $instructions.toggleClass('hidden');
});
$startButton.hover(function(event) {
  $startButton.css("background", "darkgreen");
}, function(event) {
  $startButton.css("background", "green");
});


// play-again button CLICK
playButton.on("click", function() {
  playAgain();
  $('.game-over').toggleClass('hidden');
});

// PLAY AGAIN? BUTTON
playButton.hover(function(event) {
  playButton.css("background-color", "black");
  playButton.css("color", "yellow");
}, function(event) {
  playButton.css("background-color", "yellow");
  playButton.css("color", "black");
});


