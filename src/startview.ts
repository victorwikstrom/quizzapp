class StartView {
  private gameWrapper: HTMLElement;
  private startGameButton: HTMLElement;
  private inputName: HTMLInputElement;
  private presentOpponent: HTMLElement;
  private presentOpponent1: HTMLElement;
  private presentOpponent2: HTMLElement;
  private presentOpponent3: HTMLElement;
  private gameInstructions: HTMLElement;
  private enterNameText: HTMLElement;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper", "start-view");

    this.gameInstructions = document.createElement("p");
    this.enterNameText = document.createElement("p");

    this.startGameButton = document.createElement("button");
    this.startGameButton.classList.add("all-buttons");

    this.presentOpponent = document.createElement("div");
    this.presentOpponent1 = document.createElement("span");
    this.presentOpponent2 = document.createElement("span");
    this.presentOpponent3 = document.createElement("span");
    this.presentOpponent.classList.add("present-opponent");

    this.presentOpponent.classList.add("present-opponent1");
    this.presentOpponent.classList.add("present-opponent2");
    this.presentOpponent.classList.add("present-opponent3");

    this.presentOpponent1.innerHTML =
      '<img src="./images/stickman-1.png" width="30%" ">' +
      "<br>" +
      "This is your first opponent this is your first opponent this is your first opponent";
    this.presentOpponent2.innerHTML =
      '<img src="./images/stickman-2.png" width="30%" ">' +
      "<br>" +
      "This is your second opponent this is your second opponent this is your second opponent ";
    this.presentOpponent3.innerHTML =
      '<img src="./images/stickman-3.png" width="30%" ">' +
      "<br>" +
      "This is your third opponent this is your third opponent this is your third opponent";

    this.startGameButton.innerHTML = "START GAME";

    this.inputName = document.createElement("input");
    this.inputName.classList.add("nameInput");

    this.gameInstructions.classList.add("gameInstructions");
    this.gameInstructions.innerText =
      "Guess the correct number before your opponents!";

    this.enterNameText.classList.add("name");
    this.enterNameText.innerHTML = "Enter your name:";

    document.body.appendChild(this.gameWrapper);
  }

  // private presentOponent() {

  // }

  public run() {
    this.gameWrapper.appendChild(gameState.soundBar);
    this.gameWrapper.appendChild(gameState.logoImage);
    this.gameWrapper.appendChild(this.presentOpponent);
    this.presentOpponent.appendChild(this.presentOpponent1);
    this.presentOpponent.appendChild(this.presentOpponent2);
    this.presentOpponent.appendChild(this.presentOpponent3);
    this.gameWrapper.appendChild(this.gameInstructions);
    this.gameWrapper.appendChild(this.enterNameText);
    this.gameWrapper.appendChild(this.inputName);
    this.gameWrapper.appendChild(this.startGameButton);
    gameState.logoImage.classList.add("logo-img-start");

    document.body.appendChild(this.gameWrapper);
    this.startGameButton.addEventListener("click", () => {
      gameState.playerName = this.inputName.value;
      localStorage.setItem("name", gameState.playerName);

      gameState.updateView("game");
    });
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }
}
