class StartView {
  private gameWrapper: HTMLElement;
  private startGameButton: HTMLElement;
  private inputName: HTMLInputElement;
  private presentOpponent: HTMLElement;
  private presentOpponent1: HTMLElement;
  private presentOpponent2: HTMLElement;
  private presentOpponent3: HTMLElement;
  private gameLogo: HTMLElement;


  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper", "start-view");
    this.gameLogo = document.createElement('div');
    this.gameLogo.classList.add("logo");

    this.startGameButton = document.createElement("button");
    this.startGameButton.classList.add("all-buttons");

    this.presentOpponent = document.createElement("div");
    this.presentOpponent1 = document.createElement("span");
    this.presentOpponent2 = document.createElement("span");
    this.presentOpponent3 = document.createElement("span");
    this.presentOpponent.classList.add("present-opponent");

    this.gameWrapper.appendChild(this.gameLogo);

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

    this.inputName = document.createElement("input");
    this.inputName.classList.add ("nameInput");
   
    let gameInstructions = document.createElement("p");
    gameInstructions.classList.add("gameInstructions");
    gameInstructions.innerText = "Guess the correct number before your opponents!";
   
    let name = document.createElement("p");
    name.classList.add("name");
    name.innerHTML = "Enter your name:";

    this.gameWrapper.appendChild(gameInstructions);
    this.gameWrapper.appendChild(name);
    this.gameWrapper.appendChild(this.inputName);
    this.gameWrapper.appendChild(this.startGameButton);

    document.body.appendChild(this.gameWrapper);
  }

  // private presentOponent() {

  // }

  public run() {

    document.body.appendChild(this.gameWrapper);
    this.startGameButton.addEventListener("click", () => {
      gameState.playerName = this.inputName.value;
      gameState.updateView("game");
    });
    
    
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }
}
