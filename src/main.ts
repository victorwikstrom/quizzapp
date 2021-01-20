class Game {
  private correctNumber: number;
  private guessNumber: number;

  private botAnswer: string;
  private gameWrapper: HTMLElement;

  private inputField: HTMLInputElement;
  private guessButton: HTMLElement;
  private textBox: HTMLElement;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper");

    this.botAnswer = "Start guessing!";

    this.inputField = document.createElement("input");
    this.guessButton = document.createElement("button");
    this.guessButton.innerHTML = "Gissa";
    this.textBox = document.createElement("span");
    this.textBox.innerText = this.botAnswer;

    this.correctNumber = this.getRandomNumber();
    this.guessNumber = this.getUserInput();

    this.gameWrapper.appendChild(this.textBox);
    this.gameWrapper.appendChild(this.inputField);
    this.gameWrapper.appendChild(this.guessButton);
  }

  public runGame() {
    console.log(this.correctNumber);
    document.body.appendChild(this.gameWrapper);
    this.guessButton.addEventListener("click", () => {
      this.validateUserInput();
    });
  }

  private getRandomNumber() {

    // 0-20
    // return Math.floor(Math.random() * Math.floor(20));

    // 1-20
    return Math.floor(Math.random() * (20) + 1);
  }

  private getUserInput() {
    return Number(this.inputField.value);
  }

  private validateUserInput() {
    this.guessNumber = this.getUserInput();
    console.log(this.guessNumber);
    if (
      this.guessNumber > 20 ||
      this.guessNumber < 0 ||
      isNaN(this.guessNumber)
    ) {
      this.botAnswer = "Please choose a number between 1-20";
    } else {
      this.getBotAnswer(this.guessNumber);
    }

    this.textBox.innerText = this.botAnswer;
  }

  private getBotAnswer(number: number) {
    if (number > this.correctNumber) {
      this.botAnswer = "Lower!";
    } else if (number < this.correctNumber) {
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
