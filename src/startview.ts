class StartView {
  public gameWrapper: HTMLElement;
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

    this.presentOpponent1.classList.add("start-opponent")
    this.presentOpponent2.classList.add("start-opponent")
    this.presentOpponent3.classList.add("start-opponent")

    this.presentOpponent.classList.add("present-opponent1", "present-opponent2", "present-opponent3");

    this.presentOpponent1.innerHTML =
      '<img src="./images/stickman-1.png" width="30%" ">' +
      "<br>" +
      "Mr Tweedle-Dumb. Not too clever and seems a bit overly cautious, as their guesses never stray too far from their previous one.";
    this.presentOpponent2.innerHTML =
      '<img src="./images/stickman-2.png" width="26%" ">' +
      "<br>" +
      "Mr Smarty-Pants. The most clever out of the bunch and fancies themself your true competition. An astute thinker coupled with good memory who will provide you a real challenge in the race.";
    this.presentOpponent3.innerHTML =
      '<img src="./images/stickman-3.png" width="30%" ">' +
      "<br>" +
      "Mr Random Rambo. More action! Less thinking! Will pick any number that happens to appear in their headspace. No logic, all luck.";

    this.startGameButton.innerHTML = "START GAME";

    this.inputName = document.createElement("input");
    this.inputName.classList.add("nameInput");

    this.gameInstructions.classList.add("gameInstructions");
    this.gameInstructions.innerText =
      "Your goal in this game is to discover the correct number, hidden somewhere between 1-100. Start your guessing game by picking any number in that range. The game leader will then let you know if you've hit the mark or if you need to guess again and prompt you to go higher or lower. You're up against three opponents who will also take turns guessing. I'm not sure if telling you this is cheating, but you're all looking for the same number and you can use their guesses to your advantage.";

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

