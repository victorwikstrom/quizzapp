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
  
  /*
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
      } else {
        // Denna fyller egentligen ingen funktion, men behövs för att alla alternativ ska returnera något
        return 0;
      }

    } else {

      // Den första gissningen (när guessCount = 0)
      return Math.floor(Math.random() * (20 - 1) + 1);
    }
  }
  */

  // Slumpar svar som är lägre än användarens svar om rätt svar ska vara lägre, och högre om rätt svar ska vara högre
  private getOpponentNumber() {
    if (this.userNumber > this.botNumber) {
      return Math.floor(Math.random() * (this.userNumber - 1) + 1);
    } else if (this.userNumber < this.botNumber) {
      return Math.floor(Math.random() * (20 - this.userNumber) + this.userNumber);
    } else {
      // Denna fyller egentligen ingen funktion, men behövs för att alla alternativ ska returnera något
      return this.userNumber;
    }
  }

  // Slumpar svar som är lägre än föregående motståndares svar om rätt svar ska vara lägre, och högre om rätt svar ska vara högre
  // Behöver fixa så att det även är anpassat efter vad användaren har fått för svar
  private getSecondOpponentNumber() {
    if (this.opponentGuess > this.botNumber) {
      return Math.floor(Math.random() * (this.opponentGuess - 2) + 1);
    } else if (this.opponentGuess < this.botNumber) {
      return Math.floor(Math.random() * (20 - this.opponentGuess) + this.opponentGuess);
    } else {
      // Denna fyller egentligen ingen funktion, men behövs för att alla alternativ ska returnera något
      return this.opponentGuess;
    }
  }

  // Lägger till ett på föregående motståndares svar om rätt svar är högre och drar av ett om rätt svar är lägre
  private getThirdOpponentNumber() {
    if (this.opponentGuess2 > this.botNumber) {
      return this.opponentGuess2 - 1;
    } else if (this.opponentGuess2 < this.botNumber) {
      return this.opponentGuess2 + 1;
    } else {
      // Denna fyller egentligen ingen funktion, men behövs för att alla alternativ ska returnera något
      return this.opponentGuess2;
    }
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
    setTimeout(() => {
      this.opponentElement.innerHTML = "Opponent 1:" + '<br>' + + String(this.opponentGuess) + '<br>' + this.checkOpponentAnswer(this.opponentGuess);
      this.opponentWins(this.opponentGuess);
    }, 2000)

    setTimeout(() => {
      this.opponentElement2.innerHTML = "Opponent 2:" + '<br>' + + String(this.opponentGuess2) + '<br>' + this.checkOpponentAnswer(this.opponentGuess2);
      this.opponentWins(this.opponentGuess2);
    }, 4000);

    setTimeout(() => {
      this.opponentElement3.innerHTML = "Opponent 3:" + '<br>' + String(this.opponentGuess3) + '<br>' + this.checkOpponentAnswer(this.opponentGuess3);
      this.opponentWins(this.opponentGuess3);
    }, 6000);


    this.updateGuessCount()
    this.userWins();
  }

  // Ökar antal gissningar med 1
  private updateGuessCount() {
    this.guessCount++;
    this.guessCountElement.innerText = String(this.guessCount);
  }

  // När användaren vinner
  private userWins() {
    if (this.userNumber == this.botNumber) {
      console.log('Grattis User, du vann! Det tog bara ' + this.guessCount + ' gissningar')
      // gameState.updateView("over");
    }
  }

  // När en motståndare vinner
  private opponentWins(guess: number) {

    if (guess == this.botNumber) {
      console.log('Grattis Opponent, du vann!')
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
