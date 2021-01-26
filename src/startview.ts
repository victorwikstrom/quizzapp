class StartView {
  private gameWrapper: HTMLElement;
  private startGameButton: HTMLElement;
  private presentOpponent: HTMLElement;
  private presentOpponent1: HTMLElement;
  private presentOpponent2: HTMLElement;
  private presentOpponent3: HTMLElement;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper", "start-view");

    this.startGameButton = document.createElement("button");
    this.startGameButton.classList.add("all-buttons");

    this.presentOpponent = document.createElement("div");
    this.presentOpponent1 = document.createElement("span");
    this.presentOpponent2 = document.createElement("span");
    this.presentOpponent3 = document.createElement("span");
    this.presentOpponent.classList.add("present-opponent");
    this.gameWrapper.appendChild(this.presentOpponent);
    this.presentOpponent.classList.add("present-opponent1");
    this.presentOpponent.appendChild(this.presentOpponent1);
    this.presentOpponent.classList.add("present-opponent2");
    this.presentOpponent.appendChild(this.presentOpponent2);
    this.presentOpponent.classList.add("present-opponent3");
    this.presentOpponent.appendChild(this.presentOpponent3);

    this.presentOpponent1.innerHTML =
    "<img src=\"./images/stickman-1.png\" width=\"80%\" \">" + "<br>" +
    "This is your first opponent this is your first opponent this is your first opponent";
    this.presentOpponent2.innerHTML =
    "<img src=\"./images/stickman-2.png\" width=\"80%\" \">" + "<br>" +
    "This is your second opponent this is your second opponent this is your second opponent ";
    this.presentOpponent3.innerHTML = 
    "<img src=\"./images/stickman-3.png\" width=\"80%\" \">" + "<br>" +
    "This is your third opponent this is your third opponent this is your third opponent";


    this.startGameButton.innerHTML = "START GAME";

    this.gameWrapper.appendChild(this.startGameButton);
  }

  // private presentOponent() {

  // }

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
