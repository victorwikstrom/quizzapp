class GameOverView {
  currentView: "over";

  private gameWrapper: HTMLElement;
  private restartGame: HTMLElement;  

  constructor() {

    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("over-view", "game-wrapper");
  
    this.gameWrapper.innerText = "Correct! Do you want to play again?";

    // Creates a button and offers the player the option to play again (Funkar ej)
    this.restartGame = document.createElement("button");
    this.restartGame.innerHTML = "PLAY AGAIN";

    this.gameWrapper.appendChild(this.restartGame);

    this.currentView = "over";
  }

  public run() {
    //Sends player back to gameview, men det funkar ju inteeeeeeee
    document.body.appendChild(this.gameWrapper);
    this.restartGame.addEventListener("click", () => {
      gameState.updateView("game");
    });
    
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }
}
