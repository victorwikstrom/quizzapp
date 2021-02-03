class Opponent {
  public wrapper: HTMLElement;
  public textElement: HTMLElement;
  private nameElement: HTMLElement;
  public image: HTMLImageElement;
  public name: string;
  public personality: string;
  public guess: number;
  private guessElement: HTMLElement;

  private imageSrc: string;

  constructor(
    name: string,
    personality: "dumb" | "smart" | "random",
    imageSrc: string
  ) {
    this.wrapper = document.createElement("div");
    this.image = document.createElement("img");
    this.textElement = document.createElement("div");
    this.nameElement = document.createElement("p");
    this.guessElement = document.createElement("p");

    this.guessElement.innerText = "-";

    this.textElement.classList.add("text-element");
    this.guessElement.classList.add("bold-numbers");

    this.wrapper.classList.add("opponent");

    this.imageSrc = imageSrc;
    this.image.src = this.imageSrc;
    this.image.classList.add("opponent-image");
    this.name = name;
    this.personality = personality;

    this.nameElement.innerText = this.name;

    this.guess = 0;
    // this.opponentNumber = this.guess;
    // this.opponentNumber.classList.add()
    this.textElement.appendChild(this.nameElement);
    this.textElement.append(this.guessElement);
    this.wrapper.appendChild(this.image);
    this.wrapper.appendChild(this.textElement);
  }

  public getDumbGuess(previousGuess: number, correctNumber: number) {
    if (previousGuess > correctNumber) {
      this.guess = previousGuess - 1;
    } else {
      this.guess = previousGuess + 1;
    }

    setTimeout(() => {
      this.printGuess();
    }, 0);
  }

  public getRandomGuess() {
    const min = Math.ceil(1);
    const max = Math.floor(100);
    this.guess = Math.floor(Math.random() * (max - min) + min);
    setTimeout(() => {
      this.printGuess();
    }, 0);
  }

  public getSmartGuess(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    this.guess = Math.floor(Math.random() * (max - min) + min);
    setTimeout(() => {
      this.printGuess();
    }, 0);
  }

  public printGuess() {
    this.guessElement.innerText = String(this.guess);
  }
}
