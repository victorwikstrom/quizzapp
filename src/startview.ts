class StartView {
  private gameWrapper: HTMLElement;
  private startGameButton: HTMLElement;
  private inputName: HTMLElement;
  private gameInstructions: HTMLElement;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper", "start-view");
    this.startGameButton = document.createElement("button");
    this.startGameButton.innerHTML = "START GAME";
    this.gameInstructions = document.createElement("paragraph");
    this.gameInstructions.innerText = "Guess the correct number before the bot"
    this.inputName = document.createElement("input");
    this.inputName.classList.add ("nameInput")
    //this.inputName.innerHTML = "Enter your name";

    this.gameWrapper.appendChild(this.startGameButton);
    this.gameWrapper.appendChild(this.gameInstructions);
    this.gameWrapper.appendChild(this.inputName);
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
