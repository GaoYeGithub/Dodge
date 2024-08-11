var player;
var enemySprite;
var coin;
var isGameOver;
var score;
var coinsCollected;
var level;
var playerSpeed;
var enemySpeed;
var coinSpeed;

function preload() {
  playerImage = loadImage('https://cloud-9x4hvopq6-hack-club-bot.vercel.app/0N5uCbDu.png');
  enemyImage = loadImage('https://cloud-cfakr2ma3-hack-club-bot.vercel.app/0OdL0XPt.png');
  backgroundImage = loadImage('https://cloud-kh6ahxow6-hack-club-bot.vercel.app/0aKQOg3G.png');
  coinImage = loadImage('coin.png');

  function setup() {
    isGameOver = false;
    score = 0;
    coinsCollected = 0;
    level = 1;
    playerSpeed = 2;
    enemySpeed = 3;
    coinSpeed = 2;
    createCanvas(250, 250);
    player = createSprite(width / 2, height - playerImage.height / 2, 0, 0);
    player.addImage(playerImage);
    enemySprite = createSprite(width / 2, 0, 0, 0);
    enemySprite.addImage(enemyImage);
    coin = createSprite(random(5, width - 5), 0, 0, 0);
    coin.addImage(coinImage);
    coin.scale = 0.05;
  }

  function draw() {
    if (isGameOver) {
      gameOver();
    } else {
      background(backgroundImage);

      if (keyDown(RIGHT_ARROW) && player.position.x < width - playerImage.width / 2) {
        player.position.x += playerSpeed;
      }

      if (keyDown(LEFT_ARROW) && player.position.x > playerImage.width / 2) {
        player.position.x -= playerSpeed;
      }

      enemySprite.position.y += enemySpeed;
      coin.position.y += coinSpeed;

      if (enemySprite.position.y > height) {
        enemySprite.position.y = 0;
        enemySprite.position.x = random(5, width - 5);
        score++;
        if (score % 5 === 0) {
          level++;
          playerSpeed += 0.5;
          enemySpeed += 0.5;
          coinSpeed += 0.5;
        }
      }

      if (coin.position.y > height) {
        coin.position.y = 0;
        coin.position.x = random(5, width - 5);
      }

      if (enemySprite.overlap(player)) {
        isGameOver = true;
      }

      if (player.overlap(coin)) {
        coinsCollected++;
        coin.position.y = 0;
        coin.position.x = random(5, width - 5);
      }

      drawSprites();

      fill('white');
      textSize(16);
      textAlign(LEFT);
      text('Score: ' + score, 10, 20);
      text('Coins: ' + coinsCollected, 10, 40);
      text('Level: ' + level, 10, 60);
    }
  }

  function gameOver() {
    background(0);
    textAlign(CENTER);
    fill('white');
    text('Game Over!', width / 2, height / 2);
    text('Click anywhere to try again', width / 2, (3 * height) / 4);
  }

  function mouseClicked() {
    if (isGameOver) {
      isGameOver = false;
      score = 0;
      coinsCollected = 0;
      level = 1;
      playerSpeed = 2;
      enemySpeed = 3;
      coinSpeed = 2;
      player.position.x = width / 2;
      player.position.y = height - playerImage.height / 2;
      enemySprite.position.x = width / 2;
      enemySprite.position.y = 0;
      coin.position.x = random(5, width - 5);
      coin.position.y = 0;
    }
  }
