class GameView {
  private botNumber: number;
  private userNumber: number;

  private gameWrapper: HTMLElement;

  private inputField: HTMLInputElement;
  private guessButton: HTMLElement;
  private textBox: HTMLElement;

  private guessCountElement: HTMLElement;
  private guessCount: number;

  private opponentElement: HTMLElement;
  private opponentGuess: number;

  // variabler för två nya motståndare
  private opponentGuess2: number;
  private opponentGuess3: number;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper");

    this.textBox = document.createElement("span");
    this.textBox.innerText = "Start guessing!";

    this.inputField = document.createElement("input");
    this.guessButton = document.createElement("button");
    this.guessButton.innerHTML = "Gissa";

    this.botNumber = this.getBotNumber();
    this.userNumber = this.getUserInput();

    this.guessCountElement = document.createElement("span");
    this.guessCountElement.classList.add("guess-counter");
    this.guessCount = 0;
    this.guessCountElement.innerText = String(this.guessCount);

    this.opponentElement = document.createElement("div");
    this.opponentGuess = this.getOpponentNumber();

    // funktioner för två nya motståndare
    this.opponentGuess2 = this.getSecondOpponentNumber();
    this.opponentGuess3 = this.getThirdOpponentNumber();

    // Lagt till svar för två nya motståndare
    this.opponentElement.innerHTML =
      "Opponent 1 guess: " + String(this.opponentGuess) + "<br>" + 
      "Opponent 2 guess: " + String(this.opponentGuess2) + "<br>" + 
      "Opponent 3 guess: " + String(this.opponentGuess3);

    this.gameWrapper.appendChild(this.textBox);
    this.gameWrapper.appendChild(this.inputField);
    this.gameWrapper.appendChild(this.guessButton);
    this.gameWrapper.appendChild(this.guessCountElement);

    // Flyttat denna så att botanswer visas först när man klickat på gissa-knappen
    // this.gameWrapper.appendChild(this.opponentElement);
  }

  public run() {
    document.body.appendChild(this.gameWrapper);
    console.log(this.botNumber);
    this.guessButton.addEventListener("click", () => {
      this.gameWrapper.appendChild(this.opponentElement);
      this.validateUserInput();
    });
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }

  // Detta gör så att motståndaren anpassar svaret utifrån om man ska gissa högre eller lägre
  // Det blir dock alltid helt random utifrån högre/lägre, så t.ex. om motståndarens första
  // gissning är 10, svaret blir "gissa lägre", nästa gissning är 7, svaret blir "gissa högre"
  // så minns inte motståndaren att svaret även måste vara mindre än 10
  // Motståndaren kan även svara samma som den gjort tidigare under omgången
  private getOpponentNumber() {

    let numberRange = 20;

    if (this.guessCount > 0) {

      if (this.opponentGuess > this.botNumber) {
        // gissa på ett mindre tal
        let newNumberRange = this.opponentGuess - 1;
        // return Math.floor(Math.random() * Math.floor(newNumberRange));
        return Math.floor(Math.random() * (newNumberRange - 1) + 1);

      } else if (this.opponentGuess < this.botNumber) {
        // gissa på ett högre tal
        let newNumberRange = this.opponentGuess + 1;
        return Math.floor(Math.random() * (numberRange - newNumberRange) + newNumberRange);

      } else {
        return Math.floor(Math.random() * Math.floor(numberRange));
      }

    } else {
      return Math.floor(Math.random() * (numberRange - 1) + 1);
    }
  }

  // Gissning från motståndare 2
  private getSecondOpponentNumber() {
    return Math.floor(Math.random() * (20 - 1) + 1);;
  }

  // Gissning från motståndare 3
  private getThirdOpponentNumber() {
    return Math.floor(Math.random() * (20 - 1) + 1);
  }

  private getBotNumber() {

    // Ändrat så att numret inte kan vara 0
    return Math.floor(Math.random() * (20 - 1) + 1);
  }

  private getUserInput() {
    return Number(this.inputField.value);
  }

  private validateUserInput() {
    this.guessCount++;
    this.guessCountElement.innerText = String(this.guessCount);

    this.userNumber = this.getUserInput();
    this.opponentGuess = this.getOpponentNumber();

    // hämtar nya gissningar för två nya motståndare
    this.opponentGuess2 = this.getSecondOpponentNumber();
    this.opponentGuess3 = this.getThirdOpponentNumber();

    this.getBotAnswer(this.userNumber);
    this.checkOpponentAnswer(this.opponentGuess);

    this.textBox.innerHTML = this.getBotAnswer(this.userNumber) + "<br>" + 
                             this.checkOpponentAnswer(this.opponentGuess) + "<br>" + 
                             this.checkOpponentAnswer(this.opponentGuess2) + "<br>" + 
                             this.checkOpponentAnswer(this.opponentGuess3);
    
    // lagt till svar för två nya motståndare
    this.opponentElement.innerHTML =
      "Opponent 1 guess: " + String(this.opponentGuess) + "<br>" + 
      "Opponent 2 guess: " + String(this.opponentGuess2) + "<br>" + 
      "Opponent 3 guess: " + String(this.opponentGuess3);

    // test för att säga till när någon har vunnit
    if (this.getBotAnswer(this.userNumber) == "User, you are correct!") {
      console.log('Grattis User, du vann!')
    } else if (this.checkOpponentAnswer(this.opponentGuess) == "Opponent, you are correct!") {
      console.log('Grattis Opponent 1, du vann!')
    } else if (this.checkOpponentAnswer(this.opponentGuess2) == "Opponent, you are correct!") {
      console.log('Grattis Opponent 2, du vann!')
    } else if (this.checkOpponentAnswer(this.opponentGuess3) == "Opponent, you are correct!") {
      console.log('Grattis Opponent 3, du vann!')
    }
  }

  private getBotAnswer(number: number) {

    if (number > 20 || number < 0 || isNaN(number)) {
      return "Please choose a number between 1-20";
    } else if (number > this.botNumber) {
      return "User, please guess a lower number!";
    } else if (number < this.botNumber) {
      return "User, please guess a higher number!";
    } else {
      return "User, you are correct!";
    }
  }

  private checkOpponentAnswer(number: number) {
    if (number > this.botNumber) {
      return "Opponent, please guess a lower number!";
    } else if (number < this.botNumber) {
      return "Opponent, please guess a higher number!";
    } else {
      return "Opponent, you are correct!";
    }
  }
}
