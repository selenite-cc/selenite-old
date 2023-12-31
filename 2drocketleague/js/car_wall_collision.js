function carWallCollisionDetect() {

  for (var i=0; i<players.length; i++) {
    var sinTheta = Math.sin(players[i].rot*Math.PI/180);
    var cosTheta = Math.cos(players[i].rot*Math.PI/180);


    //Actually SouthEast corner on canvas
    players[i].southEastCorner = [players[i].xMid + ((players[i].width/2)*cosTheta) - ((players[i].height/2)*sinTheta),
                       players[i].yMid + ((players[i].width/2)*sinTheta) + ((players[i].height/2)*cosTheta)
                       ];

    //Actually SouthWest corner on canvas
    players[i].southWestCorner = [players[i].xMid + ((-players[i].width/2)*cosTheta) - ((players[i].height/2)*sinTheta),
                       players[i].yMid + ((-players[i].width/2)*sinTheta) + ((players[i].height/2)*cosTheta)
                       ];

    //Actually NorthEast corner on canvas
    players[i].northEastCorner = [players[i].xMid + ((players[i].width/2)*cosTheta) - ((-players[i].height/2)*sinTheta),
                       players[i].yMid + ((players[i].width/2)*sinTheta) + ((-players[i].height/2)*cosTheta)
                       ];


    //Actually NorthWest corner on canvas
    players[i].northWestCorner = [players[i].xMid + ((-players[i].width/2)*cosTheta) - ((-players[i].height/2)*sinTheta),
                       players[i].yMid + ((- players[i].width/2)*sinTheta) + ((-players[i].height/2)*cosTheta)
                       ];

    players[i].arrayX = [players[i].northEastCorner[0],
                         players[i].northWestCorner[0],
                         players[i].southEastCorner[0],
                         players[i].southWestCorner[0]
                         ];
    players[i].arrayY = [players[i].northEastCorner[1],
                         players[i].northWestCorner[1],
                         players[i].southEastCorner[1],
                         players[i].southWestCorner[1]
                         ];

    // Check X values
    for (var j=0; j < players[i].arrayX.length; j++) {
      if (players[i].arrayX[j] >= CANVAS_WIDTH) {
        while (players[i].arrayX[j] >= CANVAS_WIDTH) {
          players[i].xMid -= 2;
          carWallCollisionDetect();
        }
      }
      if (players[i].arrayX[j] <= 0) {
        while (players[i].arrayX[j] <= 0) {
          players[i].xMid += 2;
          carWallCollisionDetect();
        }
      }
    }
    // Check Y values
    for (var j=0; j < players[i].arrayY.length; j++) {
      if (players[i].arrayY[j] >= CANVAS_HEIGHT) {
        while (players[i].arrayY[j] >= CANVAS_HEIGHT) {
          players[i].yMid -= 2;
          carWallCollisionDetect();
        }
      }
      if (players[i].arrayY[j] <= 0) {
        while (players[i].arrayY[j] <= 0) {
          players[i].yMid += 2;
          carWallCollisionDetect();
        }
      }
    }
  }
}
