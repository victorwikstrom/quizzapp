class GameView {
  private botNumber: number;
  private userNumber: number;

  private gameWrapper: HTMLElement;

  private inputField: HTMLInputElement;
  private guessButton: HTMLElement;
  private textBox: HTMLElement;

  private guessCountElement: HTMLElement;
  private guessCount: number;

  private opponents: HTMLElement;

  private opponentElement: HTMLElement;
  private opponentElement2: HTMLElement;
  private opponentElement3: HTMLElement;

  private opponentGuess: number;
  private opponentGuess2: number;
  private opponentGuess3: number;

  private min: number;
  private max: number;

  constructor() {

    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper");

    this.textBox = document.createElement("span");
    this.textBox.classList.add('textBox');
    this.textBox.innerText = "Guess a number between 1-100!";

    this.inputField = document.createElement("input");
    this.guessButton = document.createElement("button");
    this.guessButton.classList.add("all-buttons");
    this.guessButton.innerHTML = "Gissa";

    this.min = 1;
    this.max = 100;

    this.botNumber = this.getBotNumber();
    this.userNumber = this.getUserInput();

    this.guessCountElement = document.createElement("span");
    this.guessCountElement.classList.add("guess-counter");
    this.guessCount = 0;
    this.guessCountElement.innerText = String(this.guessCount);

    this.opponents = document.createElement("div");
    this.opponents.classList.add('opponents');

    this.opponentElement = document.createElement("div");
    this.opponentElement2 = document.createElement("div");
    this.opponentElement3 = document.createElement("div");

    this.opponentElement.classList.add('opponent');
    this.opponentElement2.classList.add('opponent');
    this.opponentElement3.classList.add('opponent');

    this.opponentGuess = this.getRandomInt(this.min, this.max);
    this.opponentGuess2 = this.getRandomInt(this.min, this.max);
    this.opponentGuess3 = this.getRandomInt(this.min, this.max);

    this.gameWrapper.appendChild(this.textBox);
    this.gameWrapper.appendChild(this.inputField);
    this.gameWrapper.appendChild(this.guessButton);
    this.gameWrapper.appendChild(this.guessCountElement);
  }

  public run() {
    document.body.appendChild(this.gameWrapper);
    console.log(this.botNumber);
    this.guessButton.addEventListener("click", () => {

      // Lagt denna här istället för i konstruktorn så att motståndarnas gissningar visas först när man klickat på gissa-knappen
      this.opponents.appendChild(this.opponentElement);
      this.opponents.appendChild(this.opponentElement2);
      this.opponents.appendChild(this.opponentElement3);
      this.gameWrapper.appendChild(this.opponents);

      this.validateUserInput();
      this.checkOpponentAnswers();
    });
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }

  // Returnerar ett random tal mellan min och max
  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Uppdaterar this.min och this.man beroende på vad användaren och motståndarna gissar
  private updateMinMax(guess: number, previousGuess: number) {

    if (guess <= this.max && guess >= this.min) {

      if (guess > this.botNumber && previousGuess > this.botNumber && guess > previousGuess) {

        this.min = this.min;

        if (previousGuess >= this.max) {
          this.max = this.max;
        } else {
          this.max = previousGuess - 1;
        }

      } else if (guess > this.botNumber && previousGuess > this.botNumber && guess < previousGuess) {
        this.min = this.min;
        this.max = guess - 1;

      } else if (guess < this.botNumber && previousGuess < this.botNumber && guess > previousGuess) {
        this.min = guess + 1;
        this.max = this.max;

      } else if (guess < this.botNumber && previousGuess < this.botNumber && guess < previousGuess) {

        if (previousGuess <= this.min) {
          this.min = this.min
        } else {
          this.min = previousGuess + 1;
        }
        this.max = this.max;

      } else if (guess < this.botNumber && previousGuess > this.botNumber) {
        this.min = guess + 1;

        if (previousGuess >= this.max) {
          this.max = this.max;
        } else {
          this.max = previousGuess - 1;
        }

      } else if (guess > this.botNumber && previousGuess < this.botNumber) {

        if (previousGuess <= this.min) {
          this.min = this.min;
        } else {
          this.min = previousGuess + 1;
        }

        this.max = guess - 1;
      }
    }
  }

  // Uppdaterar this.min och this.max efter användarens första gissning
  private updateMinMaxFirstRound(guess: number) {
    if (guess > this.botNumber) {
      this.min = this.min;
      this.max = guess - 1;

    } else if (guess < this.botNumber) {
      this.min = guess + 1;
      this.max = this.max;
    }
  }

  // Gissar alltid på ett nummer lägre eller ett nummer högre än föregående spelare
  private getDumbGuess(previousGuess: number) {
    if (previousGuess > this.botNumber) {
      return previousGuess - 1;
    } else {
      return previousGuess + 1;
    }
  }

  // Spelledarens nummer (rätt svar)
  private getBotNumber() {
    return Math.floor(Math.random() * (this.max - this.min) + this.min);
  }

  // Returnerar det numret som användaren skriver i input-fältet
  private getUserInput() {
    return Number(this.inputField.value);
  }

  // Hämtar användarens gissning 
  private validateUserInput() {

    this.userNumber = this.getUserInput();
    console.log('User: ' + this.userNumber);

    if (this.guessCount > 0) {
      this.updateMinMax(this.userNumber, this.opponentGuess3)
    } else {
      this.updateMinMaxFirstRound(this.userNumber);
    }

    this.updateGuessCount()
    this.getWinner(this.userNumber);
    console.log('Min: ' + this.min + ', Max: ' + this.max)
    this.textBox.innerHTML = this.getAnswerForUser(this.userNumber)
  }

  // Genererar svar för motståndarna
  private checkOpponentAnswers() {

    setTimeout(() => {
      this.opponentGuess = this.getRandomInt(this.min, this.max);
      this.opponentElement.innerHTML = "Opponent 1:" + '<br>' + String(this.opponentGuess) + '<br>' + this.getAnswerForOpponent(this.opponentGuess);
      this.updateMinMax(this.opponentGuess, this.userNumber)
      this.getWinner(this.opponentGuess);
      console.log('Opponent 1: ' + this.opponentGuess)
      console.log('Min: ' + this.min + ', Max: ' + this.max)
    }, 2000)

    setTimeout(() => {
      this.opponentGuess2 = this.getDumbGuess(this.opponentGuess)
      this.opponentElement2.innerHTML = "Opponent 2:" + '<br>' + String(this.opponentGuess2) + '<br>' + this.getAnswerForOpponent(this.opponentGuess2);
      this.updateMinMax(this.opponentGuess2, this.opponentGuess)
      this.getWinner(this.opponentGuess2);
      console.log('Opponent 2: ' + this.opponentGuess2)
      console.log('Min: ' + this.min + ', Max: ' + this.max)
    }, 4000);

    setTimeout(() => {
      this.opponentGuess3 = this.getRandomInt(1, 100);
      this.opponentElement3.innerHTML = "Opponent 3:" + '<br>' + String(this.opponentGuess3) + '<br>' + this.getAnswerForOpponent(this.opponentGuess3);
      this.updateMinMax(this.opponentGuess3, this.opponentGuess2)
      this.getWinner(this.opponentGuess3);
      console.log('Opponent 3: ' + this.opponentGuess3)
      console.log('Min: ' + this.min + ', Max: ' + this.max)
    }, 6000);
  }

  // Ökar antal gissningar med 1
  private updateGuessCount() {
    this.guessCount++;
    this.guessCountElement.innerText = String(this.guessCount);
  }

  // Ändrar gameState när användaren eller motståndaren gissar rätt
  private getWinner(guess: number) {
    if (guess == this.botNumber) {
      gameState.updateView("over");
    }
  }

  // Svaret på användarens gissning
  private getAnswerForUser(number: number) {
    if (number > 100 || number < 0 || isNaN(number)) {
      return "Please choose a number between 1-100";
    } else if (number > this.botNumber) {
      return "User, please guess a lower number!";
    } else if (number < this.botNumber) {
      return "User, please guess a higher number!";
    } else {
      gameState.updateView("over");
      return "User, you are correct!";
    }
  }

  // Svaret på en motståndares gissning
  private getAnswerForOpponent(number: number) {
    if (number > this.botNumber) {
      return "Please guess a lower number!";
    } else if (number < this.botNumber) {
      return "Please guess a higher number!";
    } else {
      return "You are correct!";
    }
  }
}
