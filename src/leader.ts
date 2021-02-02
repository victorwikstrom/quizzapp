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
      '<img src="./images/gamemaster.png" width="80%" ">';
    this.responseWrapper = document.createElement("div");
    this.responseWrapper.classList.add("leader-response");

    this.response = "";
    this.responseText = "";
    this.correctNumber = this.getCorrectNumber();
  }

  private getCorrectNumber() {
    return Math.floor(Math.random() * (100 - 1) + 1);
  }

  public getResponse(guess: number, opponentName: string) {
    if (guess > this.correctNumber) {
      this.response = "lower";
      return opponentName + ", please guess a lower number!";
    } else if (guess < this.correctNumber) {
      this.response = "higher";
      return opponentName + ", please guess a higher number!";
    } else {
      this.response = "correct";
      return opponentName + ", you are correct!";
    }
  }
}
