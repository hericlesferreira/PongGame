var player1 = {
  posX: 350,
  posY: 580,
  width: 100,
  height: 20,
  velocity: 75,
  score: 0,
};

var player2 = {
  posX: 350,
  posY: 0,
  width: 100,
  height: 20,
  velocity: 75,
  score: 0,
};

var ball = {
  posX: 0,
  posY: 0,
  width: 20,
  height: 20,
  dirX: 4,
  dirY: 4,
}

var backgroundEndGame = {
  posX: 0,
  posY: 0,
  width: 800,
  height: 600,
}

var imagemPlayer1 = new Image(100, 20);
imagemPlayer1.src = 'imagens/player.png';

var imagemPlayer2 = new Image(100, 20);
imagemPlayer2.src = 'imagens/player2.png';

var imagemBall = new Image(20, 20);
imagemBall.src = 'imagens/ball.png';

var gameOver1 = new Image(800, 600);
gameOver1.src = 'imagens/gameover1.png';

var gameOver2 = new Image(800, 600);
gameOver2.src = 'imagens/gameover2.png';

var endGame = 0;

function getRandomDir(pos) {
  return Math.floor(Math.random() * (pos + 1) ) + pos;
}

function drawScores(canvas, ctx) {
    ctx.fillStyle = "white  ";
  ctx.font = '48px verdana';
  ctx.fillText(player1.score, 380, 480);
  ctx.fillText(player2.score, 380, 150);
}

function drawCursorPlayer1(canvas, ctx) {
    ctx.fillStyle = "transparent";
  ctx.fillRect(player1.posX, player1.posY, player1.width, player1.height);
  ctx.drawImage(imagemPlayer1, player1.posX, player1.posY );
}

function drawCursorPlayer2(canvas, ctx) {
    ctx.fillStyle = "transparent";
  ctx.fillRect(player2.posX, player2.posY, player2.width, player2.height);
  ctx.drawImage(imagemPlayer2, player2.posX, player2.posY);
}

function drawCursors(canvas, ctx) {
  drawCursorPlayer1(canvas, ctx);
  drawCursorPlayer2(canvas, ctx);
}

function drawBall(canvas, ctx) {
    ctx.fillStyle = "transparent";
  ctx.fillRect(ball.posX, ball.posY, ball.width, ball.height);
  ctx.drawImage(imagemBall, ball.posX, ball.posY );
}

function verifyEndGame (canvas, ctx) {
  if (player1.score >= 3) {
    endGame = 1;
  }
  if (player2.score >= 3) {
    endGame = 1;
  }
}

function draw(canvas, ctx) {
  drawCursors(canvas, ctx);
  drawScores(canvas, ctx);
  drawBall(canvas, ctx);
}

function movePlayer1(key) {
  if(key.keyCode == 37) {
    player1.posX -= player1.velocity;
  }else if(key.keyCode == 39) {
    player1.posX += player1.velocity;
  }
}

function movePlayer2(key) {
  if(key.keyCode == 65) {
    player2.posX -= player2.velocity;
  }else if(key.keyCode == 68) {
    player2.posX += player2.velocity;
  }
}

function move(key) {
  movePlayer1(key);
  movePlayer2(key);
}

function calculateBall() {
  ball.posX += ball.dirX;
  ball.posY += ball.dirY;
}

function verifyCollisionBallWall() {
  if(ball.posX <= 0 || ball.posX >= (800 - ball.width)) {
    if (ball.posX >=800 - ball.width) {
      ball.dirX = getRandomDir(-4);
    }
    if (ball.posX <= 0) {
      ball.dirX = getRandomDir(4);
    }
    
  }

  if(ball.posY <= 0 || ball.posY >= (600 - ball.height)) {
    if (ball.posY >= (599 - ball.height)) {
      ball.posX = 400;
      ball.posY = 300;
      ball.dirY = getRandomDir(-2);
      player2.score++;
    }
    if (ball.posY <= 0) {
      ball.posX = 400;
      ball.posY = 300;
      ball.dirY = getRandomDir(2);
      player1.score++;
    }
  }

  if(ball.posX >= (player1.posX) && ball.posX <= (player1.posX + player1.width)) {
    if (ball.posY >= (player1.posY - ball.height)) { 
      ball.dirY = getRandomDir(-4);
    }
  }

  if(ball.posX >= (player2.posX) && ball.posX <= (player2.posX + player2.width)) {
    if (ball.posY <= (player2.posY + ball.height)) { 
      ball.dirY = getRandomDir(4);
    }
  }

  if(player1.posX < 0) {
    player1.posX = 0;
  }
  
  if (player1.posX > 800 - player1.width) {
    player1.posX = 800 - player1.width;
  }

  if(player2.posX < 0) {
    player2.posX = 0;
  } else if (player2.posX > 800 - player2.width) {
    player2.posX = 800 - player2.width;
  }

}

function verifyCollisions() {
  verifyCollisionBallWall();
}

function gameLoop() {
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  

  if (endGame == 0) {
    calculateBall();
    verifyCollisions();
    verifyEndGame();  
    draw(canvas, ctx);
  }

  if (player1.score >= 3) {
  ctx.fillStyle = "transparent";
  //ctx.fillRect(player1.posX, player1.posY, player1.width, player1.height);
  ctx.fillRect(backgroundEndGame.posX, backgroundEndGame.posY, backgroundEndGame.width, backgroundEndGame.height);
  ctx.drawImage(gameOver2, backgroundEndGame.posX, backgroundEndGame.posY);

    return;
  }
  if (player2.score >= 3) {
  ctx.fillStyle = "transparent";
  //ctx.fillRect(player1.posX, player1.posY, player1.width, player1.height);
  ctx.fillRect(backgroundEndGame.posX, backgroundEndGame.posY, backgroundEndGame.width, backgroundEndGame.height);
  ctx.drawImage(gameOver1, backgroundEndGame.posX, backgroundEndGame.posY);

    return;
  }

  
}

window.onload = function() {
  var canvas = document.getElementById('game');
  ball.posX = canvas.width / 2;
  ball.posY = canvas.height / 2;
  ball.dirY = getRandomDir(3);
  ball.dirX = getRandomDir(3);
  setInterval(gameLoop, 1000 / 60);
}

window.onkeydown = function(key) {
  move(key);
}