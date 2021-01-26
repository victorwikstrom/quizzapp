class StartView {
  private gameWrapper: HTMLElement;
  private startGameButton: HTMLElement;

  private gameLogo: HTMLElement;


  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper", "start-view");

    this.gameLogo = document.createElement('div');
    this.gameLogo.classList.add("logo");

    this.startGameButton = document.createElement("button");
    this.startGameButton.classList.add("all-buttons");

    this.startGameButton.innerHTML = "START GAME";
    this.gameWrapper.appendChild(this.gameLogo);

    this.gameWrapper.appendChild(this.startGameButton);
  }

  public run() {
    document.body.appendChild(this.gameWrapper);
    this.startGameButton.addEventListener("click", () => {
      gameState.updateView("game");
    });
    
    
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }
}
