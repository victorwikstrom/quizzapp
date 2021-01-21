class Game {
  private botNumber: number;
  private userNumber: number;

  private botAnswer: string;
  private gameWrapper: HTMLElement;

  private inputField: HTMLInputElement;
  private guessButton: HTMLElement;
  private textBox: HTMLElement;

  private guessCountElement: HTMLElement;
  private guessCount: number;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper");

    this.botAnswer = "Start guessing!";
    this.textBox = document.createElement("span");
    this.textBox.innerText = this.botAnswer;

    this.inputField = document.createElement("input");
    this.guessButton = document.createElement("button");
    this.guessButton.innerHTML = "Gissa";

    this.botNumber = this.getBotNumber();
    this.userNumber = this.getUserInput();

    this.guessCountElement = document.createElement("span");
    this.guessCountElement.classList.add("guess-counter");
    this.guessCount = 0;
    this.guessCountElement.innerText = String(this.guessCount);

    this.gameWrapper.appendChild(this.textBox);
    this.gameWrapper.appendChild(this.inputField);
    this.gameWrapper.appendChild(this.guessButton);
    this.gameWrapper.appendChild(this.guessCountElement);
  }

  public runGame() {
    document.body.appendChild(this.gameWrapper);
    this.guessButton.addEventListener("click", () => {
      this.validateUserInput();
    });
  }

  private getBotNumber() {
    return Math.floor(Math.random() * Math.floor(20));
  }

  private getUserInput() {
    return Number(this.inputField.value);
  }

  private validateUserInput() {
    this.guessCount++;
    this.guessCountElement.innerText = String(this.guessCount);

    this.userNumber = this.getUserInput();

    if (this.userNumber > 20 || this.userNumber < 0 || isNaN(this.userNumber)) {
      this.botAnswer = "Please choose a number between 1-20";
    } else {
      this.getBotAnswer(this.userNumber);
    }
    this.textBox.innerText = this.botAnswer;
  }

  private getBotAnswer(number: number) {
    if (number > this.botNumber) {
      this.botAnswer = "Lower!";
    } else if (number < this.botNumber) {
      this.botAnswer = "Higher!";
    } else {
      this.botAnswer = "Correct!";
    }
  }
}

window.addEventListener("load", () => {
  const game: Game = new Game();
  game.runGame();
});
