class StartView {
  private gameWrapper: HTMLElement;
  private startGameButton: HTMLElement;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper", "start-view");
    this.startGameButton = document.createElement("button");
    this.startGameButton.innerHTML = "START GAME";

    this.gameWrapper.appendChild(this.startGameButton);
    document.body.appendChild(this.gameWrapper);
  }

  public show() {
    document.body.appendChild(this.gameWrapper);
    this.run();
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }

  public run() {
    this.startGameButton.addEventListener("click", () => {
      gameState.updateView("game");
    });
  }
}
