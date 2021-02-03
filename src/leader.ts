class Leader {
  public wrapper: HTMLElement;
  public correctNumber: number;
  public response: string;

  public responseText: string;
  public responseWrapper: HTMLElement;

  constructor() {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("leader");
    this.wrapper.innerHTML =
      '<img src="./images/gamemaster.png "width= 100%">';
    this.responseWrapper = document.createElement("div");
    this.responseWrapper.classList.add("leader-response");

    this.response = "";
    this.responseText = "";
    this.correctNumber = this.getCorrectNumber();

  }

  private getCorrectNumber() {
    return Math.floor(Math.random() * (100 - 1) + 1);
  }

  public getResponse(guess: number, name: string) {
    if (guess === 12345) {
      return name + ", hey stupid, guess a number between 1 - 100!";
    }
    if (guess > this.correctNumber) {
      this.response = "lower";
      return name + ", please guess a lower number!";
    } else if (guess < this.correctNumber && guess !== 0) {
      this.response = "higher";
      return name + ", please guess a higher number!";
    } else if (guess === 0) {
      this.response = "higher";
      return name + ", your time ran out!";
    } else {
      this.response = "correct";
      return name + ", you are correct!";
    }
  }
}
