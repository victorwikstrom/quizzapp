class Opponent {
  private wrapper: HTMLElement; 
  private yPos: number;
  private imageSrc: string;

  private personality: string;

  public min: number
  public max: number;



constructor(personality: string, yPos: number, imageSrc: string) {
  this.wrapper = document.createElement("div");
  this.yPos = yPos;
  this.imageSrc = imageSrc;
  this.min = 0;
  this.max = 20;
  this.personality = personality
}

public getSmartGuess(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const guess = Math.floor(Math.random() * (max - min) + min);
    this.printGuess(guess)
}

public getDumbGuess(prevGuess: number, prevBotAnswer: string) {
  if (prevBotAnswer === "lower") {
    this.printGuess(prevGuess - 1)
  } else if (prevBotAnswer === "higher") {
    this.printGuess(prevGuess + 1)
  }
}

public getRandomGuess() {
    const guess = Math.floor(Math.random() * (20 - 1) + 1);
    this.printGuess(guess)
}

public printGuess(guess: number) {
  // skriv ut gissningen i gameWrapper
}

public setCharacterImages(_imageSrc: string) {
  import character1 from 'img src/images/stickman-1.png\';
  import character2 from 'img src/images/stickman-2.png\';
  import character3 from 'img src/images/stickman-3.png\';
  
}
}