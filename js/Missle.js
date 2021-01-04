export class Missle{
  constructor(board, shipElement){
    this.board = board;
    this.shipElement= shipElement;
    this.createMissle();
  };
  
  createMissle = () => {
    this.posX = this.shipElement.offsetLeft;
    this.posY = this.shipElement.offsetTop;
  
    this.missle = document.createElement("div");
    this.missle.innerHTML = "<img src='../images/missile.png'/>"
    this.missle.classList.add("missle");
    this.missle.style.left = `${this.posX + (this.shipElement.offsetWidth / 2) - 9}px`;
    this.missle.style.top = `${this.posY}px`;
    this.board.append(this.missle);
    
    this.interval = setInterval(() => {
      this.missle.style.top = `${this.missle.offsetTop -1}px`;
      if (this.missle.offsetTop <= 0)
        this.remove();
    }, 5);
  }
  
  remove = () => {
    this.missle.remove();  
    clearInterval(this.interval);
  }

}