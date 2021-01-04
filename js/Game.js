import {SpaceShip} from './Spaceship.js';
import {Enemy} from './Enemy.js';

class Game {
  constructor(interval) {
    this.intervalVariable= interval;
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

  endGame = () => {
    this.enemies.forEach(enemy => {
      clearInterval(enemy.interval);
      enemy.remove();
      this.enemies = [];
      clearInterval(this.spawnInterval);
      window.removeEventListener('keydown', this.space.handlerKeyDown);
      window.removeEventListener('keyup', this.space.handlerKeyUp);

      const modal = document.querySelector("[data-modal]");
      const modalScores = document.querySelector("[data-modalScores]");
      modal.style.display = "flex";
      modalScores.innerText = `Yours scores: ${this.scores}`;
    })
  }

  spawnEnemy = () => {
    this.spawnInterval = setInterval(()=>{
      this.enemies.push(new Enemy(this.board));
    }, this.intervalVariable)
  };

  updateLives = () => {
    this.playerLives--;
    this.playerLivesElement.innerHTML = `Lives: ${this.playerLives}`;
    if(this.playerLives === 0)
      this.endGame();
  };

  updateScores = () => {
    this.scoresElement.innerHTML = `Scores: ${this.scores}`;
  };

  checkEnemies = () => {
    this.enemies.forEach((enemy, enemyIndex, enemyTab) => {
      const enemyPosition = {
        top: enemy.posY,
        right: enemy.posX + enemy.enemy.offsetWidth,
        bottom: enemy.posY + enemy.enemy.offsetHeight,
        left: enemy.enemy.offsetLeft,
      };
      
      if(enemyPosition.top >= this.board.offsetHeight){
        enemyTab.splice(enemyIndex, 1);
        enemy.remove();
        clearInterval(enemy.interval);
        this.updateLives();
      };
      this.space.missleList.forEach((missle, missileIndex, missleTab) => {
        const misslePosition = {
          top: missle.missle.offsetTop,
          right: missle.missle.offsetLeft + missle.missle.offsetWidth,
          bottom: missle.missle.offsetTop + missle.missle.offsetHeight,
          left: missle.missle.offsetLeft,
        };
        

        if(misslePosition.bottom <= 0){
          missle.remove();
          missleTab.splice(missileIndex, 1);
        };
        
        if( misslePosition.bottom >= enemyPosition.top &&
          misslePosition.top <= enemyPosition.bottom &&
           misslePosition.right >= enemyPosition.left &&
           misslePosition.left <= enemyPosition.right
           ){
            
            enemy.hit();
            if(enemy.lives == 0) {
              setTimeout(()=>{
                enemy.remove()
                enemyTab.splice(enemyIndex, 1);
              }, 500)
              this.scores += enemy.scores;
              this.updateScores();
            }
            missle.remove();
            missleTab.splice(missileIndex, 1);
        }
      });
    });
  };
};

const showModal = () => {
  const modal = document.querySelector("[data-modal]");
  modal.style.display = "flex";

  const addEventListeners = () => {
    const el = document.querySelectorAll("button");
    for(let i = 0; i < 3; i++) {
      el[i].addEventListener("click", ()=> {
        selectLevel(i);
      })
    }
  }

  const selectLevel= (i) => {
    if(i === 0) {
      const game = new Game(2000);
    }
    else if(i === 1) {
      const game = new Game(1000);
    }
    else {
      const game = new Game(500);
    } 
    modal.style.display = "none";
  }

  addEventListeners();
}

showModal();