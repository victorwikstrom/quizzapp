class GameOverView {
  currentView: "over";

  private gameWrapper: HTMLElement;
  private restartGame: HTMLElement;  
  private highScore: HTMLElement;

  constructor() {
    

    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("over-view", "game-wrapper");
  
    this.gameWrapper.innerText = "Correct! Do you want to play again???";

    this.highScore = document.createElement("div");
    this.highScore.classList.add("view-highscore");
    this.highScore.innerHTML = "Feast your eyes on your score:";

    // Creates a button and offers the player the option to play again (Funkar ej)
    this.restartGame = document.createElement("button");
    this.restartGame.classList.add("all-buttons");
    this.restartGame.innerHTML = "PLAY AGAIN";

    this.gameWrapper.appendChild(this.highScore);

    this.gameWrapper.appendChild(this.restartGame);

    this.currentView = "over";


  }

  public run() {
    //Sends player back to startview
    document.body.appendChild(this.gameWrapper);
    this.restartGame.addEventListener("click", () => {
    location.reload();
    });
    
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }
}
