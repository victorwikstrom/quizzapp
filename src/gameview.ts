class GameView {
  private correctNumber: number;
  private userNumber: number;

  private gameWrapper: HTMLElement;

  private inputField: HTMLInputElement;
  private guessButton: HTMLElement;
  private textBox: HTMLElement;

  private guessCountElement: HTMLElement;
  private guessCount: number;

  private opponentWrapper: HTMLElement;

  private leader: Leader;

  /*
  private opponentElement: HTMLElement;
  private opponentElement2: HTMLElement;
  private opponentElement3: HTMLElement;

  private opponentGuess: number;
  private opponentGuess2: number;
  private opponentGuess3: number;
  */

  private opponents: Array<Opponent>;

  private min: number;
  private max: number;

  private leaderResponse: string;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper");

    this.textBox = document.createElement("span");
    this.textBox.classList.add("textBox");
    this.textBox.innerText = "Guess a number between 1-100!";

    this.inputField = document.createElement("input");
    this.guessButton = document.createElement("button");
    this.guessButton.classList.add("all-buttons");
    this.guessButton.innerHTML = "Gissa";

    this.opponents = [
      new Opponent("Mr Dumb", "dumb", "/images/stickman-1.png"),
      new Opponent("Mr Random", "random", "/images/stickman-3.png"),
      new Opponent("Mr Smart", "smart", "/images/stickman-2.png"),
    ];

    this.leader = new Leader();

    this.min = 1;
    this.max = 100;

    this.correctNumber = this.leader.correctNumber;
    this.userNumber = this.getUserInput();

    this.guessCountElement = document.createElement("span");
    this.guessCountElement.classList.add("guess-counter");
    this.guessCount = 0;
    this.guessCountElement.innerText = String(this.guessCount);

    this.opponentWrapper = document.createElement("div");
    this.opponentWrapper.classList.add("opponents");

    for (const op of this.opponents) {
      this.opponentWrapper.appendChild(op.wrapper);
    }

    /*
    this.opponentElement = document.createElement("div");
    this.opponentElement2 = document.createElement("div");
    this.opponentElement3 = document.createElement("div");

    this.opponentElement.classList.add('opponent');
    this.opponentElement2.classList.add('opponent');
    this.opponentElement3.classList.add('opponent');

    

    this.opponentGuess = this.getRandomInt(this.min, this.max);
    this.opponentGuess2 = this.getRandomInt(this.min, this.max);
    this.opponentGuess3 = this.getRandomInt(this.min, this.max);
    */

    this.leaderResponse = "";

    this.gameWrapper.appendChild(this.textBox);
    this.gameWrapper.appendChild(this.inputField);
    this.gameWrapper.appendChild(this.guessButton);
    this.gameWrapper.appendChild(this.guessCountElement);
    this.gameWrapper.appendChild(this.leader.wrapper);
  }

  public run() {
    document.body.appendChild(this.gameWrapper);
    console.log(this.correctNumber);
    this.guessButton.addEventListener("click", () => {
      // Lagt denna här istället för i konstruktorn så att motståndarnas gissningar visas först när man klickat på gissa-knappen

      /*
      this.opponentWrapper.appendChild(this.opponentElement);
      this.opponentWrapper.appendChild(this.opponentElement2);
      this.opponentWrapper.appendChild(this.opponentElement3);
      */
      this.gameWrapper.appendChild(this.opponentWrapper);

      this.printUserAnswer();
      this.getOpponentAnswers();
    });
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }

  // Returnerar ett random tal mellan min och max
  /*
  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  */

  private updateMinMax2(guess: number) {
    if (this.leader.response === "higher" && guess >= this.min) {
      this.min = guess + 1;
    } else if (this.leader.response === "lower" && guess <= this.max) {
      this.max = guess - 1;
    } else {
      return;
    }
  }

  // Uppdaterar this.min och this.man beroende på vad användaren och motståndarna gissar
  /*
  private updateMinMax(guess: number, previousGuess: number) {

    if (guess <= this.max && guess >= this.min) {

      if (guess > this.correctNumber && previousGuess > this.correctNumber && guess > previousGuess) {

        this.min = this.min;

        if (previousGuess >= this.max) {
          this.max = this.max;
        } else {
          this.max = previousGuess - 1;
        }

      } else if (guess > this.correctNumber && previousGuess > this.correctNumber && guess < previousGuess) {
        this.min = this.min;
        this.max = guess - 1;

      } else if (guess < this.correctNumber && previousGuess < this.correctNumber && guess > previousGuess) {
        this.min = guess + 1;
        this.max = this.max;

      } else if (guess < this.correctNumber && previousGuess < this.correctNumber && guess < previousGuess) {

        if (previousGuess <= this.min) {
          this.min = this.min
        } else {
          this.min = previousGuess + 1;
        }
        this.max = this.max;

      } else if (guess < this.correctNumber && previousGuess > this.correctNumber) {
        this.min = guess + 1;

        if (previousGuess >= this.max) {
          this.max = this.max;
        } else {
          this.max = previousGuess - 1;
        }

      } else if (guess > this.correctNumber && previousGuess < this.correctNumber) {

        if (previousGuess <= this.min) {
          this.min = this.min;
        } else {
          this.min = previousGuess + 1;
        }

        this.max = guess - 1;
      }
    }
  }
  */

  // Returnerar det numret som användaren skriver i input-fältet
  private getUserInput() {
    return Number(this.inputField.value);
  }

  // Hämtar användarens gissning
  private printUserAnswer() {
    this.updateGuessCount();

    this.userNumber = this.getUserInput();
    

    if (this.userNumber === this.correctNumber) {
      this.printWinnerMessage(String(localStorage.getItem('name')));
      this.updateLocalStorage();
    }

    const response = this.leader.getResponse(this.userNumber, String(localStorage.getItem('name')));
    this.printLeaderResponse(response);
    this.updateMinMax2(this.userNumber);
    console.log(this.min, this.max)
  }

  private printWinnerMessage(opponentName: string) {
    const winnerText = document.createElement("h1");
    winnerText.classList.add("winner-text");
    winnerText.innerHTML = opponentName + ", you are the winner!";
    this.gameWrapper.appendChild(winnerText);

    setTimeout(() => {
      gameState.updateView("over");
    }, 1500);
  }

  private getOpponentAnswers() {
    for (const op of this.opponents) {
      
      this.printOpponentAnwers(op);
    }
  }

  // Genererar svar för motståndarna
  private printOpponentAnwers(op: Opponent) {
    if (op.personality === "dumb") {
      
      setTimeout(() => {
        op.getDumbGuess(this.userNumber, this.correctNumber);
        const response = this.leader.getResponse(op.guess, op.name);
        this.printLeaderResponse(response);
        this.updateMinMax2(op.guess);
        console.log(this.min, this.max)
      }, 2000);

      if (op.guess === this.correctNumber) {
        setTimeout(() => {
          this.printWinnerMessage(op.name);
        }, 2000);
      }
      
    } else if (op.personality === "random") {
      
      setTimeout(() => {
        op.getRandomGuess();
        const response = this.leader.getResponse(op.guess, op.name);
        this.printLeaderResponse(response);
        this.updateMinMax2(op.guess);
        console.log(this.min, this.max)
      }, 4000);

      if (op.guess === this.correctNumber) {
        setTimeout(() => {
          this.printWinnerMessage(op.name);
        }, 4000);
      }
      
    } else {
      
      setTimeout(() => {
        op.getSmartGuess(this.min, this.max);
        const response = this.leader.getResponse(op.guess, op.name);
        this.printLeaderResponse(response);
        this.updateMinMax2(op.guess);
        console.log(this.min, this.max)
      }, 6000);

      if (op.guess === this.correctNumber) {
        setTimeout(() => {
          this.printWinnerMessage(op.name);
        }, 6000);
      }
      
    }
  }

  /*
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
    */

  // Ökar antal gissningar med 1
  private updateGuessCount() {
    this.guessCount++;
    this.guessCountElement.innerText = String(this.guessCount);
  }
  private printLeaderResponse(response: string) {
    if (this.leader.responseWrapper.childNodes.length === 4) {
      this.leader.responseWrapper.innerHTML = "";
    }
    const responseElem = document.createElement("p");
    responseElem.innerText = response;

    this.leader.responseWrapper.appendChild(responseElem);
    this.gameWrapper.appendChild(this.leader.responseWrapper);
  }

  // Svaret på användarens gissning
  private getAnswerForUser(number: number) {
    if (number > 100 || number < 0 || isNaN(number)) {
      return "Please choose a number between 1-100";
    } else if (number > this.correctNumber) {
      return "User, please guess a lower number!";
    } else if (number < this.correctNumber) {
      return "User, please guess a higher number!";
    } else {
      this.updateLocalStorage();
      gameState.updateView("over");
      return "User, you are correct!";
    }
  }

  private updateLocalStorage() {

    let players: Array<object> = JSON.parse(localStorage.getItem('highscore'));
    
    let player: string | null = localStorage.getItem('name');
    console.log(player);

    let score: number = this.guessCount;

    let playerObject: object = {
      player: player,
      score: score
    }

    if (players == null) {
      players = [playerObject];
    } else {
      players.push(playerObject);
    }

    console.log(players)

    localStorage.setItem('score', JSON.stringify(playerObject))
    localStorage.setItem('highscore', JSON.stringify(players))
  }

}
