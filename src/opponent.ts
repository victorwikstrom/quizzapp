class Opponent {
  public wrapper: HTMLElement;
  public name: string;
  public personality: string;
  public guess: number;

  private imageSrc: string;

  constructor(
    name: string,
    personality: "dumb" | "smart" | "random",
    imageSrc: string
  ) {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("opponent");
    this.imageSrc = imageSrc;
    this.name = name;
    this.personality = personality;
    this.guess = 0;
  }

  public getDumbGuess(previousGuess: number, correctNumber: number) {
    if (previousGuess > correctNumber) {
      this.guess = previousGuess - 1;
    } else {
      this.guess = previousGuess + 1;
    }
    this.printGuess();
  }

  public getRandomGuess() {
    const min = Math.ceil(1);
    const max = Math.floor(100);
    this.guess = Math.floor(Math.random() * (max - min) + min);
    this.printGuess();
  }

  public getSmartGuess(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    this.guess = Math.floor(Math.random() * (max - min) + min);
    this.printGuess();
  }

  public printGuess() {
    this.wrapper.innerHTML = this.name + " " + "<br>" + String(this.guess);
  }
}