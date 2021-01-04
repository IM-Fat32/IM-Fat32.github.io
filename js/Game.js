import {SpaceShip} from './Spaceship.js';
import {Enemy} from './Enemy.js';

class Game {
  constructor() {
    this.board = document.querySelector("[data-container]");
    this.scoresElement = document.querySelector("[data-scores]");
    this.scores = 0;
    this.playerLivesElement = document.querySelector("[data-lives]");
    this.playerLives = 4;
    this.init();
    this.enemies = [new Enemy(this.board)];
    this.checkEnemies();
  }

  init = () => {
    this.space = new SpaceShip();
    this.space.setPosition();
    this.space.gameLoop();
    this.spawnEnemy();
    this.updateScores();
    this.updateLives();
    this.checkPositionInterval = setInterval(() => {
      this.checkEnemies();
    }, 10);
   
  }

  spawnEnemy = () => {
    this.spawnInterval = setInterval(()=>{
      this.enemies.push(new Enemy(this.board));
    }, 10000)
  }

  updateLives = () => {
    this.playerLives--;
    this.playerLivesElement.innerHTML = `Lives: ${this.playerLives}`
  }

  updateScores = () => {
    this.scoresElement.innerHTML = `Scores: ${this.scores}`;
  }

  checkEnemies = () => {
    this.enemies.forEach((enemy, enemyIndex, enemyTab) => {
      const enemyPosition = {
        top: enemy.posY,
        right: enemy.posX + enemy.enemy.offsetWidth,
        bottom: enemy.posY + enemy.enemy.offsetHeight,
        left: enemy.enemy.offsetLeft,
      }
      
      if(enemyPosition.top >= this.board.offsetHeight){
        enemyTab.splice(enemyIndex, 1);
        enemy.remove();
        this.updateLives();
      }
      this.space.missleList.forEach((missle, missileIndex, missleTab) => {
        const misslePosition = {
          top: missle.missle.offsetTop,
          right: missle.missle.offsetLeft + missle.missle.offsetWidth,
          bottom: missle.missle.offsetTop + missle.missle.offsetHeight,
          left: missle.missle.offsetLeft,
        }
        

        if(misslePosition.bottom <= 0){
          missle.remove();
          missleTab.splice(missileIndex, 1);
        } 
        
        if( misslePosition.bottom >= enemyPosition.top &&
          misslePosition.top <= enemyPosition.bottom &&
           misslePosition.right >= enemyPosition.left &&
           misslePosition.left <= enemyPosition.right
           ){
            
            enemy.hit();
            if(enemy.lives == 0) {
              setTimeout(enemy.remove(), 1000)
              this.scores += enemy.scores;
              enemyTab.splice(enemyIndex, 1);
              
              this.updateScores();
            }
            missle.remove();
            missleTab.splice(missileIndex, 1);
        }
      });
    });
  }
}
const game = new Game();