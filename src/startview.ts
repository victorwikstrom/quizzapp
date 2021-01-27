class StartView {
  private gameWrapper: HTMLElement;
  private startGameButton: HTMLElement;
  private inputName: HTMLElement;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper", "start-view");
    
    this.startGameButton = document.createElement("button");
    this.startGameButton.innerHTML = "START GAME";

    this.inputName = document.createElement("input");
    this.inputName.classList.add ("nameInput", "name");
   
    let gameInstructions = document.createElement("p");
    gameInstructions.innerText = "Guess the correct number before the bot";
   
    let name = document.createElement("p");
    name.innerHTML = "Name";

    this.gameWrapper.appendChild(this.startGameButton);
    this.gameWrapper.appendChild(gameInstructions);
    this.gameWrapper.appendChild(this.inputName);
    this.gameWrapper.appendChild(name);

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
