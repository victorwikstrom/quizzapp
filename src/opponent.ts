class Opponent {
  public wrapper: HTMLElement;
  public textElement: HTMLElement;
  public image: HTMLImageElement;
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
    this.image = document.createElement("img")
    this.textElement = document.createElement("p");

    this.wrapper.classList.add("opponent");
    
    this.imageSrc = imageSrc;
    this.image.src = this.imageSrc
    this.image.classList.add("opponent-image")
    this.name = name;
    this.personality = personality;
    this.guess = 0;

    this.wrapper.appendChild(this.image)
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
    this.textElement.innerHTML = this.name + " " + "<br>" + String(this.guess);
    this.wrapper.appendChild(this.textElement)
  }
}