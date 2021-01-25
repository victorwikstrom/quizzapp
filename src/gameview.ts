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

  constructor() {

    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("game-wrapper");

    this.textBox = document.createElement("span");
    this.textBox.classList.add('textBox');
    this.textBox.innerText = "Guess a number between 1-20!";

    this.inputField = document.createElement("input");
    this.guessButton = document.createElement("button");
    this.guessButton.innerHTML = "Gissa";

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

    // css-styling för opponent-elementen
    this.opponentElement.classList.add('opponent');
    this.opponentElement2.classList.add('opponent');
    this.opponentElement3.classList.add('opponent');

    this.opponentGuess = this.getOpponentNumber();
    this.opponentGuess2 = this.getSecondOpponentNumber();
    this.opponentGuess3 = this.getThirdOpponentNumber();

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

    // Från gissning ett och framåt
    if (this.guessCount > 0) {

      if (this.opponentGuess > this.botNumber) {
        // Gissar på ett mindre tal
        let newNumberRange = this.opponentGuess - 1;
        return Math.floor(Math.random() * (newNumberRange - 1) + 1);

      } else if (this.opponentGuess < this.botNumber) {
        // Gissar på ett högre tal
        let newNumberRange = this.opponentGuess + 1;
        return Math.floor(Math.random() * (20 - newNumberRange) + newNumberRange);

        // Denna fyller egentligen ingen funktion, men behövs för att alla alternativ ska returnera något
      } else {
        return Math.floor(Math.random() * (20 - 1) + 1);
      }

    } else {

      // Den första gissningen (när guessCount = 0)
      return Math.floor(Math.random() * (20 - 1) + 1);
    }
  }

  // Gissning från motståndare 2
  private getSecondOpponentNumber() {
    return Math.floor(Math.random() * (20 - 1) + 1);
  }

  // Gissning från motståndare 3
  private getThirdOpponentNumber() {
    return Math.floor(Math.random() * (20 - 1) + 1);
  }

  // Spelledarens nummer (rätt svar)
  private getBotNumber() {

    return Math.floor(Math.random() * (20 - 1) + 1);
  }

  // Returnerar det numret som användaren skriver i input-fältet
  private getUserInput() {
    return Number(this.inputField.value);
  }

  // Kör funktionerna som genererar nya nummer och skriver ut dessa på sidan
  private validateUserInput() {

    // Uppdaterar användarens gissning och genererar nya gissningar från motståndarna
    this.userNumber = this.getUserInput();
    this.opponentGuess = this.getOpponentNumber();
    this.opponentGuess2 = this.getSecondOpponentNumber();
    this.opponentGuess3 = this.getThirdOpponentNumber();

    this.textBox.innerHTML = this.getBotAnswer(this.userNumber)

    // Lagt till svar för två nya motståndare
    this.opponentElement.innerHTML = "Opponent 1:" + '<br>' + String(this.opponentGuess) + '<br>' + this.checkOpponentAnswer(this.opponentGuess);
    this.opponentElement2.innerHTML = "Opponent 2:" + '<br>' + + String(this.opponentGuess2) + '<br>' + this.checkOpponentAnswer(this.opponentGuess2);
    this.opponentElement3.innerHTML = "Opponent 3:" + '<br>' + String(this.opponentGuess3) + '<br>' + this.checkOpponentAnswer(this.opponentGuess3);

    this.updateGuessCount()
    this.getWinner();
  }

  // Ökar antal gissningar med 1
  private updateGuessCount() {
    this.guessCount++;
    this.guessCountElement.innerText = String(this.guessCount);
  }

  // Test för att säga till när någon har vunnit
  private getWinner() {
    if (this.userNumber == this.botNumber) {
      console.log('Grattis User, du vann! Det tog bara ' + this.guessCount + ' gissningar')
      // gameState.updateView("over");
    }
    if (this.opponentGuess == this.botNumber) {
      console.log('Grattis Opponent 1, du vann!')
      // gameState.updateView("over");
    }
    if (this.opponentGuess2 == this.botNumber) {
      console.log('Grattis Opponent 2, du vann!')
      // gameState.updateView("over");
    }
    if (this.opponentGuess3 == this.botNumber) {
      console.log('Grattis Opponent 3, du vann!')
      // gameState.updateView("over");
    }
  }

  // Svaret på användarens gissning
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

  // Svaret på en motståndares gissning
  private checkOpponentAnswer(number: number) {
    if (number > this.botNumber) {
      return "Please guess a lower number!";
    } else if (number < this.botNumber) {
      return "Please guess a higher number!";
    } else {
      return "You are correct!";
    }
  }
}
