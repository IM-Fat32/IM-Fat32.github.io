const kindOfEnemyList = [
  {
    scores: 20, 
    speed: 3, 
    lives: 1,
    image: "<img src='../images/enemy.png'/>", 
    className: "enemy", 
    destroyClass : "destroy",
    destroyImage: "<img src='../images/explosion.png'/>"
  },
  {
    scores: 60, 
    speed: 1, 
    lives: 4,
    image: "<img src='../images/enemy-big.png'/>", 
    className: "enemy-big",
    destroyClass : "bigDestroy",
    destroyImage: "<img src='../images/explosion-big.png'/>"
  }
]

export class Enemy {
  constructor(board) {
    this.kindEnemy = kindOfEnemyList[Math.floor(Math.random() * 2)];
    this.board = board;
    this.posX = this.getX(64, this.board.offsetWidth - 64);
    this.posY = -64; 
    this.lives = this.kindEnemy.lives;
    this.scores = this.kindEnemy.scores;
    this.createEnemy(this.kindEnemy.image, this.kindEnemy.className, this.kindEnemy.speed);
  }

  getX = (max, min) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  createEnemy = (image, className, speed) => {

    this.enemy = document.createElement("div");
    this.enemy.innerHTML = image;
    this.enemy.classList.add(className);
    this.enemy.style.left = `${this.posX}px`;
    this.enemy.style.top = `${this.posY}px`;
    this.board.appendChild(this.enemy);
    this.interval = setInterval(() => {
      this.posY = this.enemy.offsetTop + speed;
      this.enemy.style.top = `${this.posY}px`
    }, 20);
  }

  hit = () => {
    this.lives --;
    if (this.lives == 0)
      this.explode();  
  }

  explode = () => {
    clearInterval(this.interval)
    this.enemy.className = this.kindEnemy.destroyClass;
    this.enemy.innerHTML = this.kindEnemy.destroyImage;
  }
  
  remove = () => {
    this.enemy.remove();
    clearInterval(this.interval);
  }
}
