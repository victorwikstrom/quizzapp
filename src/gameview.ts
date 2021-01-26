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
    this.guessButton.classList.add("all-buttons");
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

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Slumpar svar som är lägre än användarens svar om rätt svar ska vara lägre, och högre om rätt svar ska vara högre
  private getOpponentNumber() {
    if (this.userNumber > this.botNumber) {
      //return Math.floor(Math.random() * (this.userNumber - 1) + 1);
      return this.getRandomInt(1, this.userNumber)
    } else if (this.userNumber < this.botNumber) {
      return this.getRandomInt(this.userNumber, 20)
      // return Math.floor(Math.random() * (20 - this.userNumber) + this.userNumber);
    } else {
      // Denna fyller egentligen ingen funktion, men behövs för att alla alternativ ska returnera något
      return this.userNumber;
    }
  }

  // Slumpar svar som är lägre än föregående motståndares svar om rätt svar ska vara lägre, och högre om rätt svar ska vara högre
  // Inte säker på att den även helt anpassar sig efter användarens svar :(
  private getSecondOpponentNumber() {

    // anv och opp har båda gissat ett för högt tal, opp har gissat högst
    if (this.opponentGuess > this.botNumber && this.userNumber > this.botNumber && this.opponentGuess > this.userNumber) {
      return this.getRandomInt(1, this.userNumber)
      // 1 --> user

      // anv och opp har båda gissat ett för högt tal, anv har gissat högst
    } else if (this.opponentGuess > this.botNumber && this.userNumber > this.botNumber && this.opponentGuess < this.userNumber) {
      return this.getRandomInt(1, this.opponentGuess)
      // 1 --> opp

      // anv och opp har båda gissat ett för lågt svar, opp har gissat högst
    } else if (this.opponentGuess < this.botNumber && this.userNumber < this.botNumber && this.opponentGuess > this.userNumber) {
      return this.getRandomInt(this.opponentGuess, 20)
      // opp --> 20

      // anv och opp har båda gissat ett för lågt svar, anv har gissat högst
    } else if (this.opponentGuess < this.botNumber && this.userNumber < this.botNumber && this.opponentGuess < this.userNumber) {
      return this.getRandomInt(this.userNumber, 20)
      // user --> 20

      // opp har gissat för lågt och anv har gissat för högt
    } else if (this.opponentGuess < this.botNumber && this.userNumber > this.botNumber) {
      return this.getRandomInt(this.opponentGuess, this.userNumber)
      // opp --> user

      // anv har gissat för lågt och opp har gissat för högt
    } else if (this.opponentGuess > this.botNumber && this.userNumber < this.botNumber) {
      return this.getRandomInt(this.userNumber, this.opponentGuess)
      // user --> opp

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
      gameState.updateView("over");
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
