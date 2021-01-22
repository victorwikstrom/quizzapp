class Game {
  private botNumber: number;
  private userNumber: number;

  private botAnswer: string;
  private botAnswerForOpponent: string;

  private gameWrapper: HTMLElement;

  private inputField: HTMLInputElement;
  private guessButton: HTMLElement;
  private textBox: HTMLElement;

  private guessCountElement: HTMLElement;
  private guessCount: number;

  // nytt
  private opponentElement: HTMLElement;
  private opponentGuess: number;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper");

    this.botAnswer = "Start guessing!";
    // nytt
    this.botAnswerForOpponent = '';

    this.textBox = document.createElement("span");
    this.textBox.innerText = this.botAnswer;

    this.inputField = document.createElement("input");
    this.guessButton = document.createElement("button");
    this.guessButton.innerHTML = "Guess";

    this.botNumber = this.getBotNumber();
    this.userNumber = this.getUserInput();

    this.guessCountElement = document.createElement("span");
    this.guessCountElement.classList.add("guess-counter");
    this.guessCount = 0;
    this.guessCountElement.innerText = String(this.guessCount);

    // nytt
    this.opponentElement = document.createElement('div');
    this.opponentGuess = this.getOpponentNumber();
    this.opponentElement.innerText = 'Opponent guess: ' + String(this.opponentGuess)

    this.gameWrapper.appendChild(this.textBox);
    this.gameWrapper.appendChild(this.inputField);
    this.gameWrapper.appendChild(this.guessButton);
    this.gameWrapper.appendChild(this.guessCountElement);
    this.gameWrapper.appendChild(this.opponentElement);
    
  }

  public runGame() {

    console.log(this.botNumber)

    document.body.appendChild(this.gameWrapper);
    this.guessButton.addEventListener("click", () => {
      this.validateUserInput();
    });
  }

  // nytt
  private getOpponentNumber() {
    return Math.floor(Math.random() * Math.floor(20));
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
    // nytt
    this.opponentGuess = this.getOpponentNumber();

    if (this.userNumber > 20 || this.userNumber < 0 || isNaN(this.userNumber)) {
      this.botAnswer = "Please choose a number between 1-20";
    } else {
      this.getBotAnswer(this.userNumber);
      // nytt
      this.checkOpponentAnswer(this.opponentGuess)
    }

    this.textBox.innerText = this.botAnswer + ' ' + this.botAnswerForOpponent;
    // nytt
    this.opponentElement.innerText = 'Opponent guess: ' + String(this.opponentGuess)
  }

  private getBotAnswer(number: number) {
    if (number > this.botNumber) {
      this.botAnswer = "User, please guess a lower number!";
    } else if (number < this.botNumber) {
      this.botAnswer = "User, please guess a higher number!";
    } else {
      this.botAnswer = "User, you are correct!";
      this.resetGuessCount();
    }
  }

  // nytt
  private checkOpponentAnswer(number: number) {
    if (number > this.botNumber) {
      this.botAnswerForOpponent = "Opponent, please guess a lower number!";
    } else if (number < this.botNumber) {
      this.botAnswerForOpponent = "Opponent, please guess a higher number!";
    } else {
      this.botAnswerForOpponent = "Opponent, you are correct!";
      this.resetGuessCount();
    }
  }

  private resetGuessCount() {
    let resetButton = document.createElement("button");
    resetButton.innerHTML = "Restart game!";
    resetButton.addEventListener("click", () => {
      this.guessCount = 0
      this.botNumber = this.getBotNumber();
      this.guessCountElement.innerText = String(this.guessCount);
      this.gameWrapper.removeChild(resetButton)
    })
    this.gameWrapper.appendChild(resetButton);
  }

}

// END OF GAME CLASS

window.addEventListener("load", () => {
  const game: Game = new Game();
  game.runGame();
});
