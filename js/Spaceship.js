import {Missle} from './Missle.js';

export class SpaceShip {
  constructor() {
    this.left = false;
    this.right = false;
    this.speed = 5;
    this.board = document.querySelector("[data-container]"); //getting board game
    this.shipElement = document.querySelector("[data-spaceShip]"); //getting ship element
    this.eventListeners();
    
    this.setPosition();//setting start position
    this.missleList = [];
  }

  setPosition = () => {
    this.shipElement.style.left = `${this.board.offsetWidth/2 - this.shipElement.offsetWidth / 2}px`; //setting left style as half of container width - half of spaceShip width
  }

  shoot = () => {
      this.missleList.push(new Missle(this.board, this.shipElement));
  }

  handlerKeyDown = (e) => {
    switch(e.keyCode) 
    {
      case 65:
        this.left = true;
        break;
      case 68:
        this.right = true;
        break;
    }
  }

  handlerKeyUp = (e) => {
    switch(e.keyCode) 
    {
      case 65:
        this.left = false;
        break;
      case 68:
        this.right = false;
        break;
      case 32:
        this.shoot();
        break;
      default:
        break;
      } 
  }

  eventListeners = () => {
    window.addEventListener('keydown', this.handlerKeyDown);
  
    window.addEventListener('keyup', this.handlerKeyUp);
  }

  checkMove = () => {
    
    const shipPosition = this.shipElement.offsetLeft;
    
    if(shipPosition >= 0 && this.left === true)
    {
      this.shipElement.style.left = `${ shipPosition - this.speed}px`;
    }
    if(shipPosition <= this.board.offsetWidth - this.shipElement.offsetWidth && this.right === true)
      this.shipElement.style.left = `${ shipPosition + this.speed}px`;
  }

  gameLoop = () => {
    this.checkMove();
    requestAnimationFrame(this.gameLoop);
  }

}
  

 