class GameView {
  private correctNumber: number;
  private userNumber: number;

  public gameWrapper: HTMLElement;

  private inputWrapper: HTMLElement;
  private inputField: HTMLInputElement;
  private textBox: HTMLElement;

  private guessButton: HTMLElement;
  private guessCountElement: HTMLElement;
  // private guessCount: number;

  private opponentWrapper: HTMLElement;
  private opponents: Array<Opponent>;
  private leader: Leader;

  private timeIsUp: boolean;
  private timerElement: HTMLElement;
  private countDown: number;
  private s: number;
  private ms: number;

  private min: number;
  private max: number;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper", "left");

    this.leader = new Leader();

    this.min = 1;
    this.max = 100;

    this.correctNumber = this.leader.correctNumber;

    // USER INPUT
    this.inputWrapper = document.createElement("div")
    this.inputField = document.createElement("input");
    this.userNumber = this.getUserInput();
    this.textBox = document.createElement("span");
    this.textBox.classList.add("textBox");
    this.textBox.innerText = "Guess a number between 1-100!";
    
    // GUESS
    this.guessButton = document.createElement("button");
    this.guessButton.classList.add("all-buttons");
    this.guessButton.innerHTML = "Guess";
    this.guessCountElement = document.createElement("span");
    this.guessCountElement.innerText = "Guess count: "
    this.guessCountElement.classList.add("guess-counter");

    this.inputWrapper.appendChild(this.inputField)
    this.inputWrapper.appendChild(this.guessButton)
    this.inputWrapper.classList.add("input-wrapper")

    // OPPONENTS
    this.opponents = [
      new Opponent("Mr Tweedle-Dumb", "dumb", "/images/stickman-1.png"),
      new Opponent("Mr Random Rambo", "random", "/images/stickman-3.png"),
      new Opponent("Mr Smarty-Pants", "smart", "/images/stickman-2.png"),
    ];
    this.opponentWrapper = document.createElement("div");
    this.opponentWrapper.classList.add("opponents");
    for (const op of this.opponents) {
      this.opponentWrapper.appendChild(op.wrapper);
    }

    // TIMER
    this.timeIsUp = false;
    this.timerElement = document.createElement("p");
    this.timerElement.classList.add("timer");
    this.s = 10;
    this.ms = 0;
    this.countDown = 0;

    // APPENDS
    this.gameWrapper.appendChild(this.textBox);
    this.gameWrapper.appendChild(this.inputWrapper);
    this.gameWrapper.appendChild(this.guessCountElement);
    this.gameWrapper.appendChild(this.leader.wrapper);
    this.gameWrapper.appendChild(this.timerElement);
    this.gameWrapper.appendChild(this.opponentWrapper);
  }
  // ----------------- END OF CONSTRUCTOR

  public run() {

    this.guessCountElement.innerText = "Guess count: " + String(gameState.guessCount);
    this.gameWrapper.appendChild(gameState.soundBar);
    this.gameWrapper.appendChild(gameState.logoImage);
    gameState.logoImage.classList.remove("logo-img-start");
    gameState.logoImage.classList.add("logo-img-absolute");

    document.body.appendChild(this.gameWrapper);
    console.log(this.correctNumber);
    this.startTimer();

    setInterval(() => {
      if (this.timeIsUp) {
        this.stopTimer;
        this.userNumber = 0;
        this.getUserAnswer();
        this.getOpponentAnswers();
        this.timeIsUp = false;
      }
    }, 1000);

    this.guessButton.addEventListener("click", () => {
      this.stopTimer();
      this.getUserAnswer();
      if (this.userNumber != this.correctNumber) {
        setTimeout(() => {
          this.getOpponentAnswers();
        }, 2000);
      }
      this.inputField.value = "";
    });

    window.addEventListener("keydown", (e) => {
      if (e.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      if (e.key === "Enter") {
        this.stopTimer();
        this.gameWrapper.appendChild(this.opponentWrapper);
        this.getUserAnswer();
        if (this.userNumber != this.correctNumber) {
          setTimeout(() => {
            this.getOpponentAnswers();
          }, 2000);
        }
        this.inputField.value = "";
      } else {
        return;
      }
      e.preventDefault();
    });
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }

  private runNextRound() {
    this.startTimer();
    this.printLeaderResponse(gameState.playerName + ", please guess again!");
    setInterval(() => {
      if (this.timeIsUp) {
        this.stopTimer;
        this.userNumber = 0;
        this.gameWrapper.appendChild(this.opponentWrapper);
        this.getUserAnswer();
        setTimeout(() => {
          this.getOpponentAnswers();
        }, 2000);
        this.timeIsUp = false;
      }
    }, 1000);
  }

  private updateMinMax(guess: number) {
    if (this.leader.response === "higher" && guess >= this.min) {
      this.min = guess + 1;
    } else if (this.leader.response === "lower" && guess <= this.max) {
      this.max = guess - 1;
    } else {
      return;
    }
  }

  private stopTimer() {
    this.guessButton.style.opacity = "0";
    this.timeIsUp = false;
    this.gameWrapper.removeChild(this.timerElement);
    clearInterval(this.countDown);
  }

  private startTimer() {
    this.guessButton.style.opacity = "1";
    this.s = 10;
    this.timeIsUp = false;
    this.gameWrapper.appendChild(this.timerElement);
    this.countDown = setInterval(() => {
      this.timer();
    }, 10);
  }

  private timer() {
    if (this.ms === 0) {
      this.ms = 99;
      this.s -= 1;
    }
    this.ms -= 1;
    this.timerElement.innerText = String(this.s) + ":" + String(this.ms);
    if (this.s < 5) {
      this.timerElement.style.color = "red";
    } else {
      this.timerElement.style.color = "black";
    }
    if (this.s === 0 && this.ms === 0) {
      clearInterval(this.countDown);
      this.timeIsUp = true;
    }
  }

  // Returnerar det numret som användaren skriver i input-fältet
  private getUserInput() {
    const input = Number(this.inputField.value);
    if (input > 100 || isNaN(input)) {
      return 12345;
    } else {
      return input;
    }
  }

  // Hämtar användarens gissning
  private getUserAnswer() {
    this.updateGuessCount();

    this.userNumber = this.getUserInput();

    if (this.userNumber === this.correctNumber) {
      setTimeout(() => {
        this.printWinnerMessage(gameState.playerName);
        this.updateLocalStorage();
      }, 1500);
    }

    const response = this.leader.getResponse(
      this.userNumber,
      String(localStorage.getItem("name"))
    );
    this.printLeaderResponse(response);
    this.updateMinMax(this.userNumber);
  }

  private printWinnerMessage(opponentName: string) {
    const winnerText = document.createElement("h4");
    winnerText.classList.add("xtext");
    winnerText.innerHTML = opponentName + ", you are the winner!";
    gameState.winner = opponentName;
    this.gameWrapper.appendChild(winnerText);

    setTimeout(() => {
      gameState.updateView("over");
    }, 500);
  }

  // Loop through all opponents and print their guesses and leaders response
  private getOpponentAnswers() {
    for (let i = 0; i < this.opponents.length; i++) {
      let op = this.opponents[i];
      setTimeout(() => {
        if (op) {
          if (op?.personality === "dumb") {
            op.getDumbGuess(this.userNumber, this.correctNumber);
          } else if (op.personality === "random") {
            op.getRandomGuess();
          } else {
            op.getSmartGuess(this.min, this.max);
          }
          // Run each iteration
          const response = this.leader.getResponse(op.guess, op.name);
          this.printLeaderResponse(response);
          this.updateMinMax(op.guess);
          // Check if the opponents guess was correct
          setTimeout(() => {
            if (op?.guess === this.correctNumber) {
              this.printWinnerMessage(op.name);
            }
          }, 1000);
          // If opponents guess was incorrect, start next round
          if (i === 2 && op?.guess != this.correctNumber) {
            setTimeout(() => {
              this.runNextRound();
            }, 2000);
          }
        }
      }, 2000 * i);
    }
  }

  // Ökar antal gissningar med 1
  private updateGuessCount() {
    gameState.guessCount++;
    this.guessCountElement.innerText = "Guess count: " + String(gameState.guessCount);
  }

  private printLeaderResponse(response: string) {
    if (this.leader.responseWrapper.childNodes.length === 1) {
      this.leader.responseWrapper.innerHTML = "";
    }
    const responseWrapper = document.createElement("div");
    responseWrapper.classList.add("response-bubble");

    const responseElem = document.createElement("p");
    responseElem.innerText = response;

    responseWrapper.appendChild(responseElem);
    this.leader.responseWrapper.appendChild(responseWrapper);
    this.leader.wrapper.appendChild(this.leader.responseWrapper)
    //this.gameWrapper.appendChild(this.leader.responseWrapper);
  }

  private updateLocalStorage() {
    let players: Array<object> = JSON.parse(localStorage.getItem("highscore"));

    let player: string | null = localStorage.getItem("name");

    let score: number = gameState.guessCount;

    let playerObject: object = {
      player: player,
      score: score,
    };

    if (players == null) {
      players = [playerObject];
    } else {
      players.push(playerObject);
    }

    localStorage.setItem("score", JSON.stringify(playerObject));
    localStorage.setItem("highscore", JSON.stringify(players));
  }
}
